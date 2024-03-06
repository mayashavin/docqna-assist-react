import { Message } from "./messageParams.type";

export interface Citation {
    chunk_id: string;
    content: string;
    filepath: string;
    title: string;
    url: string;
}

export interface Choice {
    finish_turn?: boolean;
    index?: number;
    message: ChoiceMessage;
}

export interface ChoiceMessage extends Message {
    context: MessageContext;
}

export interface MessageContext {
    citations: Citation[];
    intent: string[];
}

export interface OYDResponseParams {
    choices: Choice[];
}
