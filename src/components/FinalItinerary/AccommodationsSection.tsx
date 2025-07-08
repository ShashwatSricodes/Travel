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
            
            {accommodation.images.length > 0 && (
              <div className={`
                ${accommodation.images.length === 1 
                  ? 'aspect-[4/3]' 
                  : accommodation.images.length === 2 
                    ? 'grid grid-cols-2 gap-2' 
                    : 'grid grid-cols-2 gap-2'
                }
              `}>
                {accommodation.images.slice(0, 4).map((image, index) => (
                  <div 
                    key={index} 
                    className={`
                      relative overflow-hidden rounded-lg cursor-pointer group
                      ${accommodation.images.length === 1 
                        ? 'col-span-2' 
                        : accommodation.images.length === 3 && index === 0
                          ? 'row-span-2 aspect-square'
                          : 'aspect-square'
                      }
                      ${accommodation.images.length > 4 && index === 3 ? 'relative' : ''}
                    `}
                  >
                    <img
                      src={image}
                      alt={`${accommodation.name} ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {accommodation.images.length > 4 && index === 3 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          +{accommodation.images.length - 4}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccommodationsSection;