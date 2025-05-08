
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { UserRound, ShieldAlert } from "lucide-react";
import ChatInterface from "@/components/ai-doctor/ChatInterface";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
                  <CardTitle className="text-xl">AI Health Assistant</CardTitle>
                  <CardDescription className="text-white/80">
                    Your personal AI health assistant powered by advanced medical knowledge
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <ChatInterface />
            </CardContent>
            
            <CardFooter className="bg-gray-50 border-t p-4">
              <Alert className="w-full bg-blue-50 border-blue-200">
                <ShieldAlert className="h-5 w-5 text-blue-500" />
                <AlertTitle className="text-blue-700">Health Privacy Notice</AlertTitle>
                <AlertDescription className="text-blue-600">
                  Your conversation is processed securely. We don't store your personal health data.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
          
          <div className="mt-6 space-y-4">
            <Alert variant="default" className="bg-orange-50 border-orange-200">
              <AlertTitle className="text-orange-700 font-medium">Medical Disclaimer</AlertTitle>
              <AlertDescription className="text-orange-700">
                This AI assistant provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment.
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </AlertDescription>
            </Alert>
            
            <div className="text-sm text-gray-600 space-y-3">
              <h3 className="font-semibold text-gray-700">What you can ask:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>General information about symptoms and conditions</li>
                <li>Health and wellness recommendations</li>
                <li>Nutrition and exercise guidance</li>
                <li>Understanding medical terminology</li>
                <li>First aid information</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AiDoctor;
