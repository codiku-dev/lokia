declare module 'react-native-syntax-highlighter' {
    import { ComponentType } from 'react';

    interface SyntaxHighlighterProps {
        language?: string;
        style?: any;
        highlighter?: 'prism' | 'hljs';
        customStyle?: any;
        children?: string;
    }

    const SyntaxHighlighter: ComponentType<SyntaxHighlighterProps>;
    export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/styles/hljs' {
    export const dracula: any;
    export const atomOneDark: any;
    // Add other themes as needed
} 