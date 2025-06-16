import { useEffect, useRef, useState } from 'react'
import RNFS from 'react-native-fs'
import { Platform, PermissionsAndroid } from 'react-native'
import { initLlama, LlamaContext, loadLlamaModelInfo } from 'llama.rn'
import { Message } from '../types/ai-types'

type Props = {
    initialMessages?: Message[]
    modelConfig: {
        use_mlock: boolean,
        n_ctx: number,
        n_gpu_layers: number,
        model: string,
    }
    fakeDelay: number
    fakeMode?: {
        fakeMessage: Message
        fakeResponse: Message
    }
}

export function useChat(p: Props) {
    const [messages, setMessages] = useState<Message[]>(p.initialMessages || [])
    const [isModelReady, setIsModelReady] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isModelAnswering, setIsModelAnswering] = useState(false)
    const [currentResponse, setCurrentResponse] = useState("")
    const contextRef = useRef<LlamaContext | null>(null)

    const checkAndRequestPermissions = async () => {
        if (Platform.OS === 'android') {
            let permissions = []
            if (Platform.Version >= 33) {
                permissions = [
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                ]
            } else if (Platform.Version >= 29) {
                permissions = [
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]
            } else {
                permissions = [
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]
            }
            const results = await PermissionsAndroid.requestMultiple(permissions)

            const allGranted = Object.values(results).every(
                result => result === PermissionsAndroid.RESULTS.GRANTED
            )

            if (!allGranted) {
                throw new Error('Storage permission denied')
            }
        }
    }

    useEffect(() => {
        async function loadModel() {
            console.log("loading model........");

            setIsModelReady(false)
            try {
                if (p.fakeMode?.fakeMessage) {
                    setIsModelReady(true)
                    return
                }

                await checkAndRequestPermissions()
                const modelPath = Platform.select({
                    android: `${RNFS.ExternalDirectoryPath}/${p.modelConfig.model}`,
                    ios: `${RNFS.DocumentDirectoryPath}/${p.modelConfig.model}`
                })
                if (!modelPath) {
                    throw new Error('Could not determine model path')
                }
                const exists = await RNFS.exists(modelPath)
                console.log('Model exists in app directory:', exists)

                if (exists) {
                    try {
                        const modelInfo = await loadLlamaModelInfo(modelPath)
                        console.log('Model info:', modelInfo)
                        if (!modelInfo) {
                            throw new Error('Model info is null')
                        }

                        console.log("Loading model...")
                        console.time("Loading model...")
                        const context = await initLlama({
                            model: `${RNFS.ExternalDirectoryPath}/${p.modelConfig.model}`,
                            n_ctx: 1024,
                            n_gpu_layers: 1,
                            use_mlock: true
                        })
                        contextRef.current = context
                        console.log("Model loaded")
                        console.timeEnd("Loading model...")

                        setIsModelReady(true)
                    } catch (modelError) {
                        console.error('Error loading model info:', modelError)
                        setError(modelError instanceof Error ? modelError.message : 'Failed to load model info')
                    }
                } else {
                    throw new Error('Model file not found in app directory')
                }
            } catch (err) {
                console.error('Error:', err)
                setError(err instanceof Error ? err.message : 'Failed to process model')
            }
        }
        loadModel()
    }, [])

    const handleFakeMode = async (content: string) => {
        setIsModelAnswering(true)
        try {
            const userMessage = p.fakeMode?.fakeMessage || { role: 'user', content }
            setMessages(prevMessages => [...prevMessages, userMessage, { role: 'assistant', content: p.fakeMode?.fakeResponse.content! }])
            // spl the fake response a simulate a fast stream to update setResponse
            const fakeResponse = p.fakeMode?.fakeResponse.content.split('')
            for (const char of fakeResponse || []) {
                setTimeout(() => {
                    setCurrentResponse(prevResponse => prevResponse + char)
                }, 100)
            }
        } finally {
            setIsModelAnswering(false)
            setCurrentResponse("")
        }
    }
    const sendUserMessage = async (content: string) => {
        if (p.fakeMode?.fakeMessage) {
            handleFakeMode(content)
            return;
        }
        const context = contextRef.current
        if (!context) {
            console.error('Model not loaded')
            return
        }
        setIsModelAnswering(true)
        let response = ""

        try {
            setMessages(prevMessages => [...prevMessages, { role: 'user', content }])

            await context.completion(
                {
                    messages: [...messages, { role: 'user', content }],
                    n_predict: -1,
                    stop: ["<end_of_turn>", "<|eot_id|>", "Human:", "Assistant:"],
                    temperature: 0.7,
                    top_p: 0.9,
                },
                async (data) => {
                    const { token } = data
                    if (!token.includes("<end_of_turn>") && !token.includes("<|eot_id|>")) {
                        response += token
                        setCurrentResponse(response)
                    }
                },
            )

            const assistantMessage = p.fakeMode?.fakeResponse || { role: 'assistant', content: response }
            setMessages(prevMessages => [...prevMessages, assistantMessage])
            setCurrentResponse("")
            return response
        } catch (error) {
            console.error('Error in completion:', error)
            throw error
        } finally {
            setIsModelAnswering(false)
        }
    }

    return {
        isModelReady,
        error,
        isModelAnswering,
        currentResponse,
        sendUserMessage,
        messages,
        setMessages
    }
} 