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
import ParasManorVideos from '@/components/property/paras-manor-video'
import { title } from 'process'
import ParasManorImageGallery from '@/components/property/paras-manor-image-gallery'
import ParasManorPropertyDetails from '@/components/property/paras-manor-property-listing'
import { tool } from 'ai'

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
    ['Suncity Gurgaon', 19],
    ['Central Park Resorts Gurgaon', 20],
    ['Central Park Flower Valley Gurgaon', 21],
    ['Paras Quartier Gurgaon', 22],
    ['M3M Golf Estate Gurgaon', 23],
    ['M3M Golf Hills Gurgaon', 24],
    ['M3M Latitude Gurgaon', 25],
    ['EMAAR Emerald Hills Gurgaon', 26],    
    
    // ['Paras The Manor Gurgaon', --],

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
    You are 'Proper', a property listing assistant specializing in Gurgaon real estate. Your goal is to help users find their ideal property in Gurgaon, adapting your communication style to their preferences.

Key Points:
- Be flexible in your approach, able to be direct or more conversational based on user cues.
- Introduce yourself briefly as a Gurgaon real estate expert.
- Focus on understanding the user's property requirements efficiently.
- Provide information about Gurgaon and its properties tailored to the user's needs.
- Use humor and local knowledge when appropriate, but don't force it.
- Utilize the provided functions (show_location_selection, show_properties_filter, show_property_listings) as needed.
- Be knowledgeable about key areas in Gurgaon.
- If asked about your origin, state you were trained by OddlyAI.

Interaction Approach:
1. Start with a brief, professional greeting.
2. Quickly gauge the user's preferred communication style and adapt accordingly.
3. If the user seems open to conversation, engage in light chitchat about their background and needs. If not, move directly to understanding their property requirements.
4. Provide relevant information about Gurgaon and its properties, tailored to the user's interests.
5. Guide the property search efficiently, using the provided functions as necessary.
6. Be prepared to answer questions about specific areas or properties in Gurgaon.
7. Maintain a helpful and knowledgeable demeanor throughout the interaction.

Gurgaon Information:
- Highlight Gurgaon's advantages relevant to the user's needs.
- Share facts or "local secrets" about Gurgaon if the user shows interest.
- Describe the Gurgaon lifestyle in relation to the user's preferences.
- Showcase relevant areas from the provided list based on user requirements.

Property Search:
- Focus on understanding specific property needs.
- Use the provided functions to assist in the search process.
- Be ready to explain or elaborate on property details as needed.

Key Areas in Gurgaon:
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
- Suncity Gurgaon
- EMAAR Emerald Hills Gurgaon
- M3M Golf Estate Gurgaon
- M3M Golf Hills Gurgaon
- M3M Altitude Gurgaon
- Central Park Resorts Gurgaon
- Central Park Flower Valley Gurgaon
- Paras Quartier Gurgaon

Remember, your primary goal is to assist users in finding their ideal property in Gurgaon. Be responsive to their communication style and needs, whether they prefer a direct, business-like approach or a more conversational interaction.`


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
        description: 'Show a UI for the user to select form all location in Gurgaon.',
        parameters: z.object({
          locations: z.array(z.string()).describe('List of all the locations to choose from in gurgaon'),
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
          yield <PropertyDetailsSkeleton />
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
      },
      show_paras_manor_video: {
        description: 'A tool for displaying Video of paras manor properties',
        parameters: z.object({
            title: z.string().describe('The heading displayed for displaying Video of parasmanor properties'),
            description: z.string().describe('Sub heading in string format and it should never be null or undefined'),
        }),    
        generate: async function* ({title, description}) {
          yield <SpinnerMessage />
          await sleep(1000)
          return (
            <BotCard>
              <p className='font-semibold pb-2'>{title}</p>
              <p className='pb-4'>{description}</p>
              <ParasManorVideos />
            </BotCard>
          );
        }
      },
      show_paras_manor_image_gallery: {
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
              <p className='font-semibold pb-2'>{title}</p>
              <p className='pb-4'>{description}</p>
              <ParasManorImageGallery />
            </BotCard>
          );
        }
      },
      show_paras_manor_property: {
        description: 'A tool for displaying UI for Paras Manor property details, including floor plans, contact information, photos, videos, and more.',
        parameters: z.object({
            title: z.string().describe('The heading displayed for displaying paras manor properties'),
            description: z.string().describe('Sub heading in string format and it should never be null or undefined'),
            activeTabProp: z.enum(['home', 'video', 'images', 'floorplan', 'contact', 'aboutus']).describe('Identify the active tab for displaying; it could be only any one of the following: home, video, images, floorplan, contact, aboutus to show details'),
          }),    
        generate: async function* ({title, description, activeTabProp}) {
          yield <SpinnerMessage />
          await sleep(1000)
          return (
            <BotCard>
              <p className='font-semibold pb-2'>{title}</p>
              <p className='pb-4'>{description}</p>
              <ParasManorPropertyDetails activeTabProp={activeTabProp}/>
            </BotCard>
          );
        }
      },
      getAqi: tool({
        description: 'A tool to fetch Air quality index.',
        parameters: z.object({ location: z.string().describe('Determine the city for which the AQI is to be retrieved, ensuring it is only the city name.') }),
        generate: async function* ({ location }) {
          yield (
            <BotCard>
              <p className='text-md animate-pulse'>Getting AQI for {location}...</p>
            </BotCard>
          )
          await sleep(1000);
          const toolCallId = nanoid();
          const aqi = await fetchAQIForLocation(location);

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
                    toolName: 'getAqi',
                    toolCallId,
                    args: { location }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'getAqi',
                    toolCallId,
                    result: aqi
                  }
                ]
              }
            ]
          })

          // // Let's get the text response          
          const newResult = await streamUI({
            model: openai('gpt-4o'),
            initial: (
              <BotCard>
                <p className='text-md animate-pulse'>Almost there...</p>
              </BotCard>
            ),
            system: `You are a helpful assistant, extract only relevant information from the given data`,
            messages: [
              ...aiState.get().messages
            ],
            text: ({ content, done, delta }) => {
              if (!textStream) {
                textStream = createStreamableValue('')
                textNode = <BotMessage content={textStream.value}/>
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
                      content: [
                        {
                          type: 'text',
                          text: content,
                          toolName: 'getAqi'
                        }
                      ]
                    }
                  ]
                })
              } else {
                textStream.update(delta)
              }
              return textNode
            }
          })
          return (
            newResult.value
          )
        },
      }),


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