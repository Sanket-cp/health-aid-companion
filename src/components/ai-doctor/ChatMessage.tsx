
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "mb-4 max-w-[80%]",
        isUser ? "ml-auto" : "mr-auto"
      )}
    >
      <div
        className={cn(
          "rounded-2xl p-4",
          isUser
            ? "bg-medimate-primary text-white rounded-tr-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        )}
      >
        <p className="whitespace-pre-wrap">{message}</p>
      </div>
      <p className={cn(
        "text-xs mt-1 text-gray-500",
        isUser ? "text-right" : "text-left"
      )}>
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  );
};

export default ChatMessage;
