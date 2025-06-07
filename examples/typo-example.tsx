import React from "react";

import { Code, H1, H2, H3, H4, P } from "@/components/ui/typography";

import { BlockQuote, Lead, Large, Muted, Small } from "@/components/ui/typography";

export function TypoExample() {
    return (
        <>
            <H2 >Typography</H2>
            <H3>Heading 3</H3>
            <H4>Heading 4</H4>
            <P>Paragraph</P>
            <BlockQuote>Block Quote</BlockQuote>
            <Code>console.log("Hello, world!");</Code>
            <Lead>Lead</Lead>
            <Large>Large</Large>
            <Small>Small</Small>
            <Muted>Muted</Muted>
        </>
    )
}
