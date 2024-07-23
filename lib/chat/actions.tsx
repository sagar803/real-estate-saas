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
import { LocationMultiSelect } from '@/components/location-multi-select'
import { PriceRangeSelect } from '@/components/price-range'
import { BedroomSelect } from '@/components/bedroom-select'
import PropertyDetails from '@/components/display-property'
import { supabase } from '../../lib/supabaseClient';
import { PropertyFilter } from '@/components/property/filter'

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
    const response = await fetch(`http://localhost:3000/api/queryProperties?${queryParams.toString()}`);
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
    model: openai('gpt-3.5-turbo'),
    initial: <SpinnerMessage />,
    system: `\
        You are a property listing assistant, specializing in helping users find and discuss property listings in Gurgaon.
        Procedure for Handling User Queries:
        
        1. Identify Aresa: When a user is asking about property and has not provided any area then use the \`show_location_selection\` function to display subcategories,

        Main Categories and Their Subcategories:
        Areas in gurgaon:
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

        Additional Functions:
        1. show_properties_filter: If the user has mentioned a location subcategory, and did not mentioned price range or bedrooms count then call this function to display UI for user to select price range and bedrooms count.
        2. show_property_listings: If the user has mentioned a location subcategory, price range, and bedroom option, call this function to display the property listings.
        You can also engage in general conversation with users and provide detailed information about properties in Gurgaon.
    `
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
              <LocationMultiSelect locations={locations} />
            </BotCard>
          )
        }
      },

      show_properties_filter: {
        description: 'Show a UI for the user to select a price range and bedrooms count range.',
        parameters: z.object({
          title: z.string().describe('The title for the filter UI')
        }),
        generate: async function* ({ title }) {
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
                    args: { title }
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
                    result: { title }
                  }
                ]
              }
            ]
          })
    
          return (
            <BotCard>
              <PropertyFilter />
            </BotCard>
          )
        }
      },

      show_property_listings: {
        description: 'A tool for displaying property listings based on selected criteria.',
        parameters: z.object({
          locations: z.array(z.string()).describe('array of Selected locations'),
          minPrice: z.number().describe('Minimum price for the search criteria'),
          maxPrice: z.number().describe('Maximum price for the search criteria'),
          minBedrooms: z.number().describe('Minimum number of bedrooms for the search criteria'),
          maxBedrooms: z.number().describe('Maximum number of bedrooms for the search criteria')
        }),
        generate: async function* ({ locations, minPrice, maxPrice, minBedrooms, maxBedrooms }) {
          yield <SpinnerMessage />
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
                    args: { locations, minPrice, maxPrice, minBedrooms, maxBedrooms }
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
              <PropertyDetails listings={listings} />
            </BotCard>
          )
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