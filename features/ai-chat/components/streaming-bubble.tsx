import { memo } from 'react'
import { MessageBubble } from './message-bubble'

type StreamingBubbleProps = {
    content: string
}

export const StreamingBubble = memo(function StreamingBubble({ content }: StreamingBubbleProps) {
    if (!content) return null

    return (
        <MessageBubble
            message={{ role: 'assistant', content }}
            isLastInGroup={true}
            isStreamFinished={false}
        />
    )
}) 