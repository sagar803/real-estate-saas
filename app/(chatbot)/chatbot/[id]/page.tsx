import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export interface ChatPageProps {
  params: {
    id: string
  }
}

async function checkChatbotExists(id: string) {
  const { data, error } = await supabase
    .from('chatbot')
    .select('id')
    .eq('route', id)
    .maybeSingle()
  
  if (error) {
    console.error('Error checking chatbot existence:', error)
    return false
  }
  
  return data !== null
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chatbotExists = await checkChatbotExists(params.id)
  
  if (!chatbotExists) {
    redirect('/not-found')
  }

  const session = (await auth()) as Session
  const id = nanoid()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat
        id={id}
        session={session}
        // initialMessages={chat.messages}
      />
    </AI>
  )
}