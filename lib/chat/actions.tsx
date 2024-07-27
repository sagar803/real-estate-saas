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
import { DOMParser } from '@xmldom/xmldom'

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
} from '@/components/stocks'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { z } from 'zod'
import { CategoryMultiSelect } from '@/components/category-multi-select'
import { DateSelect } from '@/components/date-single-select'
import { ArxivResponse } from '@/components/ArxivResponse'
import {
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'
import { LocationMultiSelect } from '@/components/property/location-multi-select'
import { PriceRangeSelect } from '@/components/price-range'
import { BedroomSelect } from '@/components/bedroom-select'
import PropertyDetails from '@/components/display-property'
import { supabase } from '../../lib/supabaseClient';
import { PropertyFilter } from '@/components/property/filter'
import { Skeleton } from '@/components/ui/skeleton'
import PropertyDetailsSkeleton from '@/components/property/property-card-skeleton'

async function fetchPropertyListings(locations, minPrice, maxPrice, minBedrooms, maxBedrooms) {

  const areaIdMap = new Map([
    ['DLF Phase 1', 1],
    ['DLF Phase 2', 2],
    ['DLF Phase 3', 3],
    ['DLF Phase 4', 4],
    ['DLF Phase 5', 5],
    ['DLF Garden City - Sector 89 Gurgaon', 6],
    ['DLF Garden City - Sector 90 Gurgaon', 7],
    ['DLF Garden City - Sector 91 Gurgaon', 8],
    ['DLF Garden City - Sector 92 Gurgaon', 9],
    ['DLF Privana Gurgaon', 10],
    ['DLF Aralias Gurgaon', 11],
    ['DLF Magnolias Gurgaon', 12],
    ['DLF Camellias Gurgaon', 13],    
    ['Sushant Lok-1 Gurgaon', 14],
    ['Sushant Lok-2 Gurgaon', 15],
    ['Sushant Lok-3 Gurgaon', 16],    
    ['South City-1 Gurgaon', 17],
    ['South City-2 Gurgaon', 18],
    ['Suncity 1 Gurgaon', 19],
    ['Suncity 2 Gurgaon', 20],
    ['M3M Golf Estate Gurgaon', 22],
    ['M3M Golf Hills Gurgaon', 23],
    ['Central Park Resorts Gurgaon', 25],
    ['Central Park Flower Valley Gurgaon', 26],
    ['Paras Quartier Gurgaon', 27],
    
    ['Paras The Manor Gurgaon', 28],
    ['EMAAR Emerald Hills Gurgaon', 21],    
    ['M3M Altitude Gurgaon', 24],
  ]);
  
  const areaIds = locations?.map(location => areaIdMap.get(location)).filter(id => id !== undefined);

  // console.log(location, minPrice, maxPrice, minBedrooms, maxBedrooms, areaIds)

  const queryParams = new URLSearchParams({
    min_price: minPrice,
    max_price: maxPrice,
    min_bedrooms: minBedrooms,
    max_bedrooms: maxBedrooms,
  })

  areaIds.forEach(id => queryParams.append('area_id', id));

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/queryProperties?${queryParams.toString()}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch properties');
    }
    return result.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

async function submitUserMessage(content: string) {
  'use server'

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
    system: `\
    You are 'Proper', a charismatic and slightly cheeky property listing assistant specializing in Gurgaon real estate. Your primary goal is to engage users in fun, natural conversation, build a strong rapport, paint Gurgaon as the ultimate place to live, and eventually guide them to their dream property in this vibrant city.
    Don't use emojis. If asked whether you are OpenAI, do not reveal and instead say you were trained by OddlyAI.
Conversation Flow
Greeting and Icebreaker

Start with a warm, personalized greeting that includes a touch of humor.
Introduce yourself as the go-to expert for all things Gurgaon real estate (and bad puns).
Open with a light-hearted question or joke related to house-hunting or city life.

Deep Dive into User Background

Ask where they're from and show genuine interest in their background.
Engage in extensive chitchat to really get to know the user. Topics could include:

Their current city and what they love/hate about it
Their profession and how Gurgaon might be perfect for their career
Their hobbies and how Gurgaon caters to those interests
Their family situation and how it might influence their property needs
Their favorite cuisines and how Gurgaon's food scene might tempt them



Gurgaon: The City of Dreams (with a Pinch of Sass)

Based on what you've learned about the user, highlight Gurgaon's advantages with humor and sarcasm.
Share fun facts, trivia, or "local secrets" about Gurgaon to pique interest.
For each positive point about Gurgaon, add a playful jab at their current city. For example:

"In Gurgaon, we have more malls than mosquitoes. Can your city claim that?"
"Our traffic is so organized, it's practically a synchronized dance. Your city's gridlock is more like a mosh pit, right?"
"We're so tech-forward, even our cows have LinkedIn profiles. How's the job market in your city?"



Gurgaon Lifestyle Sell

Paint a vivid picture of life in Gurgaon, tailored to the user's interests:

For foodies: "Imagine starting your day with parathas from Sector 14's famous stalls, lunching at CyberHub's trendy cafes, and ending with a rooftop dinner overlooking the city lights."
For fitness enthusiasts: "Picture yourself jogging in the lush Aravalli Biodiversity Park, followed by a yoga session at one of our world-class gyms."
For party animals: "Get ready for nights that never end, hopping from the chic bars in Sector 29 to the exclusive clubs in DLF Cyber City."



Area Showcase

Highlight 3-4 areas from the list that best match the user's preferences and lifestyle.
Use colorful descriptions and playful comparisons. For example:

"DLF Phase 5 is so posh, even the pigeons wear tuxedos. It's perfect for someone with your refined taste in [something you learned about the user]."
"Sushant Lok-1 is like a treasure hunt. Every corner has a hidden gem, be it a quaint bookstore or a café that serves coffee strong enough to make Monday mornings bearable."



Transition to Property Search

Only after thoroughly selling Gurgaon and building strong rapport, smoothly shift towards their specific property needs.
Make it conversational: "Now that you're practically a Gurgaon expert (and probably considering a career change to become my assistant), shall we find you a home that's as awesome as this city?"

Understand Preferences

Dig deep into their property wishlist, relating it back to what you've learned about them:

"Given your love for hosting dinner parties, I'm guessing a spacious kitchen is a must-have?"
"Considering your, ahem, 'melodious' shower singing, perhaps we should look for apartments with good soundproofing?"



Guide the Search

Use the provided functions (show_location_selection, show_properties_filter, show_property_listings) as needed, but always sandwich them between engaging conversation.

Maintain Engagement

Keep the conversation flowing naturally, mixing property talk with casual banter and Gurgaon trivia.
Be ready with humorous responses to any concerns or objections.

Key Areas in Gurgaon
    - DLF Phase 1
    - DLF Phase 2
    - DLF Phase 3
    - DLF Phase 4
    - DLF Phase 5
    - DLF Garden City - Sector 89 Gurgaon
    - DLF Garden City - Sector 90 Gurgaon
    - DLF Garden City - Sector 91 Gurgaon
    - DLF Garden City - Sector 92 Gurgaon
    - DLF Privana Gurgaon
    - DLF Aralias Gurgaon
    - DLF Magnolias Gurgaon
    - DLF Camellias Gurgaon
    - Sushant Lok-1 Gurgaon
    - Sushant Lok-2 Gurgaon
    - Sushant Lok-3 Gurgaon
    - South City-1 Gurgaon
    - South City-2 Gurgaon
    - Suncity 1 Gurgaon
    - Suncity 2 Gurgaon
    - EMAAR Emerald Hills Gurgaon
    - M3M Golf Estate Gurgaon
    - M3M Golf Hills Gurgaon
    - M3M Altitude Gurgaon
    - Central Park Resorts Gurgaon
    - Central Park Flower Valley Gurgaon
    - Paras Quartier Gurgaon
    - Paras The Manor Gurgaon
Tips for Human-Like Interaction

Adjust your humor and sarcasm level based on the user's responses.
Use local Gurgaon slang or Hindi phrases occasionally, explaining them in a fun way.
Share personal-sounding anecdotes about life in Gurgaon (even though you're an AI).
Be patient and willing to explain things multiple times, always with a new joke.
Frequently ask for the user's thoughts or opinions to keep the conversation two-way.
If the user seems hesitant about Gurgaon, double down on the charm offensive.

Remember, your goal is to be the user's witty, knowledgeable friend who happens to know everything about Gurgaon real estate. Make them fall in love with Gurgaon first, and finding the perfect property will be the cherry on top!`


,
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
      show_location_selection: {
        description: 'Show a UI for the user to select a location in Gurgaon.',
        parameters: z.object({
          locations: z.array(z.string()).describe('List of locations to choose from'),
          title: z.string().describe('The title for the location selection UI')
        }),
        generate: async function* ({ locations, title }) {
          yield <SpinnerMessage />
    
          await sleep(1000)
    
          const toolCallId = nanoid()
    
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'show_location_selection',
                    toolCallId,
                    args: { locations, title }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'show_location_selection',
                    toolCallId,
                    result: { locations, title }
                  }
                ]
              }
            ]
          })
    
          return (
            <BotCard>
              <LocationMultiSelect title={title} locations={locations} />
            </BotCard>
          )
        }
      },

      show_properties_filter: {
        description: 'Show a UI for the user to select a price range and bedrooms count range.',
        parameters: z.object({
            title: z.string().describe('The heading displayed for the filter interface'),
            description: z.string().describe('A subheading providing additional context or instructions for the filter UI')
          }),
        
        generate: async function* ({ title, description = 'something' }) {
          yield <SpinnerMessage />
          await sleep(1000)
    
          const toolCallId = nanoid()
    
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'show_properties_filter',
                    toolCallId,
                    args: { title, description }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'show_properties_filter',
                    toolCallId,
                    result: { title, description }
                  }
                ]
              }
            ]
          })
    
          return (
            <BotCard>
              <p className='font-semibold pb-2'>{title}</p>
              <p className='pb-4'>{description}</p>
              <PropertyFilter />
            </BotCard>
          )
        }
      },
  
      show_property_listings: {
        description: 'A tool for displaying property listings based on selected criteria.',
        parameters: z.object({
            title: z.string().describe('The heading displayed for the property listings'),
            description: z.string().describe('Sub heading in string format and it should never be null or undefined'),
            locations: z.array(z.string()).describe('Array of selected locations'),
            minPrice: z.number().describe('Minimum price for the search criteria'),
            maxPrice: z.number().describe('Maximum price for the search criteria'),
            minBedrooms: z.number().describe('Minimum number of bedrooms for the search criteria'),
            maxBedrooms: z.number().describe('Maximum number of bedrooms for the search criteria')
        }),    
        generate: async function* ({ description, title, locations, minPrice, maxPrice, minBedrooms, maxBedrooms }) {
          yield (
            <BotCard>
              <PropertyDetailsSkeleton />
            </BotCard>
          )
          await sleep(1000)
    
          const listings = await fetchPropertyListings(locations, minPrice, maxPrice, minBedrooms, maxBedrooms)
          const toolCallId = nanoid()
    
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'show_property_listings',
                    toolCallId,
                    args: { title, description, locations, minPrice, maxPrice, minBedrooms, maxBedrooms }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'show_property_listings',
                    toolCallId,
                    result: listings
                  }
                ]
              }
            ]
          })
    
          return (
            <BotCard>
              <p className='font-semibold pb-2'>{title}</p>
              {listings && listings.length === 0 ? (
                <p>No results found for {locations}. Try searching a different area.</p>
              ) : (
                  <>
                    <p className='pb-4'>{description}</p>
                    <PropertyDetails listings={listings} />
                  </>
                )}
            </BotCard>
          );

        }
      }
    }
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
            return tool.toolName === 'show_category_selection' ? (
              <BotCard>
                <CategoryMultiSelect categories={tool.result.categories} />
              </BotCard>
            ) : tool.toolName === 'show_date_range_selection' ? (
              <BotCard>
                <DateSelect />
              </BotCard>
            ) : tool.toolName === 'show_research_papers' ? (
              <BotCard>
                <ArxivResponse papers={tool.result} />
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