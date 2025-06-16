import { View } from 'react-native';
import { useLLMOutput, throttleBasic } from "@llm-ui/react";
import { codeBlockLookBack, findCompleteCodeBlock, findPartialCodeBlock } from "@llm-ui/code";
import { markdownLookBack } from "@llm-ui/markdown";
import { CodeBlock } from "@/components/ai/code-render";
import { MarkdownBlock } from "@/components/ai/markdown-renderer";
import { Text } from '@/components/ui/text';

type MessageContentProps = {
    content: string;
    isStreamFinished: boolean;
}

// Function to clean text output
function cleanText(text: string): string {
    return text
        // Replace HTML entities
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&([a-z]+);/gi, (_, entity) => {
            const entities: Record<string, string> = {
                'amp': '&',
                'lt': '<',
                'gt': '>',
                'quot': '"',
                'apos': "'",
                'nbsp': ' '
            };
            return entities[entity] || `&${entity};`;
        })
        // Remove any remaining control characters except newlines
        .replace(/[\x00-\x09\x0B-\x1F\x7F-\x9F]/g, '')
        // Normalize whitespace but preserve newlines
        .replace(/[ \t]+/g, ' ')
        .trim();
}

// Create a letter-by-letter throttle configuration
const throttle = throttleBasic({
    readAheadChars: 0,
    targetBufferChars: 0,
    adjustPercentage: 0.1,
    frameLookBackMs: 100,
    windowLookBackMs: 50,
});

export function MessageContent({ content, isStreamFinished }: MessageContentProps) {
    const cleanedContent = cleanText(content);

    const { blockMatches } = useLLMOutput({
        llmOutput: cleanedContent,
        fallbackBlock: {
            component: MarkdownBlock,
            lookBack: markdownLookBack(),
        },
        blocks: [
            {
                component: CodeBlock,
                findCompleteMatch: findCompleteCodeBlock(),
                findPartialMatch: findPartialCodeBlock(),
                lookBack: codeBlockLookBack(),
            },
        ],
        isStreamFinished,
        throttle,
    });

    // If no blocks are found, render as plain text
    if (blockMatches.length === 0) {
        return (
            <Text className="text-base">
                {cleanedContent}
            </Text>
        );
    }

    // Debug: log block matches
    // console.log("the block matches are", blockMatches)

    return (
        <View className="space-y-2">
            {blockMatches.map((blockMatch, index) => {
                const Component = blockMatch.block.component;
                // Skip empty blocks
                if (!blockMatch.output.trim()) return null;
                return <Component key={index} blockMatch={blockMatch} />;
            })}
        </View>
    );
} 