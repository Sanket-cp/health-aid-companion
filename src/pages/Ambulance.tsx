
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ambulance as AmbulanceIcon, Loader2, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const Ambulance = () => {
  const [isRequestingAmbulance, setIsRequestingAmbulance] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          
          // In a real app, you would reverse geocode to get the address
          // For demo purposes, we'll just set a placeholder
          setAddress("123 Current Location St, City, State");
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not access your location", {
            description: "Please enable location services or enter your address manually.",
          });
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  }, []);

  const handleRequestAmbulance = () => {
    setIsRequestingAmbulance(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRequestingAmbulance(false);
      setIsConfirmed(true);
      toast.success("Ambulance request confirmed", {
        description: "An ambulance has been dispatched to your location.",
      });
    }, 2000);
  };

  const handleCallDispatch = () => {
    // In a real app, this would initiate a phone call
    toast.info("Calling ambulance dispatch", {
      description: "This would call the ambulance service in a real app."
    });
    window.location.href = `tel:911`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Ambulance Request</h1>
          
          {!isConfirmed ? (
            <Card>
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center gap-2 text-medimate-emergency">
                  <AmbulanceIcon className="h-6 w-6" />
                  Request an Ambulance
                </CardTitle>
                <CardDescription>
                  Use this form to request an ambulance for emergency medical transport.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Your Location</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="location" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your current address"
                        className="flex-grow"
                      />
                      <Button 
                        variant="outline"
                        className="border-medimate-primary text-medimate-primary shrink-0"
                        onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(
                              (position) => {
                                setUserLocation({
                                  lat: position.coords.latitude,
                                  lng: position.coords.longitude
                                });
                                setAddress("123 Current Location St, City, State");
                                toast.success("Location updated", {
                                  description: "Using your current location."
                                });
                              },
                              (error) => {
                                toast.error("Could not access your location");
                              }
                            );
                          }
                        }}
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        Use My Location
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional">Additional Information (Optional)</Label>
                    <Textarea 
                      id="additional" 
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Describe the emergency situation, special needs, or instructions for the ambulance crew..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-6">
                    <p className="text-amber-800 text-sm">
                      <strong>Important:</strong> If this is a life-threatening emergency, 
                      please call emergency services directly at 911 while waiting for the ambulance.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={handleCallDispatch}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Directly (911)
                </Button>
                <Button 
                  className="w-full sm:w-auto bg-medimate-emergency hover:bg-red-600 text-white"
                  disabled={isRequestingAmbulance || !address}
                  onClick={handleRequestAmbulance}
                >
                  {isRequestingAmbulance ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Requesting...
                    </>
                  ) : (
                    <>
                      <AmbulanceIcon className="mr-2 h-4 w-4" />
                      Request Ambulance Now
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-700 flex items-center gap-2">
                  <AmbulanceIcon className="h-6 w-6" />
                  Ambulance Request Confirmed
                </CardTitle>
                <CardDescription>
                  An ambulance has been dispatched to your location.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h3 className="font-semibold mb-2">Dispatch Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                      <div>
                        <p className="text-sm text-gray-500">Estimated Arrival</p>
                        <p className="font-medium">8-10 minutes</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Request ID</p>
                        <p className="font-medium">AMB-{Math.floor(100000 + Math.random() * 900000)}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">Destination</p>
                        <p className="font-medium">Nearest Emergency Hospital</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Your Location</h3>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-medimate-emergency" />
                      <span>{address}</span>
                    </div>
                    
                    {additionalInfo && (
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Additional Information</h3>
                        <p className="text-gray-700">{additionalInfo}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <h3 className="font-semibold text-amber-800 mb-2">Preparing for Arrival</h3>
                    <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                      <li>If possible, have someone wait outside to guide the ambulance.</li>
                      <li>Gather any important medical documents or medication list.</li>
                      <li>Keep your phone nearby for updates or further communication.</li>
                      <li>Clear a path for paramedics to easily reach you.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={handleCallDispatch}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Ambulance Dispatch
                </Button>
                <Button 
                  className="w-full sm:w-auto bg-medimate-emergency hover:bg-red-600 text-white"
                  onClick={() => setIsConfirmed(false)}
                >
                  Cancel Request
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              <strong>Note:</strong> In a real emergency, always call your local emergency services number directly.
              This app feature is meant to supplement, not replace, traditional emergency services.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ambulance;
