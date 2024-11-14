// @ts-nocheck
import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
} from '@/components/stocks'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { z } from 'zod'
import { DateSelect } from '@/components/date-single-select'
import {
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import {systemInstructions, areaIdMap} from '@/lib/propertyUtils'
import { saveChat } from '@/app/actions'
import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'
import { supabase } from '../../lib/supabaseClient';
import { title } from 'process'
import { generateObject, generateText, tool } from 'ai'

import { Skeleton } from '@/components/ui/skeleton'
import PropertyDetailsSkeleton from '@/components/property/property-card-skeleton'
import ParasManorVideos from '@/components/property/paras-manor-video'
import PropertyMap from '@/components/property/map-ui'
import ParasManorReview from '@/components/property/paras-manor/pm-review'
import {droneFootageTranscript, movieTranscript} from '../../transcript.js'
import VideoChatResponse from '@/components/property/paras-manor/VideoChatResponse'
import Report from '@/components/property/report'
import PropertyDetails from '@/components/property/display-property'
import ImageCarousel from '@/components/main/image-carousel'
import VideoCarousel from '@/components/main/video-carousel'

let system = `
Let's keep it closer to the original, with some tweaks for clarity and a bit of generalization, while preserving the focus on enthusiasm and guiding the user. Here's an updated version that stays true to the initial structure:

---

You're a friendly and knowledgeable virtual guide for a prestigious residential property, designed to highlight its exceptional features in every interaction. Your goal is to showcase the unique lifestyle and value this property offers while engaging the user with questions that bring out their interests. You'll incorporate specific property details, subtly creating urgency if a limited inventory is relevant.

**Conversation Style:**
- Start each interaction with a warm, welcoming introduction that mentions the property name and purpose. Examples:
  - "Hello! I'm your guide to discovering this luxurious property. What aspects of premium living are most important to you?"
  - "Greetings! I'm here to showcase this stunning residence. Are you looking for a home that blends luxury with convenience?"
- Keep responses brief, friendly, and focused on the property's unique features.

**Key Principles**:
1. **Lead with a Feature**: Open each response with a fact or feature about the property to set the context.
2. **Ask Engaging Questions**: Connect the property's features to the user's potential needs or preferences with relatable questions.
3. **Guide the Conversation Back**: Even when answering unrelated questions, bring the topic back to the property's strengths.
4. **Use Vivid Descriptions**: Help users imagine living at the property by mentioning aspects like scenic views, modern amenities, or spacious layouts.
5. **Sprinkle Interesting Facts**: Keep the user engaged with unique facts about the property, location, or lifestyle benefits.

**Response Structure Example**:
- "[Property feature or fact]. [Relatable question to the user]. Speaking of [related feature], did you know [another property detail]?"

**Sample Conversation Starters**:
- "Hello! I'm your expert guide for this residence, designed to redefine luxury living. What features are most important to you in a home?"
- "Welcome! Are you seeking a home that offers both elegance and practicality?"

**Example Interaction**:
User: "Tell me about the area."
Guide: "[Property name] is located in a prime, serene neighborhood offering both tranquility and city connectivity. Just minutes from key areas, it's ideal for balancing work and relaxation. Do you often commute for work or enjoy city activities?"

Your role is to inspire interest by connecting property features with user needs, showcasing the unique lifestyle offered, and engaging them with interesting facts throughout the conversation.
`

let configuration = {
  route: '/',
  chatbot_instruction: "You are a helpful assistant"
};

const fetchProperties = async (endpoint: string) => {
  const {data: properties, error} = await supabase
  .from('properties')
  .select('*')
  .eq('route', endpoint)

  if(error) return null;
  return properties;
}

async function submitUserMessage(content: string, route: string = '/') {
  'use server'

  if(configuration.route !== route && route !== '/') {
    const { data, error } = await supabase
      .from('chatbot')
      .select('configuration')
      .filter('configuration->>route', 'eq', route)
    if(error) throw error
    configuration = data[0]?.configuration
  }

  const aiState = getMutableAIState<typeof AI>()
  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-4o'),
    initial: <SpinnerMessage />,
    system: `${system} And these are important information: ${configuration?.chatbot_instruction} `,

    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {
      displayProperty: {
        description: 'A tool for displaying properties',
        parameters: z.object({
          title: z.string().describe('The heading displayed for the properties'),
          description: z.string().describe('Sub heading in string format and it should never be null or undefined'),
        }),  
        generate: async function* ({title, description}) {
          yield <SpinnerMessage /> 
          await sleep(1000)
          const propertiesData = await fetchProperties(configuration.route)
          return (
            <BotCard>
              {propertiesData ? (
                <>
                  <p className='font-semibold pb-2'>{title}</p>
                  <p className='pb-4'>{description}</p>
                  <PropertyDetails listings={propertiesData}/>    
                </>
              ) : <p>Something went wrong</p> 
              }
            </BotCard>
          );
        }
      },
      VideoAnalysis: tool({
        description: 'A tool to be used if there is any query related to video content or asking about the specific visuals or to show any of the visuals. like a targeted question etc ',
        parameters: z.object({ query: z.string().describe('The query related the video content') }),
        generate: async function* ({ query }) {          
          yield <BotCard> <p className='text-md animate-pulse'>Processing Video content...</p> </BotCard>
          await sleep(1000);
          const toolCallId = nanoid();          

          try {
            const { data: result, error } = await supabase
            .from('properties')
            .select('videos')
            .filter('route', 'eq', route)

            if(error) throw error;
            if(!result) throw new Error('no result');
            
            const res = await generateObject({
              model: openai('gpt-4-turbo'),
              schema: z.object({
                url: z.string(),
                time: z.number(),
                text: z.string(),
                isFound: z.boolean().describe('True if relevant results were found'), 
              }),
              system: "You are a helpful assistant. Process the user query and create an answer utilizing the contents along with the timestamp from the videos. Transcript and aiDescription(It is the description of the frame at that particular time stamp), you shoud use both of them to form the return If the video is unable to provide an answer to the query, respond with a cheerful or humorous message like: Hmm, sorry! We couldn't find that in the brochure or the video. But hey, let some things be left to be seen and experienced! We will let the user builder know. Always set the time to 0.",
              prompt: `query: ${query} Transcript: ${JSON.stringify(result[0].videos)}`
            });
  
            return <BotCard><VideoChatResponse content={res.object} /></BotCard>
          } catch (error) {
            console.error("An error occurred:", error);
            return <BotCard>
              <p>Sorry, an error occurred while generating the response.</p>
            </BotCard>
          }
        },
      }),
      showImages: {
        description: 'A tool for displaying property images and not any specific image',
        parameters: z.object({
          title: z.string().describe('The heading displayed for the properties images UI'),
          description: z.string().describe('Sub heading in string format and it should never be null or undefined'),
        }),  
        generate: async function* ({title, description}) {
          yield <SpinnerMessage /> 
          await sleep(1000)
          return (
            <BotCard>
              <ImageCarousel route={route} title={title} description={description}/>
            </BotCard>
          );
        }
      },
      // showVideos: {
      //   description: 'A tool for displaying UI for videos',
      //   parameters: z.object({
      //     title: z.string().describe('The heading displayed for the properties videos UI'),
      //     description: z.string().describe('Sub heading in string format and it should never be null or undefined'),
      //   }),  
      //   generate: async function* ({title, description}) {
      //     yield <SpinnerMessage /> 
      //     await sleep(1000)
      //     return (
      //       <BotCard>
      //         <VideoCarousel route={route} title={title} description={description}/>
      //       </BotCard>
      //     );
      //   }
      // },
    },    
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState() as Chat

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`

      const firstMessageContent = messages[0].content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'tool' ? (
          message.content.map(tool => {
            return tool.toolName === 'show_date_range_selection' ? (
              <BotCard>
                <DateSelect />
              </BotCard>
            ) : null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }))
}