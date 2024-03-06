import React, { useState } from 'react';
import { Text, Spinner, Button, useId, Textarea, Field } from '@fluentui/react-components';
import { AnswerSection } from '../AnswerSection/AnswerSection';
import {
    Send16Filled
  } from "@fluentui/react-icons";
import './DocQnA.css';

export const DocQnA = () => {
    const [question, setQuestion] = useState("");
    const [prevQuestion, setPrevQuestion] = useState("");
    const [answer, setAnswer] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = () => {
        setError(null);
        setIsLoading(true);

        fetch("api/ask", {
            method: "POST",
            body: JSON.stringify({
                query: question
            }),
        }).then(res => res.json())
        .then(response => {
            console.log(response);
            setAnswer(response);
            setPrevQuestion(question);
            setQuestion("");
        }).catch(error => {
            console.log(error);
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const inputId = useId("input");

    return (
        <div className='doc-assistant-page'>
            <div style={{ marginInline: '5rem'}}>
                <h1>Querying Phase Demo</h1>
                <p>
                    Querying flow is when you can ask questions to the Doc Assistant service. 
                    The service then will search the indexed documents and return the best matching answer.
                </p>
                <p>
                    You can ask any question in the below input:
                </p>
            </div>
            <Field
            label="Ask me anything"
            disabled={isLoading}
            inputId={inputId}
            className='question-field'
            >
                <Textarea 
                    id={inputId} 
                    size='medium'
                    multiple
                    placeholder='Enter a question'
                    disabled={isLoading}
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                />
                <Button 
                    onClick={onSubmit} 
                    icon={<Send16Filled />} 
                    appearance='primary' 
                    disabled={isLoading || !question}
                    className='send-question-btn'
                >
                    Send question
                </Button>
            </Field>
            <div className='answer-section'>                
                {isLoading && (
                    <Spinner label="Processing your request..." labelPosition="below"/>
                )}
                {error && (
                    <Text>{error.message}</Text>
                )}
                {answer && answer.answer && (
                    <AnswerSection answer={answer} question={prevQuestion}/>
                )}
            </div>
        </div>        
    );
}