import React from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  coverImage: string;
  totalDays: number;
  totalPlaces: number;
  totalCost: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  coverImage,
  totalDays,
  totalPlaces,
  totalCost,
}) => {
  return (
    <div className="relative h-96 overflow-hidden">
      <img
        src={coverImage}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
          <div className="flex items-center justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{totalDays} Days</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{totalPlaces} Places</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span>${totalCost}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;