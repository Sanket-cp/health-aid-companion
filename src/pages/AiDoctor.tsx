
import Layout from "@/components/layout/Layout";

const AiDoctor = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">AI Doctor Assistant</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-medimate-primary text-white p-4">
              <h2 className="text-xl font-semibold">Health Consultation</h2>
              <p className="text-sm text-white/80">
                Chat with our AI doctor for medical assistance
              </p>
            </div>
            
            <div className="h-[600px] w-full">
              <iframe 
                src="https://ai-doctor-chatbot-1ryw.onrender.com/"
                className="w-full h-full"
                style={{ border: 'none' }}
                title="AI Doctor Chatbot"
              />
            </div>
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
