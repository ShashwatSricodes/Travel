import React from 'react';
import { Calendar, MapPin, Home, DollarSign } from 'lucide-react';
import TripMap from './TripMap';
import { Place } from '../CreateTrip/types';

interface TripOverviewProps {
  totalDays: number;
  totalPlaces: number;
  totalAccommodations: number;
  totalCost: number;
  places: Place[];
}

const TripOverview: React.FC<TripOverviewProps> = ({
  totalDays,
  totalPlaces,
  totalAccommodations,
  totalCost,
  places,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Overview</h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-[#6ECE9D]/10 rounded-lg">
              <Calendar className="w-8 h-8 text-[#6ECE9D] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalDays}</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalPlaces}</div>
              <div className="text-sm text-gray-600">Places</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <Home className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalAccommodations}</div>
              <div className="text-sm text-gray-600">Hotels</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">${totalCost}</div>
              <div className="text-sm text-gray-600">Total Cost</div>
            </div>
          </div>
        </div>
      </div>

      <TripMap places={places} />
    </div>
  );
};

export default TripOverview;