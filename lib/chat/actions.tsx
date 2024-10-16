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
import { CategoryMultiSelect } from '@/components/category-multi-select'
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
import { LocationMultiSelect } from '@/components/property/location-multi-select'
import { PriceRangeSelect } from '@/components/price-range'
import { BedroomSelect } from '@/components/bedroom-select'
import PropertyDetails from '@/components/display-property'
import { supabase } from '../../lib/supabaseClient';
import { PropertyFilter } from '@/components/property/filter'
import { Skeleton } from '@/components/ui/skeleton'
import PropertyDetailsSkeleton from '@/components/property/property-card-skeleton'
import ParasManorVideos from '@/components/property/paras-manor-video'
import { title } from 'process'
import ParasManorImageGallery from '@/components/property/paras-manor-image-gallery'
import ParasManorPropertyDetails from '@/components/property/paras-manor-property-listing'
import { generateText, tool } from 'ai'
import PropertyMap from '@/components/property/map-ui'
import ParasManorReview from '@/components/property/paras-manor/pm-review'
import {droneFootageTranscript, movieTranscript} from '../../transcript.js'
import VideoChatResponse from '@/components/property/paras-manor/VideoChatResponse'
import Report from '@/components/property/report'

async function fetchPropertyListings(locations, minPrice, maxPrice, minBedrooms, maxBedrooms) {

  const areaIds = locations?.map(location => areaIdMap.get(location)).filter(id => id !== undefined);
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

async function fetchAQIForLocation(location) {
    try {

        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`);
        
        const geoData = await geoResponse.json();

        console.log(geoData.length)
        const res = [];
        if (geoData.length > 0) {
          for(let geo of geoData) {
            const { lat, lon } = geoData[0];
    
            // Use the coordinates to get the AQI
            const aqiResponse = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`);
            
            const aqiData = await aqiResponse.json();
            res.push(aqiData);
          }  
          return res;
        } else {
            console.error(`Could not find coordinates for ${location}`);
            return `Could not find coordinates for ${location}, please mention city name `;
        }
    } catch (error) {
        console.error(`Error fetching AQI for ${location}:`, error.message);
        return 'error';
    }
}

let configuration;
let endpoint = '/';

async function submitUserMessage(content: string, route: string = '/') {
  'use server'

  if(endpoint !== route && route !== '/') {
    endpoint = route;
    const { data, error } = await supabase
      .from('chatbot')
      .select('configuration')
      .filter('configuration->>route', 'eq', route)
    if(error) throw error
    console.log(data)
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
    system: endpoint != '/' ? configuration?.chatbot_instruction : "You are a helpful assistant",

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
        description: 'A tool for displaying an Image Gallery of Paras Manor properties',
        parameters: z.object({
          title: z.string().describe('The heading displayed for the Image Gallery of Paras Manor properties'),
          description: z.string().describe('Sub heading in string format and it should never be null or undefined'),
        }),
        generate: async function* ({title, description}) {
          yield <SpinnerMessage />
          await sleep(1000)
          return (
            <BotCard>
              <p className='pb-4'>{endpoint}</p>
            </BotCard>
          );
        }
      },
      // show_property_map: {
      //   description: 'A tool for displaying UI for property map and location information',
      //   parameters: z.object({
      //       title: z.string().describe('The heading displayed for displaying paras manor properties'),
      //       description: z.string().describe('Sub heading in string format and it should never be null or undefined'),
      //       propertyName : z.string().describe('The name of the property for which the user is asking location information or map, the name should exactly match any name from the key Areas in Gurgaon'),
      //     }),    
      //     generate: async function* ({title, description, propertyName, details}) {
      //       yield <SpinnerMessage />
      //       await sleep(1000)
      //       const areaId = areaIdMap.get(propertyName)
      //       return (
      //         <BotCard>
      //           {!areaId ? (
      //             <p>{`No location data available for ${propertyName}`}</p>
      //           ): (
      //             <>
      //               <p className='font-semibold pb-2'>{title}</p>
      //               <p className='pb-4'>{description}</p>
      //               <PropertyMap areaId={areaId}/>
      //             </>
      //           )} 
      //         </BotCard>
      //       );
      //     }
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
            return tool.toolName === 'show_category_selection' ? (
              <BotCard>
                <CategoryMultiSelect categories={tool.result.categories} />
              </BotCard>
            ) : tool.toolName === 'show_date_range_selection' ? (
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