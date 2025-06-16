import { View, ScrollView, Pressable } from 'react-native'
import { MessageList } from './components/message-list'
import { StreamingBubble } from './components/streaming-bubble'
import { ChatInput } from './components/chat-input'
import { Text } from '@/components/ui/text'
import { useChat } from '@/hooks/use-chat'
import { CHAT_CONFIG } from '@/configs/chat-config'
import { ChatConfigManager } from '@/lib/chat-manager'
import { useRef, useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react-native'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const chatConfigManager = new ChatConfigManager(CHAT_CONFIG)

export function AiChat() {
    const scrollViewRef = useRef<ScrollView>(null)
    const [showScrollTop, setShowScrollTop] = useState(false)
    const { isModelReady, error, isModelAnswering, currentResponse, sendUserMessage, messages } = useChat({
        // initialMessages: chatConfigManager.getFakeMessages(),
        modelConfig: chatConfigManager.getConfig().modelConfig,
        fakeDelay: chatConfigManager.getConfig().fakeDelay,
        // fakeMode: {
        //     fakeMessage: chatConfigManager.generateRandomMessage(),
        //     fakeResponse: chatConfigManager.generateRandomMessage()
        // }
    })

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true })
        }
    }, [messages, isModelAnswering, currentResponse])

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y
        setShowScrollTop(offsetY > 100)
    }

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true })
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
            <ScrollView
                ref={scrollViewRef}
                className="flex-1"
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <MessageList messages={messages.filter(m => m.role !== 'system')}
                >
                    {isModelAnswering && <StreamingBubble content={currentResponse} />}
                </MessageList>
            </ScrollView>
            <View className="w-full bg-white">
                <ChatInput onSend={sendUserMessage} disabled={isModelAnswering} />
            </View>
            {showScrollTop && (
                <Button
                    onPress={scrollToTop}
                    className={cn(
                        "absolute bottom-20 right-4 size-10 rounded-full bg-primary",
                        "items-center justify-center shadow-lg ",
                        "active:opacity-80"
                    )}
                >
                    <ArrowUp className="text-white" size={20} />
                </Button>
            )}
        </View>
    )
} 