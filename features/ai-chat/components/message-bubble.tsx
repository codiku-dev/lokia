import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { Message } from '@/types/ai-types'

type MessageBubbleProps = {
    message: Message
    isLastInGroup: boolean
}

export function MessageBubble({ message, isLastInGroup }: MessageBubbleProps) {
    const isUser = message.role === 'user'

    return (
        <View className={cn(
            "flex w-full",
            isUser ? "items-end" : "items-start"
        )}>
            <View className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5",
                isUser ? "bg-[#007AFF]" : "bg-[#E9E9EB]",
                isUser ? "rounded-br-sm" : "rounded-bl-sm",
                !isLastInGroup && (isUser ? "rounded-tr-sm" : "rounded-tl-sm")
            )}>
                <Text className={cn(
                    "text-sm leading-relaxed",
                    isUser ? "text-white" : "text-black"
                )}>
                    {message.content}
                </Text>
            </View>
        </View>
    )
} 