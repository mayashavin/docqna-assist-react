export const ROLES = {
    USER: 'user',
    ASSISTANT: 'assistant',
    SYSTEM: 'system'
} as const;

export type ROLES = typeof ROLES[keyof typeof ROLES];
export type ROLESKeys = keyof typeof ROLES;

export interface Message {
    role: ROLES;
    content: string;
    end_turn?: boolean;
};