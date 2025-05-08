
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from './ChatMessage';

const API_KEY = "AIzaSyBr1-GGaxIAXmUs0AhsQoFmfSDZrCaC290";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string, timestamp: Date }>>([
    { 
      role: 'assistant', 
      content: "Hi, I'm your AI Health Assistant. I can help analyze symptoms and provide general health information. How can I assist you today?", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Function to check if symptoms might indicate an emergency
  const checkForEmergencySymptoms = (text: string): boolean => {
    const emergencyKeywords = [
      'chest pain', 'heart attack', 'stroke', 'unconscious', 
      'not breathing', 'severe bleeding', 'suicide', 'poisoning', 
      'drowning', 'severe burn', 'gunshot', 'electric shock',
      'shortness of breath', 'difficulty breathing', 'severe dizziness',
      'can\'t move', 'paralysis', 'overdose'
    ];
    
    return emergencyKeywords.some(keyword => 
      text.toLowerCase().includes(keyword)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    const userMessageObj = { role: 'user' as const, content: userMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMessageObj]);
    
    // Check for emergency symptoms
    const isEmergency = checkForEmergencySymptoms(userMessage);
    
    // If emergency, respond immediately with emergency message
    if (isEmergency) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: "⚠️ **MEDICAL EMERGENCY WARNING** ⚠️\n\nYour symptoms sound serious and may require immediate medical attention. Please:\n\n1. Call emergency services (911/112/999) immediately\n2. Go to the nearest emergency room\n3. Do not wait to see if symptoms improve\n\nI am an AI assistant and cannot provide emergency medical care. Please seek professional medical help right away.", 
            timestamp: new Date() 
          }
        ]);
      }, 500);
      return;
    }

    setIsLoading(true);

    // Construct a prompt that instructs the AI to act as a medical assistant
    const aiPrompt = `You are a helpful AI health assistant called MediMate. You provide general health information and analyze symptoms, but always clarify you're not a real doctor. Important guidelines:
    
    1. Only provide general medical information and possible causes for symptoms
    2. Always recommend consulting with a healthcare professional
    3. Use empathetic and supportive language
    4. Do not diagnose or prescribe medications
    5. Provide lifestyle and general health recommendations when appropriate
    6. If symptoms sound serious, emphasize the importance of seeking medical attention
    7. Keep responses concise and easy to understand
    
    User query: ${userMessage}`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: aiPrompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API error: ${response.status} - ${errorData?.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.candidates[0].content.parts[0].text,
          timestamp: new Date()
        }]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Show toast notification
      toast({
        title: "Connection Error",
        description: "Could not connect to AI service. Please try again later.",
        variant: "destructive"
      });
      
      // Add fallback response to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting to the medical information service right now. This might be due to a technical issue. Please try again later or contact support if the issue persists.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            message={message.content}
            isUser={message.role === 'user'}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-800">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms or ask health questions..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit"
            className="bg-medimate-primary hover:bg-medimate-secondary"
            disabled={isLoading}
          >
            <Send className="w-5 h-5" />
          </Button>
          <Button 
            type="button" 
            variant="outline"
            className="border-medimate-primary text-medimate-primary hover:bg-medimate-light"
            disabled={isLoading || true} // Temporarily disabled until we implement voice input
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
