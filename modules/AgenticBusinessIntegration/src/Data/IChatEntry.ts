export interface IChatEntry {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
}