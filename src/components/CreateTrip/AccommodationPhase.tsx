import React from 'react';
import { Plus, X } from 'lucide-react';
import { Accommodation } from './types';

interface AccommodationPhaseProps {
  accommodations: Accommodation[];
  setAccommodations: React.Dispatch<React.SetStateAction<Accommodation[]>>;
  newAccommodation: Partial<Accommodation>;
  setNewAccommodation: React.Dispatch<React.SetStateAction<Partial<Accommodation>>>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  duration: number;
  onNext: () => void;
  onBack: () => void;
}

const AccommodationPhase: React.FC<AccommodationPhaseProps> = ({
  accommodations,
  setAccommodations,
  newAccommodation,
  setNewAccommodation,
  onImageChange,
  duration,
  onNext,
  onBack,
}) => {
  const addAccommodation = () => {
    if (newAccommodation.name && newAccommodation.link) {
      const accommodation: Accommodation = {
        id: Date.now().toString(),
        name: newAccommodation.name,
        startDay: newAccommodation.startDay || 1,
        endDay: newAccommodation.endDay || 1,
        link: newAccommodation.link,
        images: newAccommodation.images || [],
      };
      setAccommodations((prev) => [...prev, accommodation]);
      setNewAccommodation({
        startDay: 1,
        endDay: 1,
        images: [],
      });
    }
  };

  const removeAccommodation = (id: string) => {
    setAccommodations((prev) => prev.filter((acc) => acc.id !== id));
  };

  const removeAccommodationImage = (index: number) => {
    setNewAccommodation((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Add Accommodations</h3>
        
        {/* Add New Accommodation Form */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accommodation Name
            </label>
            <input
              type="text"
              value={newAccommodation.name || ''}
              onChange={(e) => setNewAccommodation(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              placeholder="Hotel/Airbnb name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Day
              </label>
              <select
                value={newAccommodation.startDay}
                onChange={(e) => setNewAccommodation(prev => ({ ...prev, startDay: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              >
                {[...Array(duration)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Day {i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Day
              </label>
              <select
                value={newAccommodation.endDay}
                onChange={(e) => setNewAccommodation(prev => ({ ...prev, endDay: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              >
                {[...Array(duration)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Day {i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Booking Link
            </label>
            <input
              type="url"
              value={newAccommodation.link || ''}
              onChange={(e) => setNewAccommodation(prev => ({ ...prev, link: e.target.value }))}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onImageChange}
                className="hidden"
                id="accommodation-images"
              />
              <label
                htmlFor="accommodation-images"
                className="cursor-pointer block w-full px-4 py-2 text-sm text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Plus className="inline-block w-5 h-5 mr-2" />
                Add Images
              </label>
              {newAccommodation.images && newAccommodation.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {newAccommodation.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Accommodation ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeAccommodationImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={addAccommodation}
            className="w-full px-4 py-2 bg-[#6ECE9D] text-black rounded-lg hover:bg-[#6ECE9D]/90 transition-colors"
          >
            Add Accommodation
          </button>
        </div>

        {/* Existing Accommodations List */}
        {accommodations.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Added Accommodations</h4>
            <div className="space-y-3">
              {accommodations.map((accommodation) => (
                <div key={accommodation.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-medium text-gray-900">{accommodation.name}</h5>
                      <p className="text-sm text-gray-600">
                        Day {accommodation.startDay} - Day {accommodation.endDay}
                      </p>
                    </div>
                    <button
                      onClick={() => removeAccommodation(accommodation.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {accommodation.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {accommodation.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${accommodation.name} ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  <a
                    href={accommodation.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#6ECE9D] hover:underline"
                  >
                    View Booking Link
                  </a>
                </div>
              ))}
            </div>
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
          Continue to Daily Plan
        </button>
      </div>
    </div>
  );
};

export default AccommodationPhase;