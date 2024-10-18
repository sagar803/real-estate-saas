import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { Header } from '@/components/header'

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1">
        <AI initialAIState={{ chatId: id, messages: [] }}>
          <Chat id={id} session={session} />
        </AI>
      </main>
    </div>
  )
}
