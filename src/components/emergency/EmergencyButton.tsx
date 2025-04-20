
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "@/hooks/useLocation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EmergencyButton = () => {
  const { location, getCurrentLocation } = useLocation();

  const handleEmergencyClick = () => {
    if (!location) {
      getCurrentLocation();
      toast.info('Getting your location...', {
        description: 'Please enable location services if prompted.'
      });
    }
  };

  return (
    <Link to={`/emergency${location ? `?lat=${location.lat}&lng=${location.lng}` : ''}`} className="inline-block">
      <Button 
        className="emergency-button flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
        onClick={handleEmergencyClick}
      >
        <Bell className="h-5 w-5" />
        <span>Emergency</span>
      </Button>
    </Link>
  );
};

export default EmergencyButton;
