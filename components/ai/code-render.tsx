import { type LLMOutputComponent } from "@llm-ui/react";
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { useClipboard } from '@react-native-clipboard/clipboard';
import { Check, Copy } from 'lucide-react-native';

export const CodeBlock: LLMOutputComponent = ({ blockMatch }) => {
    const [copied, setCopied] = useClipboard()
    const [isIconShowopied, setIsIconShowopied] = useState(false)
    // Remove markdown code block markers and get the code
    const code = blockMatch.output
        .replace(/```[\w]*\n/, '') // Remove opening marker
        .replace(/```$/, '') // Remove closing marker
        .trim(); // Remove extra whitespace


    const handleCopy = async () => {
        setCopied(code);
        setIsIconShowopied(true)
        setTimeout(() => {
            setIsIconShowopied(false)
        }, 1200)
    };

    return (
        <View className="relative ">
            <Pressable
                onPress={handleCopy}
                className="absolute z-10 p-1 rounded top-2 right-2 bg-white/80"
                hitSlop={8}
            >
                {isIconShowopied ? (
                    <Check size={16} className="text-green-600" />
                ) : (
                    <Copy size={16} className="text-gray-600" />
                )}
            </Pressable>
            <View className="bg-[#F5F7FA] rounded-lg p-3 border border-gray-200">
                <Text className="font-mono text-xs leading-5 text-black whitespace-pre-wrap">
                    {code}
                </Text>
            </View>
        </View>
    );
};