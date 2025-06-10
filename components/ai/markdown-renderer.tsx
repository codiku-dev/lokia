import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { type LLMOutputComponent } from "@llm-ui/react";

export const MarkdownBlock: LLMOutputComponent = ({ blockMatch }) => {
    const markdown = blockMatch.output;

    // Basic markdown parsing for React Native
    const lines = markdown.split('\n');
    const elements = lines.map((line, index) => {
        // Handle headers
        if (line.startsWith('# ')) {
            return <Text key={index} className="text-xl font-bold mb-2">{line.slice(2)}</Text>;
        }
        if (line.startsWith('## ')) {
            return <Text key={index} className="text-lg font-bold mb-2">{line.slice(3)}</Text>;
        }
        // Handle code blocks
        if (line.startsWith('```')) {
            return null; // Code blocks are handled by CodeBlock component
        }
        // Handle lists
        if (line.startsWith('- ')) {
            return <Text key={index} className="ml-4 mb-1">• {line.slice(2)}</Text>;
        }
        // Regular text
        return <Text key={index} className="mb-1">{line}</Text>;
    });

    return (
        <View className="space-y-1">
            {elements}
        </View>
    );
};