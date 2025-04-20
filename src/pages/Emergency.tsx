
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "@/hooks/useLocation";

const EmergencyPage = () => {
  const { location, places, isLoading } = useLocation();
  const [selectedType, setSelectedType] = useState<'all' | 'hospital' | 'pharmacy'>('all');

  const handleCall = (phone: string, name: string) => {
    toast.info(`Calling ${name}`, {
      description: `Phone number: ${phone}`
    });
    window.location.href = `tel:${phone}`;
  };

  const filteredPlaces = places.filter(place => 
    selectedType === 'all' ? true : place.type === selectedType
  );

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Emergency Assistance</h1>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-center">
            <h2 className="text-2xl font-bold text-medimate-emergency mb-4">Need immediate help?</h2>
            <p className="mb-6 text-gray-700">
              If you're experiencing a medical emergency, please call emergency services immediately.
            </p>
            <Button 
              className="bg-medimate-emergency hover:bg-red-600 text-white px-8 py-6 text-xl"
              onClick={() => handleCall("911", "Emergency Services")}
            >
              <Phone className="mr-2 h-6 w-6" />
              Call Emergency Services (911)
            </Button>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Nearby Medical Facilities</h2>
              <div className="flex gap-2">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('all')}
                >
                  All
                </Button>
                <Button
                  variant={selectedType === 'hospital' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('hospital')}
                >
                  Hospitals
                </Button>
                <Button
                  variant={selectedType === 'pharmacy' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('pharmacy')}
                >
                  Pharmacies
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-medimate-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-gray-600">Finding nearby locations...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPlaces.map((place) => (
                  <Card key={place.id} className="overflow-hidden">
                    <CardHeader className={`py-4 ${
                      place.type === "hospital" ? "bg-red-100" : "bg-green-100"
                    }`}>
                      <CardTitle className="flex justify-between items-start">
                        <span>{place.name}</span>
                        <span className="text-sm font-normal text-gray-600">{place.distance}km</span>
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {place.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          {place.type === "hospital" ? "Emergency Hospital" : "Pharmacy/Medical Store"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-medimate-primary text-medimate-primary"
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
                            window.open(url, '_blank');
                          }}
                        >
                          <Navigation className="h-4 w-4 mr-1" />
                          Directions
                        </Button>
                        {place.phone && (
                          <Button 
                            size="sm"
                            className="bg-medimate-primary hover:bg-medimate-secondary"
                            onClick={() => handleCall(place.phone!, place.name)}
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmergencyPage;
