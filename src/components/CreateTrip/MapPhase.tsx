import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { X } from 'lucide-react';
import { Place } from './types';
import MapSearchControl from './MapSearchControl';

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPhaseProps {
  places: Place[];
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  duration: number;
  onNext: () => void;
  onBack: () => void;
}

const MapPhase: React.FC<MapPhaseProps> = ({
  places,
  setPlaces,
  selectedDay,
  setSelectedDay,
  duration,
  onNext,
  onBack,
}) => {
  const handleSearch = (location: { lat: number; lng: number; name: string }) => {
    const newPlace: Place = {
      day: selectedDay,
      location: { lat: location.lat, lng: location.lng },
      name: location.name,
    };
    setPlaces((current) => [...current, newPlace]);
  };

  const removePlace = (index: number) => {
    setPlaces(places.filter((_, i) => i !== index));
  };

  const getMapCenter = () => {
    if (places.length === 0) return [0, 0] as [number, number];
    
    const avgLat = places.reduce((sum, place) => sum + place.location.lat, 0) / places.length;
    const avgLng = places.reduce((sum, place) => sum + place.location.lng, 0) / places.length;
    
    return [avgLat, avgLng] as [number, number];
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="font-medium text-gray-900 text-xl">Add Places to Visit</h3>
          <p className="text-sm text-gray-600 mt-1">
            Search for specific places you want to visit during your trip
          </p>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-200" style={{ height: '400px' }}>
          <MapContainer center={getMapCenter()} zoom={places.length > 0 ? 10 : 2} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapSearchControl 
              onSearch={handleSearch} 
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              duration={duration}
            />
            {places.map((place, index) => (
              <Marker key={index} position={[place.location.lat, place.location.lng]} icon={defaultIcon} />
            ))}
          </MapContainer>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">How to add places:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use the search bar above the map to find specific places</li>
            <li>• Select the day you want to visit each place</li>
            <li>• Click "Add to Itinerary" to add the searched location</li>
            <li>• Only named places will appear in your final itinerary</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Selected Places</h3>
        {places.length === 0 ? (
          <p className="text-gray-500 text-sm">Search for places above to add them to your itinerary</p>
        ) : (
          <div className="space-y-2">
            {places.map((place, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">Day {place.day}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {place.day === 1 ? '1st' : place.day === 2 ? '2nd' : place.day === 3 ? '3rd' : `${place.day}th`} day
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{place.name}</p>
                </div>
                <button
                  onClick={() => removePlace(index)}
                  className="text-red-500 hover:text-red-600 p-1 ml-2 flex-shrink-0"
                  title="Remove place"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-[#6ECE9D] text-black rounded-lg hover:bg-[#6ECE9D]/90 transition-colors"
        >
          Continue to Accommodations
        </button>
      </div>
    </div>
  );
};

export default MapPhase;