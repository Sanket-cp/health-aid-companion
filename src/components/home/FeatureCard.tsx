
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkTo: string;
  color?: string;
}

const FeatureCard = ({ icon, title, description, linkTo, color = 'bg-medimate-primary' }: FeatureCardProps) => {
  return (
    <Link to={linkTo} className="block">
      <div className="card-gradient p-6 h-full hover:shadow-lg transition-shadow duration-300">
        <div className={`${color} w-14 h-14 flex items-center justify-center rounded-full mb-4 text-white`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;
