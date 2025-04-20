
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      toast.error('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Here we would normally use Google's Geocoding API to get the address
          // For now, we'll just use coordinates
          setLocation({
            lat: latitude,
            lng: longitude,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          });
          toast.success('Location updated successfully');
        } catch (error) {
          setError('Error getting address');
          toast.error('Error getting address');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setError('Error getting location: ' + error.message);
        setIsLoading(false);
        toast.error('Could not get your location', {
          description: 'Please enable location services and try again.'
        });
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    location,
    isLoading,
    error,
    getCurrentLocation
  };
};
