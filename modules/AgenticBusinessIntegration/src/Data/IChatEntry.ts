export interface IChatEntry {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
    stop_sequence?: string[]; // optional stop sequence for the message
    stop_reason?: string; // optional stop reason for the message
    id?: string; // optional id for the message
    model?: string; // optional model for the message
    type?: string; // optional type for the message
    usage?: string; // optional usage for the message
}