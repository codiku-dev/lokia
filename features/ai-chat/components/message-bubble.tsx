import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { Message } from '@/types/ai-types'
import { MessageContent } from './message-content'

type MessageBubbleProps = {
    message: Message
    isLastInGroup: boolean
    isStreamFinished?: boolean
}

export function MessageBubble({ message, isLastInGroup, isStreamFinished = true }: MessageBubbleProps) {
    const isUser = message.role === 'user'

    return (
        <View className={cn(
            "flex w-full",
            isUser ? "items-end" : "items-start"
        )}>
            <View className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 mb-10 pb-4",
                isUser ? "bg-[#007AFF]" : "bg-[#E9E9EB]",
                isUser ? "rounded-br-sm" : "rounded-bl-sm",
                !isLastInGroup && (isUser ? "rounded-tr-sm" : "rounded-tl-sm")
            )}>
                {isUser ? (
                    <Text className="text-sm leading-relaxed text-white">
                        {message.content}
                    </Text>
                ) : (
                    <MessageContent
                        content={message.content}
                        isStreamFinished={isStreamFinished}
                    />
                )}
            </View>
        </View>
    )
} 