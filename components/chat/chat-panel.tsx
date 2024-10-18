
// @ts-nocheck
import * as React from 'react'
import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export interface ChatPanelProps {
    id?: string
    title?: string
    input: string
    setInput: (value: string) => void
    isAtBottom: boolean
    scrollToBottom: () => void
}

export function ChatPanel({
                              id,
                              title,
                              input,
                              setInput,
                              isAtBottom,
                              scrollToBottom
                          }: ChatPanelProps) {
    const [aiState] = useAIState()
    const [messages, setMessages] = useUIState<typeof AI>()
    const { submitUserMessage } = useActions()
    const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
    const [showContent, setShowContent] = React.useState(true)

    const exampleMessages = [
        {
            heading: 'Discover Your Dream Home',
            subheading: 'Smart search for perfect properties',
        },
        {
            heading: 'AI-Powered Property Assistant',
            subheading: 'Let technology do the heavy lifting',
        },
        {
            heading: 'Personalized Property Recommendations',
            subheading: 'Tailored to your lifestyle',
        },
        {
            heading: 'Real-Time Market Insights',
            subheading: 'Stay ahead in a competitive market',
        },
        {
            heading: 'Virtual Home Tours',
            subheading: 'Explore properties from anywhere',
        }
    ]

    return (
        <div className={`transition fixed inset-x-0 bottom-0 w-full peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]`}>
            <ButtonScrollToBottom
                isAtBottom={isAtBottom}
                scrollToBottom={scrollToBottom}
            />

            <div className="mx-auto sm:max-w-2xl sm:px-4">
                {messages.length === 0 && (
                    <div className="mb-24 grid sm:grid-cols-3 gap-2 sm:gap-4 px-4 sm:px-0">
                        {exampleMessages.map((example, index) => (
                            <div
                                key={example.heading}
                                className={cn(
                                    'cursor-pointer bg-white bg-opacity-20 rounded-2xl p-4 sm:p-6 hover:bg-opacity-40',
                                    index > 1 && 'hidden md:block'
                                )}
                            >
                                <div className="font-medium">{example.heading}</div>
                                <div className="text-sm text-zinc-800">
                                    {example.subheading}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {messages?.length >= 2 ? (
                    <div className="flex h-fit items-center justify-center">
                        <div className="flex space-x-2">
                            {id && title ? (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShareDialogOpen(true)}
                                    >
                                        <IconShare className="mr-2" />
                                        Share
                                    </Button>
                                    <ChatShareDialog
                                        open={shareDialogOpen}
                                        onOpenChange={setShareDialogOpen}
                                        onCopy={() => setShareDialogOpen(false)}
                                        shareChat={shareChat}
                                        chat={{
                                            id,
                                            title,
                                            messages: aiState.messages
                                        }}
                                    />
                                </>
                            ) : null}
                        </div>
                    </div>
                ) : null}

                <div className="grid gap-4 sm:pb-4">
                    <PromptForm input={input} setInput={setInput} />
                    <FooterText className="hidden sm:block" />
                </div>
            </div>
        </div>
    )
}
