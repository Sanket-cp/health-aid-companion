
import { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ChatMessage from "@/components/ai-doctor/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AiDoctor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AI health assistant. How can I help you today? Please note that I'm designed to provide general health information and not professional medical advice.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // Simulate AI response - in a real app, you'd call an AI API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Prepare AI response based on user query
      let aiResponse = "I understand your concern. While I can provide general health information, I recommend consulting with a healthcare professional for a proper diagnosis and treatment.";
      
      // Simple pattern matching for demo purposes
      const query = inputMessage.toLowerCase();
      
      if (query.includes("headache")) {
        aiResponse = "Headaches can be caused by various factors such as stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If you're experiencing severe or persistent headaches, please consult a doctor.";
      } else if (query.includes("fever") || query.includes("temperature")) {
        aiResponse = "Fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and consider over-the-counter fever reducers if needed. If your fever is very high (above 103°F/39.4°C), persists for more than three days, or is accompanied by severe symptoms, please seek medical attention.";
      } else if (query.includes("cold") || query.includes("flu") || query.includes("cough")) {
        aiResponse = "Common cold and flu symptoms can include cough, congestion, sore throat, and sometimes fever. Rest, hydration, and over-the-counter cold medicines may help relieve symptoms. If symptoms are severe or persist for more than a week, consider consulting a healthcare provider.";
      } else if (query.includes("sleep") || query.includes("insomnia")) {
        aiResponse = "Good sleep hygiene includes maintaining a regular sleep schedule, creating a comfortable sleep environment, limiting screen time before bed, and avoiding caffeine later in the day. If you're experiencing persistent sleep problems, consider speaking with a healthcare provider.";
      }
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Failed to get response", {
        description: "Please try again or check your connection."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">AI Doctor Assistant</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-medimate-primary text-white p-4">
              <h2 className="text-xl font-semibold">Health Consultation</h2>
              <p className="text-sm text-white/80">
                Describe your symptoms or ask health-related questions
              </p>
            </div>
            
            {/* Chat messages */}
            <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isLoading && (
                <div className="flex space-x-2 p-4 max-w-[80%] bg-gray-100 rounded-2xl rounded-tl-none">
                  <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your symptoms or health question..."
                className="flex-grow"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                className="bg-medimate-primary hover:bg-medimate-secondary"
                disabled={isLoading || !inputMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
          
          <div className="mt-6 text-sm text-gray-600 text-center">
            <p>
              <strong>Important:</strong> This AI assistant provides general health information only.
              It is not a substitute for professional medical advice, diagnosis, or treatment.
              Always seek the advice of your physician or other qualified health provider.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AiDoctor;
