import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Place } from '../CreateTrip/types';

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface TripMapProps {
  places: Place[];
}

const TripMap: React.FC<TripMapProps> = ({ places }) => {
  const getMapCenter = () => {
    if (places.length === 0) return [0, 0] as [number, number];
    
    const avgLat = places.reduce((sum, place) => sum + place.location.lat, 0) / places.length;
    const avgLng = places.reduce((sum, place) => sum + place.location.lng, 0) / places.length;
    
    return [avgLat, avgLng] as [number, number];
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Map</h3>
      <div className="rounded-lg overflow-hidden border border-gray-200" style={{ height: '250px' }}>
        <MapContainer center={getMapCenter()} zoom={places.length > 0 ? 10 : 2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {places.map((place, index) => (
            <Marker key={index} position={[place.location.lat, place.location.lng]} icon={defaultIcon} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default TripMap;