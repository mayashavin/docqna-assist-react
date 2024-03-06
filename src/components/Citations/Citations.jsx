import { Button, Divider } from '@fluentui/react-components';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import './Citations.css';

// eslint-disable-next-line react/prop-types
export const Citations = ({ citations }) => {
    const [selected, setSelected] = useState(null);
    const hasCitations = citations.some(citation => citation.display);

    if (!hasCitations) return null;

    return (
        <div>
            <Divider>Citations</Divider>
            <ul className='citations-list'>
                {citations.map((citation, index) => citation.display && (
                    <li key={index}>
                        <Button 
                            onClick={() => setSelected(index)} 
                            className={selected === index ? "selected" : ""}
                        >{`${index + 1}-${citation.filepath}`}</Button>
                    </li>
                ))}
            </ul>
            {citations[selected]?.display && 
            <Markdown >
                {citations[selected].content}
            </Markdown>}
        </div>
    )
}
