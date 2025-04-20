
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { UserRound } from "lucide-react";

const AiDoctor = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="bg-medimate-primary bg-opacity-90 text-white space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <UserRound className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">AI Doctor Assistant</CardTitle>
                  <CardDescription className="text-white/80">
                    Chat with our AI doctor for medical assistance
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="h-[600px] w-full">
                <iframe 
                  src="https://ai-doctor-chatbot-1ryw.onrender.com/"
                  className="w-full h-full"
                  style={{ border: 'none' }}
                  title="AI Doctor Chatbot"
                />
              </div>
            </CardContent>
          </Card>
          
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
