import { type LLMOutputComponent } from "@llm-ui/react";
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';

export const CodeBlock: LLMOutputComponent = ({ blockMatch }) => {
    // Remove markdown code block markers and get the code
    const code = blockMatch.output.replace(/```[\w]*\n/, '').replace(/```$/, '');

    return (
        <ScrollView horizontal className="bg-[#0D1117] rounded-lg p-2">
            <Text className="font-mono text-sm text-white">
                {code}
            </Text>
        </ScrollView>
    );
};