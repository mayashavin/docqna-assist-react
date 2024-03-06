import { Text, Divider } from '@fluentui/react-components';
import React from 'react';
import { Citations } from '../Citations/Citations';
import Markdown from 'react-markdown';
import './AnswerSection.css';

export const AnswerSection = ({ answer, question }) => {
    const lines = answer.answer?.split(/\[doc(\d+)\]/gm);
    const footNotes = []

    const formatted = lines?.map((line, index) => {
        if (isNaN(+line)) return (
            <Markdown key={index}>{line}</Markdown>
        )

        const footNote = +line - 1;
        footNotes.push(footNote);

        return (
            <sup className='answer-footnote' key={index}>{line}</sup>
        )
    })

    return (
        <div>
            <Divider>Result</Divider>
            <div style={{ marginBlock: '2rem' }}>
                <Text as="h4" weight='semibold' style={{ marginBlockEnd: '1rem' }}>Question: {question}</Text>
                <Text as="div" weight='regular' className='answer-wrapper-section' style={{ display: 'block' }}>{formatted}</Text>                
            </div>
            <Citations citations={answer.citations.map((citation, index) => ({ ...citation, display: footNotes.includes(index)}))} />
        </div>
    )
}