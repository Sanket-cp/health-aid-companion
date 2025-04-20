
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const EmergencyButton = () => {
  return (
    <Link to="/emergency" className="inline-block">
      <button className="emergency-button flex items-center gap-2">
        <Phone className="h-5 w-5" />
        <span>Emergency</span>
      </button>
    </Link>
  );
};

export default EmergencyButton;
