import { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { MessageList } from './components/message-list'
import { StreamingBubble } from './components/streaming-bubble'
import { ChatInput } from './components/chat-input'
import { Message } from '@/types/ai-types'
import { Text } from '@/components/ui/text'
import { useChat } from '@/hooks/use-chat'
import { MODEL_CONFIG } from '@/configs/model-config'

export function AiChat() {
    const [messages, setMessages] = useState<Message[]>([{
        role: 'system',
        content: 'This is a conversation between user on his mobile phone and assistant, a friendly chatbot. When retunring code, use markdown code block syntax.',
    }])
    const { isModelReady, error, isModelAnswering, currentResponse, sendMessage } = useChat({ modelName: MODEL_CONFIG.modelName })


    useEffect(() => {
        if (isModelReady) {
            setTimeout(() => {
                handleSendMessage('Hello, how are you? And who are you exactly ?')
            }, 1000)
        }
    }, [isModelReady])

    const handleSendMessage = async (content: string) => {
        const userMessage: Message = { role: 'user', content }
        setMessages(prev => [...prev, userMessage])

        try {
            const response = await sendMessage([...messages, userMessage])
            if (response) {
                const assistantMessage: Message = { role: 'assistant', content: response }
                setMessages(prev => [...prev, assistantMessage])
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    if (!isModelReady) {
        return (
            <View className="flex-1 items-center justify-center bg-[#F2F2F7]">
                <Text className="text-lg text-black">Loading AI model...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center bg-[#F2F2F7]">
                <Text className="text-lg text-red-500">Error: {error}</Text>
            </View>
        )
    }


    return (
        <View className="flex flex-col flex-1">
            {messages.length === 1 && (
                <View className="flex-1 items-center justify-center bg-[#F2F2F7]">
                    <Text className="text-lg text-black">No messages yet, start chatting with Mia</Text>
                </View>
            )}
            <ScrollView className="flex-1">
                <MessageList messages={messages.filter(m => m.role !== 'system')}
                >
                    {isModelAnswering && <StreamingBubble content={currentResponse} />}
                </MessageList>

            </ScrollView>
            <View className="w-full bg-white">
                <ChatInput onSend={handleSendMessage} disabled={isModelAnswering} />
            </View>
        </View>
    )
} 