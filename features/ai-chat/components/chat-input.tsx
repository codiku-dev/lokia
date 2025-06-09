import { useState } from 'react'
import { View, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react-native'

type ChatInputProps = {
    onSend: (message: string) => void
    disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [message, setMessage] = useState('')

    const handleSubmit = () => {
        if (message.trim() && !disabled) {
            onSend(message)
            setMessage('')
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="p-3 bg-white "
        >
            <View className="flex-row items-center gap-2">
                <TextInput
                    className="flex-1 bg-[#F2F2F7] rounded-full px-4 py-2.5 text-[15px]"
                    placeholder="Message"
                    placeholderTextColor="#8E8E93"
                    value={message}
                    onChangeText={setMessage}
                    onSubmitEditing={handleSubmit}
                    editable={!disabled}
                    multiline
                    maxLength={1000}
                />
                <Button
                    size="icon"
                    className="w-10 h-10 p-4 bg-black rounded-full"
                    onPress={handleSubmit}
                    disabled={!message.trim() || disabled}
                >
                    <Send height={18} width={18} className="text-white " />
                </Button>
            </View>
        </KeyboardAvoidingView>
    )
} 