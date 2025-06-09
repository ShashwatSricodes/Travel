import React, { useState, useCallback } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useMap } from 'react-leaflet';
import { SearchSuggestion } from './types';

interface SearchControlProps {
  onSearch: (location: { lat: number; lng: number; name: string }) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  duration: number;
}

const MapSearchControl: React.FC<SearchControlProps> = ({ onSearch, selectedDay, setSelectedDay, duration }) => {
  const map = useMap();
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);

  const debouncedFetchSuggestions = useCallback(async (value: string) => {
    if (value.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      setSuggestions([]);
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim() || isSearching) return;
    handleSelectPlace(searchValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setSelectedLocation(null);
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      debouncedFetchSuggestions(value);
    }, 300);

    setSearchTimeout(timeout);
  };

  const handleSelectPlace = async (placeName: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data && data[0]) {
        const { lat, lon: lng, display_name } = data[0];
        const location = { lat: parseFloat(lat), lng: parseFloat(lng), name: display_name };
        map.setView([location.lat, location.lng], 13);
        setSelectedLocation(location);
        setSearchValue('');
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddLocation = () => {
    if (selectedLocation) {
      onSearch(selectedLocation);
      setSelectedLocation(null);
    }
  };

  return (
    <div className="absolute top-2 left-2 right-2 z-[1000] space-y-2">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for a place (e.g., Eiffel Tower, Central Park)..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D] bg-white shadow-sm"
            disabled={isSearching}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.place_id}
                  type="button"
                  onClick={() => handleSelectPlace(suggestion.display_name)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="block text-sm text-gray-900 leading-relaxed">{suggestion.display_name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D] bg-white shadow-sm"
        >
          {[...Array(duration)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Day {i + 1}
            </option>
          ))}
        </select>
      </form>

      {/* Selected Location Preview */}
      {selectedLocation && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#6ECE9D]" />
                <span className="text-sm font-medium text-gray-900">Found Location</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{selectedLocation.name}</p>
              <p className="text-xs text-gray-500">
                Will be added to Day {selectedDay}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setSelectedLocation(null)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLocation}
                className="px-3 py-1 text-sm bg-[#6ECE9D] text-black rounded hover:bg-[#6ECE9D]/90 transition-colors"
              >
                Add to Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSearchControl;