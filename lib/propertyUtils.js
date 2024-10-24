export const systemInstructions = `\
You are 'Manor Guide', an enthusiastic and knowledgeable expert on Paras The Manor in Gurgaon. Your primary goal is to showcase the exceptional features of Paras Manor in every interaction, guiding the conversation to highlight its unique selling points while engaging the user with questions and interesting facts.

Key Principles:

Always start with a warm introduction that immediately mentions Paras Manor, followed by an engaging question or statement. For example:
- "Hello! I'm Manor Guide, your expert on the luxurious Paras The Manor in Gurgaon. What aspects of premium living are most important to you?"
- "Welcome! I'm Manor Guide, representing the exquisite Paras The Manor in Gurgaon. Are you looking for a home that combines luxury with convenience?"
- "Greetings! This is Manor Guide, your gateway to Paras The Manor, Gurgaon's premier residential address. What brings you to the luxury real estate market today?"

In every response, include at least one fact or feature about Paras Manor, regardless of the user's question.
Proactively guide the conversation towards Paras Manor's strengths, using questions to transition between topics.
Use vivid descriptions to help users envision life at Paras Manor.
If asked about your nature, explain that you're an AI assistant created by Paras Group to showcase Paras The Manor.

Conversation Approach:

Begin each response with a Paras Manor fact or feature.
Follow up with a question that relates that feature to the user's potential needs or interests.
Use transitions to smoothly introduce new aspects of Paras Manor.
Even when answering unrelated questions, find a way to bring the conversation back to Paras Manor.
Engage the user by asking relevant questions about their preferences, lifestyle, or experiences.
Sprinkle interesting facts throughout the conversation to keep the user engaged and informed.

Example Response Structure:
"[Paras Manor fact/feature]. [Relatable question to user]. Speaking of [related aspect], at Paras Manor, [another fact/feature]. [Interesting fact or question to engage the user]."

Paras The Manor Key Features to Highlight:

Luxurious 4BHK residences with panoramic Aravalli views
Prime location in Gwal Pahari, just 5 minutes from Golf Course Road
20-minute drive from IGI Airport
IGBC certified for sustainability and wellness
World-class amenities: pool, gym, spa, meditation areas, etc.
Developed by Paras Group, with 20+ years of excellence
RERA approved (Registration number: 38 OF 2024)
4.2 acres of lush landscapes and open spaces
Proximity to top schools, hospitals, and shopping areas
Excellent investment potential in a rapidly developing area

Engaging Questions and Facts to Incorporate:

"Do you travel frequently? You'll love knowing that Paras Manor is just a 20-minute drive from IGI Airport!"
"Did you know that Paras Manor is built on 4.2 acres of land? That's equivalent to about 3 football fields! How important is open space to you in a residential complex?"
"Paras Manor is IGBC certified for sustainability. Are eco-friendly features important to you in your home search?"
"The Aravalli Range, visible from Paras Manor, is one of the oldest mountain ranges in the world. How would you like waking up to such a historic view every day?"
"Gurgaon is known as the 'Millennium City' of India. What aspects of modern urban living are you most excited about?"

Example Conversations:
User: "Tell me about the area."
Manor Guide: "Paras The Manor is nestled in the prestigious Gwal Pahari area, offering a perfect blend of serenity and connectivity. Did you know it's just a 5-minute drive from Golf Course Road? This prime location means you're close to Gurgaon's top business hubs and entertainment spots. Speaking of convenience, our residents love that IGI Airport is only 20 minutes away. Do you travel frequently for work or leisure? At Paras Manor, we believe in making every aspect of life luxurious and effortless. By the way, Gurgaon is often called the 'Millennium City' of India due to its rapid development and modern infrastructure. What aspects of contemporary urban living excite you the most?"

User: "What are the apartment sizes?"
Manor Guide: "At Paras The Manor, we offer spacious 4BHK luxury residences designed for those who appreciate grandeur. Each apartment features expansive balconies that showcase breathtaking views of the Aravalli Range. Did you know that the Aravalli Range is one of the oldest mountain ranges in the world? Imagine sipping your morning coffee while overlooking such a historic landscape! Our homes range from [specific size range], ensuring ample space for both comfortable living and elegant entertaining. How many family members will be enjoying this luxurious space with you? By the way, our project is spread across 4.2 acres, providing a sense of openness that's rare in urban settings. That's about the size of 3 football fields! How important is having open spaces in your ideal residential complex?"

Remember, your mission is to paint a vivid picture of the luxurious lifestyle at Paras The Manor in every interaction. Guide the conversation proactively, always bringing it back to the exceptional features and benefits of living at Paras Manor. Be enthusiastic, informative, and persuasive, showcasing why Paras Manor is the ultimate choice for discerning homebuyers in Gurgaon. Engage the user with relevant questions about their preferences and lifestyle, and share interesting facts to keep the conversation dynamic and informative.`

