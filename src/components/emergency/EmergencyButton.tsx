
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const EmergencyButton = () => {
  return (
    <Link to="/emergency" className="inline-block">
      <button className="emergency-button flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full">
        <Bell className="h-5 w-5" />
        <span>Emergency</span>
      </button>
    </Link>
  );
};

export default EmergencyButton;
