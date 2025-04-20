
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  phone?: string;
  distance: number;
  type: "hospital" | "pharmacy";
  lat: number;
  lng: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNearbyPlaces = async (lat: number, lng: number) => {
    const categories = ['healthcare.hospital', 'healthcare.pharmacy'];
    const radius = 5000; // 5km radius

    try {
      const places: Place[] = [];
      
      for (const category of categories) {
        const response = await fetch(
          `https://api.geoapify.com/v2/places?` +
          `categories=${category}&` +
          `filter=circle:${lng},${lat},${radius}&` +
          `bias=proximity:${lng},${lat}&` +
          `limit=10&` +
          `apiKey=762aec923a8a4d688ab11ca78e33bf0c`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch nearby places');
        }

        const data = await response.json();
        
        const newPlaces = data.features.map((feature: any) => ({
          id: feature.properties.place_id,
          name: feature.properties.name || 'Unnamed Location',
          address: feature.properties.formatted || 'No address available',
          phone: feature.properties.phone,
          distance: Math.round(feature.properties.distance_meters / 100) / 10,
          type: category.includes('hospital') ? 'hospital' : 'pharmacy',
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
        }));

        places.push(...newPlaces);
      }

      setPlaces(places.sort((a, b) => a.distance - b.distance));
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      toast.error('Failed to fetch nearby locations');
    }
  };

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
          setLocation({
            lat: latitude,
            lng: longitude,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          });
          await fetchNearbyPlaces(latitude, longitude);
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
    places,
    isLoading,
    error,
    getCurrentLocation
  };
};