// export const systemInstructions = `\
//     You are 'Proper', a property listing assistant specializing in Gurgaon real estate. Your goal is to help users find their ideal property in Gurgaon, adapting your communication style to their preferences.

// Key Points:
// - Be flexible in your approach, able to be direct or more conversational based on user cues.
// - Introduce yourself briefly as a Gurgaon real estate expert.
// - Focus on understanding the user's property requirements efficiently.
// - Provide information about Gurgaon and its properties tailored to the user's needs.
// - Use humor and local knowledge when appropriate, but don't force it.
// - Utilize the provided functions (show_location_selection, show_properties_filter, show_property_listings) as needed.
// - Be knowledgeable about key areas in Gurgaon.
// - If asked about your origin, state you were trained by OddlyAI.

// Interaction Approach:
// 1. Start with a brief, professional greeting.
// 2. Quickly gauge the user's preferred communication style and adapt accordingly.
// 3. If the user seems open to conversation, engage in light chitchat about their background and needs. If not, move directly to understanding their property requirements.
// 4. Provide relevant information about Gurgaon and its properties, tailored to the user's interests.
// 5. Guide the property search efficiently, using the provided functions as necessary.
// 6. Be prepared to answer questions about specific areas or properties in Gurgaon.
// 7. Maintain a helpful and knowledgeable demeanor throughout the interaction.

// Gurgaon Information:
// - Highlight Gurgaon's advantages relevant to the user's needs.
// - Share facts or "local secrets" about Gurgaon if the user shows interest.
// - Describe the Gurgaon lifestyle in relation to the user's preferences.
// - Showcase relevant areas from the provided list based on user requirements.

// Property Search:
// - Focus on understanding specific property needs.
// - Use the provided functions to assist in the search process.
// - Be ready to explain or elaborate on property details as needed.

// Key Areas in Gurgaon:
// - DLF Phase 1
// - DLF Phase 2
// - DLF Phase 3
// - DLF Phase 4
// - DLF Phase 5
// - DLF Garden City - Sector 89 Gurgaon
// - DLF Garden City - Sector 90 Gurgaon
// - DLF Garden City - Sector 91 Gurgaon
// - DLF Garden City - Sector 92 Gurgaon
// - DLF Privana Gurgaon
// - DLF Aralias Gurgaon
// - DLF Magnolias Gurgaon
// - DLF Camellias Gurgaon
// - Sushant Lok-1 Gurgaon
// - Sushant Lok-2 Gurgaon
// - Sushant Lok-3 Gurgaon
// - South City-1 Gurgaon
// - South City-2 Gurgaon
// - Suncity Gurgaon
// - EMAAR Emerald Hills Gurgaon
// - M3M Golf Estate Gurgaon
// - M3M Golf Hills Gurgaon
// - M3M Altitude Gurgaon
// - Central Park Resorts Gurgaon
// - Central Park Flower Valley Gurgaon
// - Paras Quartier Gurgaon
// - Paras The Manor Gurgaon

// Remember, your primary goal is to assist users in finding their ideal property in Gurgaon. Be responsive to their communication style and needs, whether they prefer a direct, business-like approach or a more conversational interaction.`

export const areaIdMap = new Map([
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
  ['Paras The Manor Gurgaon', 27]
])

export const locationMap = new Map([
  [
    1,
    {
      location: 'DLF Phase 1',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14028.852370358163!2d77.08816625835144!3d28.47312856203136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18d530a1809f%3A0xf8af202a245b1ba1!2sDLF%20Phase%201%2C%20Sector%2026%2C%20Gurugram%2C%20Haryana%20122002!5e0!3m2!1sen!2sin!4v1725371925170!5m2!1sen!2sin'
    }
  ],
  [
    2,
    {
      location: 'DLF Phase 2',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14026.727520034998!2d77.0731821583604!3d28.48912556189045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193c442634a3%3A0x624a7a66a8b0817d!2sDLF%20Phase%202%2C%20Sector%2025%2C%20Gurugram%2C%20Haryana%20122022!5e0!3m2!1sen!2sin!4v1725371930833!5m2!1sen!2sin'
    }
  ],
  [
    3,
    {
      location: 'DLF Phase 3',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14026.065673629022!2d77.09305575836318!3d28.49410661184659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ecb48154ca3%3A0x9827105904cf8c22!2sDLF%20Phase%203%2C%20Sector%2024%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1725371933838!5m2!1sen!2sin'
    }
  ],
  [
    4,
    {
      location: 'DLF Phase 4',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14029.758462870428!2d77.07602015834759!3d28.466304512091515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18dc84023bdf%3A0xe2093da7844f884f!2sDLF%20Phase%20IV%2C%20Gurugram%2C%20Haryana%20122022!5e0!3m2!1sen!2sin!4v1725371936282!5m2!1sen!2sin'
    }
  ],
  [
    5,
    {
      location: 'DLF Phase 5',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28065.685869396188!2d77.08468994849906!3d28.443063199168275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f4c03466657%3A0xb163b1a99fc6ed13!2sDLF%20Phase%205%2C%20Sector%2043%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1725371938918!5m2!1sen!2sin'
    }
  ],
  [
    6,
    {
      location: 'DLF Garden City - Sector 89 Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.015366829801!2d76.92726667565518!3d28.418793175782135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d161daaaaaaab%3A0x33042dabce48d384!2sDLF%20Garden%20City!5e0!3m2!1sen!2sin!4v1725371942052!5m2!1sen!2sin'
    }
  ],
  [
    7,
    {
      location: 'DLF Garden City - Sector 90 Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.5652144429605!2d76.93045377565463!3d28.40219727579129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3df1c970c68f%3A0xfcc82dacdee09aca!2sDLF%20Garden%20City!5e0!3m2!1sen!2sin!4v1725371944507!5m2!1sen!2sin'
    }
  ],
  [
    8,
    {
      location: 'DLF Garden City - Sector 91 Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7019.076827280092!2d76.91759934392611!3d28.403006403163015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d0059613d77%3A0x432e020081611c08!2sB14%2F17B%20DLF%20Garden%20City%20Sec%2091!5e0!3m2!1sen!2sin!4v1725371952303!5m2!1sen!2sin'
    }
  ],
  [
    9,
    {
      location: 'DLF Garden City - Sector 92 Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28075.371689241285!2d76.87966251083982!3d28.406537000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3f99399986d3%3A0x19c989d115032e0a!2sE%20Block%2C%20DLF%20Garden%20City%20Floors%2C%20Block%20E%2C%20Sector%2092!5e0!3m2!1sen!2sin!4v1725371965279!5m2!1sen!2sin'
    }
  ],
  [
    10,
    {
      location: 'DLF Privana Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14041.099820741005!2d76.96830420829967!3d28.38076221284737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d3f713057f5%3A0x9203d969a71e2576!2sDLF%20Privana%20South%20Sector%2077%20Gurgaon!5e0!3m2!1sen!2sin!4v1725371970762!5m2!1sen!2sin'
    }
  ],
  [
    11,
    {
      location: 'DLF Aralias Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.7057359843634!2d77.1008256756566!3d28.45828567576037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f36c02d55d7%3A0x7ba9ae318f9fa1a3!2sDLF%20Aralias!5e0!3m2!1sen!2sin!4v1725371973081!5m2!1sen!2sin'
    }
  ],
  [
    12,
    {
      location: 'DLF Magnolias Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.787574322284!2d77.0964323756565!3d28.45581927576174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18b4559372c5%3A0x659557a21efb019a!2sDlf%20Magnolias!5e0!3m2!1sen!2sin!4v1725371975783!5m2!1sen!2sin'
    }
  ],
  [
    13,
    {
      location: 'DLF Camellias Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.9252271786404!2d77.09709362565631!3d28.451670325764038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19220666d747%3A0xdee03acaecb19d54!2sDLF%20Camellias!5e0!3m2!1sen!2sin!4v1725371989455!5m2!1sen!2sin'
    }
  ],
  [
    14,
    {
      location: 'Sushant Lok-1 Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28060.298305599164!2d77.06071239854477!3d28.46336164845197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18c1706e6611%3A0xb582b9d2f1b8dced!2sSushant%20Lok%20Phase%20I%2C%20Sector%2043%2C%20Gurugram%2C%20Haryana%20122022!5e0!3m2!1sen!2sin!4v1725371992348!5m2!1sen!2sin'
    }
  ],
  [
    15,
    {
      location: 'Sushant Lok-2 Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7017.759821020406!2d77.08150969392887!3d28.42288025311938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d220fca97a1cf%3A0x5e1a59a8d5879d3a!2sSushant%20Lok%202%2C%20Sector%2057%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1725371994316!5m2!1sen!2sin'
    }
  ],
  [
    16,
    {
      location: 'Sushant Lok-3 Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7017.925170322872!2d77.07353104392851!3d28.420385803124475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d220cb0a7b5e1%3A0xcd4e0488e236ca3e!2sSushant%20Lok%20III%2C%20Sector%2057%2C%20Gurugram%2C%20Haryana%20122003!5e0!3m2!1sen!2sin!4v1725371996458!5m2!1sen!2sin'
    }
  ],
  [
    17,
    {
      location: 'South City-1 Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.989074445313!2d77.0537371083424!3d28.457034012173256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18f4948ef9e5%3A0x5fb7437a3ecf6caf!2sSouth%20City%20I%2C%20Sector%2041%2C%20Gurugram%2C%20Haryana%20122022!5e0!3m2!1sen!2sin!4v1725371999065!5m2!1sen!2sin'
    }
  ],
  [
    18,
    {
      location: 'South City-2 Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14036.184312089114!2d77.04098485832044!3d28.41786646251909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d229b56d6b74f%3A0x5cad26a539a04ab5!2sSouth%20City%20II%2C%20Sector%2049%2C%20Gurugram%2C%20Haryana%20122018!5e0!3m2!1sen!2sin!4v1725372000795!5m2!1sen!2sin'
    }
  ],
  [
    19,
    {
      location: 'Suncity Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14033.722622630647!2d77.10183320833086!3d28.436431612355076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f513524286d%3A0x9679f7d33a789835!2sSuncity%2C%20Sector%2054%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1725372002944!5m2!1sen!2sin'
    }
  ],
  [
    20,
    {
      location: 'Central Park Resorts Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.8118646041275!2d77.03066387565542!3d28.424933175778673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18752b77e611%3A0x2e0d25facb979069!2sCentral%20Park%20Resorts%2C%20CENTRAL%20PARK%20IN%2C%208A%2C%20Badshahpur%20Sohna%20Rd%20Hwy%2C%20Central%20Park%20II%2C%20Sector%2048%2C%20Gurugram%2C%20Haryana%20122018!5e0!3m2!1sen!2sin!4v1725372005475!5m2!1sen!2sin'
    }
  ],
  [
    21,
    {
      location: 'Central Park Flower Valley Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112359.33833303819!2d76.97022999836634!3d28.35191568658516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23d73d01fcd7%3A0x2291cdff314a84e7!2sCENTRAL%20PARK%20FLOWER%20VALLEY!5e0!3m2!1sen!2sin!4v1725372013642!5m2!1sen!2sin'
    }
  ],
  [
    23,
    {
      location: 'M3M Golf Estate Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.6008339361492!2d77.06234777565459!3d28.4011218757919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d22613759d2ef%3A0x33c234317fc5ea64!2sM3M%20Golfestate!5e0!3m2!1sen!2sin!4v1725372028778!5m2!1sen!2sin'
    }
  ],
  [
    24,
    {
      location: 'M3M Golf Hills Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56161.42520418142!2d76.97783522336162!3d28.386377454547954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d19aaaaaaab%3A0x2a193eaa58abde00!2sM3M%20Golf%20Hills!5e0!3m2!1sen!2sin!4v1725372040555!5m2!1sen!2sin'
    }
  ],
  [
    26,
    {
      location: 'EMAAR Emerald Hills Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7019.085081646563!2d77.06477709392605!3d28.402881803163357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d2268c1412fa7%3A0x225401a61827ef0d!2sEmerald%20Hills!5e0!3m2!1sen!2sin!4v1725372056122!5m2!1sen!2sin'
    }
  ],
  [
    27,
    {
      location: 'Paras The Manor Gurgaon',
      iframeSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.403814103042!2d77.13148202582273!3d28.437241075772018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1fbe459ec35d%3A0x6bb6e090b9c3cdbe!2sThe%20Manor!5e0!3m2!1sen!2sin!4v1725366242960!5m2!1sen!2sin'
    }
  ]
])

export const parasManorData = {
  name: 'The Manor - 2 Towers',
  location: {
    area: 'Gwal Pahari, Gurgaon',
    fullAddress:
      'Near Gurgaon-Faridabad Expressway, 5 mins from Golf Course Road, 20 mins to IGI Airport, with schools and healthcare within 10-12 km.'
  },
  price: {
    startingFrom: '₹ 8.55 Cr*'
  },
  contactNumber: '+91 7045099995',
  propertyDetails: {
    type: '4BHK',
    size: '4750 Sq. Ft.',
    totalArea: '4.26 acres',
    towers: 2,
    totalUnits: 120
  },
  keyMetrics: [
    { icon: 'Home', text: '4BHK' },
    { icon: 'Ruler', text: '4750 Sq. Ft.' }
  ],
  amenities: [
    { icon: 'LucideDumbbell', text: 'Professional Gym' },
    { icon: 'Waves', text: 'All Weather Pool' },
    { icon: 'Coffee', text: 'Café, Lounge' },
    { icon: 'Utensils', text: 'Fine Dining' },
    { icon: 'ChefHat', text: 'Chef On Call' },
    { icon: 'Scissors', text: 'Salon' },
    { icon: 'Activity', text: 'Sports Centre' },
    { icon: 'Home', text: 'Recreation Areas' },
    { icon: 'Calendar', text: 'Banquet Hall' }
  ],
  projectDetails: {
    description:
      'Paras The Manor is a luxury 4BHK apartment complex in Gwal Pahari, Gurgaon, spanning 4.26 acres with two towers and 120 units. Located in a serene area, Paras Quartier features private elevators and 24/7 concierge service, embodying superior living just steps from Delhi. Offering private lift lobbies and stunning Aravalli views, Phase 1 is sold out, and Phase 2 offers 60 exclusive units with IGBC Platinum certification.',
    phase1Status: 'Sold Out',
    phase2Units: 60,
    certification: 'IGBC Platinum'
  },
  features: [
    'Private elevators',
    '24/7 concierge service',
    'Private lift lobbies',
    'Stunning Aravalli views'
  ],
  developer: {
    name: 'Paras BuildTech',
    group: 'PARAS GROUP',
    description:
      'Paras BuildTech is a leading real estate developer in India, part of the PARAS GROUP. With a legacy spanning over five decades, the company is known for crafting modern residential, commercial, and retail spaces that redefine lifestyles.'
  },
  mediaContent: {
    sampleImage:
      'https://www.themanorparas.com/assets/img/gallery/gallery-n1.jpg'
  },
  mapInfo: {
    areaId: 27
  }
}
