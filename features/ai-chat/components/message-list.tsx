import { useRef, useEffect, memo } from 'react'
import { ScrollView, View } from 'react-native'
import { MessageBubble } from './message-bubble'
import { Message } from '@/types/ai-types'

type MessageListProps = {
    messages: Message[]
    children?: React.ReactNode
}

export const MessageList = memo(function MessageList({ messages, children }: MessageListProps) {
    const scrollViewRef = useRef<ScrollView>(null)

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true })
        }
    }, [messages])

    return (
        <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-4 pb-48 "
            contentContainerStyle={{ gap: 8 }}
        >
            {messages.map((message, index) => (
                <MessageBubble
                    key={index}
                    message={message}
                    isLastInGroup={index === messages.length - 1 || messages[index + 1].role !== message.role}
                />
            ))}
            {children}
        </ScrollView>
    )
}) 