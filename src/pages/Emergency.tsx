
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";

interface EmergencyLocation {
  id: string;
  name: string;
  type: "hospital" | "pharmacy" | "doctor";
  distance: string;
  address: string;
  phone: string;
}

const EmergencyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<EmergencyLocation[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);

  useEffect(() => {
    // In a real app, you would use the user's location to fetch nearby emergency services
    // For this demo, we'll simulate fetching nearby locations
    const getUserLocation = () => {
      setIsLoading(true);
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            
            // Simulate API fetch delay
            setTimeout(() => {
              setLocations(mockLocations);
              setIsLoading(false);
            }, 1500);
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Could not access your location", {
              description: "Please enable location services and try again."
            });
            // Use mock data even on error for demo purposes
            setTimeout(() => {
              setLocations(mockLocations);
              setIsLoading(false);
            }, 1500);
          }
        );
      } else {
        toast.error("Geolocation is not supported by your browser", {
          description: "Please try using a different browser or device."
        });
        // Use mock data for demo
        setTimeout(() => {
          setLocations(mockLocations);
          setIsLoading(false);
        }, 1500);
      }
    };

    getUserLocation();
  }, []);

  const handleCall = (phone: string, name: string) => {
    // In a real app, this would initiate a phone call
    toast.info(`Calling ${name}`, {
      description: `Phone number: ${phone}`
    });
    window.location.href = `tel:${phone}`;
  };

  // Mock data for demo purposes
  const mockLocations: EmergencyLocation[] = [
    {
      id: "1",
      name: "City General Hospital",
      type: "hospital",
      distance: "0.8 miles",
      address: "123 Main Street, Downtown",
      phone: "+1-555-123-4567"
    },
    {
      id: "2",
      name: "MedExpress Pharmacy",
      type: "pharmacy",
      distance: "1.2 miles",
      address: "456 Oak Avenue, Midtown",
      phone: "+1-555-234-5678"
    },
    {
      id: "3",
      name: "Westside Emergency Care",
      type: "hospital",
      distance: "1.5 miles",
      address: "789 Elm Boulevard, Westside",
      phone: "+1-555-345-6789"
    },
    {
      id: "4",
      name: "Dr. Sarah Johnson",
      type: "doctor",
      distance: "1.7 miles",
      address: "321 Pine Road, Suite 101",
      phone: "+1-555-456-7890"
    },
    {
      id: "5",
      name: "24/7 Care Pharmacy",
      type: "pharmacy",
      distance: "2.0 miles",
      address: "654 Maple Street, Eastside",
      phone: "+1-555-567-8901"
    }
  ];

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
            <h2 className="text-2xl font-bold mb-4">Nearby Medical Facilities</h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-medimate-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-gray-600">Finding nearby locations...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locations.map((location) => (
                  <Card key={location.id} className="overflow-hidden">
                    <CardHeader className={`py-4 ${
                      location.type === "hospital" ? "bg-red-100" : 
                      location.type === "pharmacy" ? "bg-green-100" : "bg-blue-100"
                    }`}>
                      <CardTitle className="flex justify-between items-start">
                        <span>{location.name}</span>
                        <span className="text-sm font-normal text-gray-600">{location.distance}</span>
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {location.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          {location.type === "hospital" ? "Emergency Hospital" : 
                           location.type === "pharmacy" ? "Pharmacy/Medical Store" : "Doctor's Office"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-medimate-primary text-medimate-primary"
                          onClick={() => {
                            toast.info(`Navigation to ${location.name}`, {
                              description: "This would open maps in a real app."
                            });
                          }}
                        >
                          <Navigation className="h-4 w-4 mr-1" />
                          Directions
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-medimate-primary hover:bg-medimate-secondary"
                          onClick={() => handleCall(location.phone, location.name)}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Additional Emergency Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="border-medimate-primary text-medimate-primary hover:bg-medimate-light"
                onClick={() => {
                  toast.info("Contacting emergency contact", {
                    description: "This would contact your emergency person in a real app."
                  });
                }}
              >
                Contact Emergency Person
              </Button>
              <Button 
                className="bg-medimate-emergency hover:bg-red-600 text-white"
                onClick={() => window.location.href = "/ambulance"}
              >
                Request Ambulance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmergencyPage;
