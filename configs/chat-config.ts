import { Message } from '@/types/ai-types'

type ChatConfig = {
    modelConfig: {
        use_mlock: boolean,
        n_ctx: number,
        n_gpu_layers: number,
        model: string,
    },
    fakemode: boolean,
    fakeDelay: number,
    preprompt: string,
    fakeMessages: Message[],
}

const FAKE_CODE_EXAMPLES = [
    `\`\`\`javascript
// Example of a React component
function Counter(p: { initialCount: number }) {
    const [count, setCount] = useState(p.initialCount);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
\`\`\``,
    `\`\`\`javascript
// Example of async/await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
\`\`\``,
    `\`\`\`javascript
// Example of TypeScript types
type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
};

const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    isActive: true
};
\`\`\``
];

export class ChatConfigManager {
    private config: ChatConfig

    constructor(config: ChatConfig) {
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

        // Randomly decide if we should include code
        const shouldIncludeCode = Math.random() > 0.5;
        const randomCode = FAKE_CODE_EXAMPLES[Math.floor(Math.random() * FAKE_CODE_EXAMPLES.length)];

        const baseResponse = "I'm in fake mode! I received your message about a random number.";
        const response = shouldIncludeCode
            ? `${baseResponse}\n\nHere's a code example:\n\n${randomCode}`
            : baseResponse;

        return {
            role: 'assistant' as const,
            content: response
        }
    }
}

export const CHAT_CONFIG: ChatConfig = Object.freeze({
    modelConfig: {
        use_mlock: true,
        n_ctx: 2048,
        n_gpu_layers: 99,
        model: 'llama-3.2-1b-instruct-q6_k.gguf',
    },
    fakemode: true,
    fakeDelay: 1000,
    preprompt: 'You are a helpful assistant that can answer questions and help with tasks.',
    fakeMessages: [
        {
            role: 'user' as const,
            content: 'Can you show me a React component example?',
        },
        {
            role: 'assistant' as const,
            content: `Here's a simple React counter component:

\`\`\`javascript
function Counter(p: { initialCount: number }) {
    const [count, setCount] = useState(p.initialCount);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
\`\`\``,
        },
        {
            role: 'user' as const,
            content: 'How do I handle async operations?',
        },
        {
            role: 'assistant' as const,
            content: `Here's an example of handling async operations with try/catch:

\`\`\`javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
\`\`\``,
        },
        {
            role: 'user' as const,
            content: 'Show me TypeScript types',
        },
        {
            role: 'assistant' as const,
            content: `Here's an example of TypeScript types:

\`\`\`javascript
type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
};

const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    isActive: true
};
\`\`\``,
        },
        {
            role: 'user' as const,
            content: 'Hello, how are you?',
        },
        {
            role: 'assistant' as const,
            content: 'I am fine, thank you!',
        },
        {
            role: 'user' as const,
            content: 'What is your name?',
        },
        {
            role: 'assistant' as const,
            content: 'My name is Mia',
        },
    ],
})
