/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import { auth } from '@/auth'
import {
  IconSeparator,
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar/sidebar-mobile'
import { SidebarToggle } from './sidebar/sidebar-toggle'
import { ChatHistory } from './chat/chat-history'
import { Session } from '@/lib/types'

// async function UserOrLogin() {
//   const session = (await auth()) as Session
//   return (
//     <>
//       {session?.user ? (
//         <>
//           <SidebarMobile>
//             <ChatHistory userId={session.user.id} />
//           </SidebarMobile>
//           <SidebarToggle />
//         </>
//       ) : (
//         // <Link href="https://www.bionicdiamond.com/" rel="nofollow">
//         //   {/*<img className="size-6 object-contain" src="/images/gemini.png" alt="gemini logo" />*/}
//         // </Link>
//           <p></p>
//       )}
//       <div className="flex items-center">
//         <IconSeparator className="size-6 text-zinc-200" />
//         {session?.user ? (
//           <UserMenu user={session.user} />
//         ) : (
//             <div></div>
//         )}
//       </div>
//     </>
//   )
// }

interface HeaderProp {
  name: string;
}

export function Header({name = 'Chatbot'} : HeaderProp) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-white bg-opacity-20 border-b border-b-zinc-200">
      <p className='font-bold text-lg text-zinc-700'>
        {name}
      </p>
    </header>
  )
}
