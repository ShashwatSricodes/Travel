import React from 'react';
import { ExternalLink } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import { Accommodation } from '../CreateTrip/types';

interface AccommodationsSectionProps {
  accommodations: Accommodation[];
}

const AccommodationsSection: React.FC<AccommodationsSectionProps> = ({ accommodations }) => {
  if (accommodations.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Where You'll Stay</h2>
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <p className="text-gray-500">No accommodations added yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Where You'll Stay</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{accommodation.name}</h3>
                <p className="text-sm text-gray-600">
                  Day {accommodation.startDay} - Day {accommodation.endDay}
                </p>
              </div>
              {accommodation.link && (
                <a
                  href={accommodation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#6ECE9D] hover:underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Book Now
                </a>
              )}
            </div>
            
            <ImageCarousel
              images={accommodation.images}
              title={accommodation.name}
              className="h-48 w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccommodationsSection;