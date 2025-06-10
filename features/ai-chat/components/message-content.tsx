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
        // Normalize whitespace
        .replace(/\s+/g, ' ')
        .trim();
}

// Create a letter-by-letter throttle configuration
const throttle = throttleBasic({
    readAheadChars: 0, // Don't withhold any characters
    targetBufferChars: 0, // Don't maintain any buffer
    adjustPercentage: 0.1, // Small adjustments to maintain smooth display
    frameLookBackMs: 100, // Short lookback for immediate response
    windowLookBackMs: 50, // Short window for precise control
});

export function MessageContent({ content, isStreamFinished }: MessageContentProps) {
    const { blockMatches } = useLLMOutput({
        llmOutput: content,
        fallbackBlock: {
            component: MarkdownBlock, // from Step 1
            lookBack: markdownLookBack(),
        },
        blocks: [
            {
                component: CodeBlock, // from Step 2
                findCompleteMatch: findCompleteCodeBlock(),
                findPartialMatch: findPartialCodeBlock(),
                lookBack: codeBlockLookBack(),
            },
        ],
        isStreamFinished,
        throttle,
    });
    return (
        <View>
            {blockMatches.map((blockMatch, index) => {
                const Component = blockMatch.block.component;
                return <Component key={index} blockMatch={blockMatch} />;
            })}
        </View>
    );
} 