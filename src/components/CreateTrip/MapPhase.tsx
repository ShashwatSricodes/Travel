import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
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

function MapEvents({ onMapClick }: { onMapClick: (latlng: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

interface MapPhaseProps {
  places: Place[];
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const MapPhase: React.FC<MapPhaseProps> = ({
  places,
  setPlaces,
  selectedDay,
  setSelectedDay,
  onNext,
  onBack,
}) => {
  const [pendingLocation, setPendingLocation] = useState<{ lat: number; lng: number; name?: string } | null>(null);

  const handleMapClick = (latlng: LatLng) => {
    setPendingLocation({
      lat: latlng.lat,
      lng: latlng.lng,
      name: `Location ${places.length + 1}`
    });
  };

  const handleSearch = (location: { lat: number; lng: number; name: string }) => {
    const newPlace: Place = {
      day: selectedDay,
      location: { lat: location.lat, lng: location.lng },
      name: location.name,
    };
    setPlaces((current) => [...current, newPlace]);
  };

  const addPendingLocation = () => {
    if (pendingLocation) {
      const newPlace: Place = {
        day: selectedDay,
        location: { lat: pendingLocation.lat, lng: pendingLocation.lng },
        name: pendingLocation.name || `Location ${places.length + 1}`,
      };
      setPlaces((current) => [...current, newPlace]);
      setPendingLocation(null);
    }
  };

  const cancelPendingLocation = () => {
    setPendingLocation(null);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
      <div className="rounded-lg overflow-hidden border border-gray-200" style={{ height: '400px' }}>
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapEvents onMapClick={handleMapClick} />
          <MapSearchControl 
            onSearch={handleSearch} 
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
          {places.map((place, index) => (
            <Marker key={index} position={[place.location.lat, place.location.lng]} icon={defaultIcon} />
          ))}
          {pendingLocation && (
            <Marker 
              position={[pendingLocation.lat, pendingLocation.lng]} 
              icon={new Icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                className: 'pending-marker'
              })}
            />
          )}
        </MapContainer>
      </div>

      {/* Pending Location Confirmation */}
      {pendingLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900">Add this location to Day {selectedDay}?</h4>
              <p className="text-sm text-blue-700">
                Coordinates: {pendingLocation.lat.toFixed(4)}, {pendingLocation.lng.toFixed(4)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={cancelPendingLocation}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addPendingLocation}
                className="px-3 py-1 text-sm bg-[#6ECE9D] text-black rounded hover:bg-[#6ECE9D]/90 transition-colors"
              >
                Add Location
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Selected Places</h3>
        {places.length === 0 ? (
          <p className="text-gray-500 text-sm">Search for places or click on the map to add them to your itinerary</p>
        ) : (
          <div className="space-y-2">
            {places.map((place, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-900">Day {place.day}</span>
                  <p className="text-sm text-gray-500">{place.name}</p>
                </div>
                <button
                  onClick={() => setPlaces(places.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Remove
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