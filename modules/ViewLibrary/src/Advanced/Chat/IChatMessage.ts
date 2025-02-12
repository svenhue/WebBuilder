import type { MessageSender } from "./MessageSender";

export interface IChatMessage{
    sender: MessageSender;
    message: string;
    id: number,
    isLoading?: boolean;
}