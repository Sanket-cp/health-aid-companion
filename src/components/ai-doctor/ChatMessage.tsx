
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "mb-4 max-w-[85%]",
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
        {isUser ? (
          <p className="whitespace-pre-wrap">{message}</p>
        ) : (
          <ReactMarkdown
            components={{
              // Override styling for emergency warnings
              strong: ({node, ...props}) => (
                <strong className="text-red-600 font-bold" {...props} />
              ),
              p: ({node, ...props}) => (
                <p className="mb-2" {...props} />
              ),
              ul: ({node, ...props}) => (
                <ul className="list-disc pl-5 mb-2" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="list-decimal pl-5 mb-2" {...props} />
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        )}
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
