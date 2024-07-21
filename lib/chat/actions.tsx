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
import {propertyData} from '../../data.js'
import { supabase } from '../../lib/supabaseClient';



async function fetchPropertyListings(location, maxPrice, minBedrooms) {
  const areaIdMap = new Map([
    ['DLF Phase 1', 1],
    ['DLF Phase 2', 2],
    ['DLF Phase 3', 3],
    ['DLF Phase 4', 4],
    ['DLF Phase 5', 5]
  ]);

  const areaId = areaIdMap.get(location);

  const queryParams = new URLSearchParams({
    max_price: maxPrice,
    area_id: areaId,
    min_bedrooms: minBedrooms
  }).toString();

  try {
    const response = await fetch(`http://localhost:3000/api/queryProperties?${queryParams}`);
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

async function fetchArxiv(query, time) {
  console.log(query, time)
  try {
    const apiUrl = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(query +" "+time)}${time ? "&start=0&max_results=50" : ""}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const xml = await response.text();
    const json = parseXML(xml)    
    
    if (time) {
      let parsedDate = new Date(time + '-01T00:00:00Z');            
      const filteredData = json.filter((it) => new Date(it.published) >= parsedDate)      
      console.log(filteredData.length);      
      if (filteredData.length === 0) return "No relevant data found within the specified time period";      
      return filteredData.slice(0, 8);
    } else {
      return json;
    }
  } catch (error) {
      console.error('Error fetching or converting data:', error);
      return "Something went wrong";
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
        
        1. Identify Location: When a user is asking about property and has not provided any location subcategories then use the \`show_location_selection\` function to display subcategories,
        2. Lookup Subcategories: Refer to the list of main categories and their corresponding subcategories provided.
        3. Check for Subcategory Mention: If the user has already mentioned a subcategory, there is no need to call \`show_location_selection\`.

        Main Categories and Their Subcategories:
        Location:
        - DLF The Aralias
        - DLF Phase 1
        - DLF Phase 2
        - DLF Phase 3
        - DLF Phase 4
        - DLF Phase 5
        - Sushant Lok
        - Golf Course Road
        - Sohna Road
        - MG Road
        - Others

        Price Range:
        - Below 1 Crore
        - 1 Crore to 2 Crores
        - 2 Crores to 5 Crores
        - 5 Crores to 10 Crores
        - Above 10 Crores

        Bedrooms:
        - 1 Bedroom
        - 2 Bedrooms
        - 3 Bedrooms
        - 4 Bedrooms
        - 5+ Bedrooms

        Additional Functions:
        1. show_price_range_selection: If the user has mentioned a location subcategory, call this function to display price range options.
        2. show_bedroom_selection: If the user has mentioned both a location subcategory and a price range, call this function to display bedroom options.
        3. show_property_listings: If the user has mentioned a location subcategory, price range, and bedroom option, call this function to display the property listings.
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
      show_price_range_selection: {
        description: 'Show a UI for the user to select a price range.',
        parameters: z.object({
          ranges: z.array(z.string()).describe('List of price ranges to choose from'),
          title: z.string().describe('The title for the price range selection UI')
        }),
        generate: async function* ({ ranges, title }) {
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
                    toolName: 'show_price_range_selection',
                    toolCallId,
                    args: { ranges, title }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'show_price_range_selection',
                    toolCallId,
                    result: { ranges, title }
                  }
                ]
              }
            ]
          })
    
          return (
            <BotCard>
              <PriceRangeSelect ranges={ranges} />
            </BotCard>
          )
        }
      },
      show_bedroom_selection: {
        description: 'Show a UI for the user to select the number of bedrooms.',
        parameters: z.object({
          bedrooms: z.array(z.string()).describe('List of bedroom options to choose from'),
          title: z.string().describe('The title for the bedroom selection UI')
        }),
        generate: async function* ({ bedrooms, title }) {
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
                    toolName: 'show_bedroom_selection',
                    toolCallId,
                    args: { bedrooms, title }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'show_bedroom_selection',
                    toolCallId,
                    result: { bedrooms, title }
                  }
                ]
              }
            ]
          })
    
          return (
            <BotCard>
              <BedroomSelect bedrooms={bedrooms} />
            </BotCard>
          )
        }
      },
      show_property_listings: {
        description: 'A tool for displaying property listings based on selected criteria.',
        parameters: z.object({
          location: z.string().describe('Selected location'),
          minPrice: z.number().describe('Minimum price for the search criteria'),
          bedrooms: z.number().describe('Number of bedrooms for the search criteria')
        }),
        generate: async function* ({ location, minPrice, bedrooms }) {
          yield <SpinnerMessage />
          await sleep(1000)
    
          const listings = await fetchPropertyListings(location, minPrice, bedrooms)
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
                    args: { location, minPrice, bedrooms }
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