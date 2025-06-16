import { Message } from "@/types/ai-types"
import { CHAT_CONFIG } from "@/configs/chat-config"

export class ChatConfigManager {
    private config: typeof CHAT_CONFIG

    constructor(config: typeof CHAT_CONFIG) {
        this.config = config
    }

    getConfig() {
        return this.config
    }

    isFakeMode() {
        return this.config.fakemode
    }

    getFakeMessages() {
        return this.config.fakeMessages
    }

    generateRandomMessage(): Message {
        const randomNumber = Math.floor(Math.random() * 1000) + 1
        return {
            role: 'user' as const,
            content: `Tell me more about the number ${randomNumber}`
        }
    }

    async simulateFakeResponse(): Promise<Message> {
        await new Promise(resolve => setTimeout(resolve, this.config.fakeDelay))
        return {
            role: 'assistant' as const,
            content: `I'm in fake mode! I received your message about a random number.`
        }
    }
}