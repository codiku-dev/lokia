import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { type LLMOutputComponent } from "@llm-ui/react";

export const MarkdownBlock: LLMOutputComponent = ({ blockMatch }) => {
    const markdown = blockMatch.output.trim();

    // If empty, return null
    if (!markdown) return null;

    // Split into paragraphs first
    const paragraphs = markdown.split('\n\n').filter(p => p.trim());

    const elements = paragraphs.map((paragraph, pIndex) => {
        const lines = paragraph.split('\n').filter(l => l.trim());

        // Handle code blocks
        if (paragraph.startsWith('```')) {
            return null; // Code blocks are handled by CodeBlock component
        }

        // Handle headers
        if (lines[0].startsWith('# ')) {
            return <Text key={pIndex} className="mb-2 text-xl font-bold">{lines[0].slice(2)}</Text>;
        }
        if (lines[0].startsWith('## ')) {
            return <Text key={pIndex} className="mb-2 text-lg font-bold">{lines[0].slice(3)}</Text>;
        }

        // Handle lists
        if (lines[0].startsWith('- ')) {
            return (
                <View key={pIndex} className="mb-2">
                    {lines.map((line, lIndex) => (
                        <Text key={lIndex} className="mb-1 ml-4">• {line.slice(2)}</Text>
                    ))}
                </View>
            );
        }

        // Regular text
        return (
            <Text key={pIndex} className="mb-2">
                {lines.join('\n')}
            </Text>
        );
    }).filter(Boolean); // Remove null elements

    // If no elements after processing, return null
    if (elements.length === 0) return null;

    return (
        <View className="space-y-2">
            {elements}
        </View>
    );
};