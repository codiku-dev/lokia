import { useEffect, useRef, useState } from 'react'
import RNFS from 'react-native-fs'
import { Platform, PermissionsAndroid } from 'react-native'
import { initLlama, LlamaContext, loadLlamaModelInfo } from 'llama.rn'
import { Message } from '../types/ai-types'
type Props = {
    modelName: string
}

export function useChat(p: Props) {
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
            setIsModelReady(false)
            try {
                await checkAndRequestPermissions()
                const modelPath = Platform.select({
                    android: `${RNFS.ExternalDirectoryPath}/${p.modelName}`,
                    ios: `${RNFS.DocumentDirectoryPath}/${p.modelName}`
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
                            model: modelPath,
                            use_mlock: true,
                            n_ctx: 2048,
                            n_gpu_layers: 99,
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

    const sendMessage = async (messages: Message[]) => {
        const context = contextRef.current
        if (!context) {
            console.error('Model not loaded')
            return
        }
        setIsModelAnswering(true)
        let response = ""

        try {
            await context.completion(
                {
                    messages: [...messages],
                    n_predict: 100,
                    stop: ["<|eot_id|>"],
                },
                (data) => {
                    const { token } = data
                    response += token
                    setCurrentResponse(response)
                },
            )
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
        sendMessage
    }
} 