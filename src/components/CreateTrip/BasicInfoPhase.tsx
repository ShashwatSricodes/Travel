import React from 'react';
import { Upload } from 'lucide-react';

interface BasicInfoPhaseProps {
  title: string;
  setTitle: (title: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}

const BasicInfoPhase: React.FC<BasicInfoPhaseProps> = ({
  title,
  setTitle,
  duration,
  setDuration,
  imagePreview,
  onImageChange,
  onNext,
}) => {
  const isFormValid = title.trim().length > 0;

  const handleNext = () => {
    if (isFormValid) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Trip Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="7 days itinerary to Bali"
            className={`w-full px-4 py-2 rounded-lg border transition-colors ${
              title.trim().length === 0 && title.length > 0
                ? 'border-red-300 focus:ring-2 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]'
            }`}
          />
          {title.trim().length === 0 && title.length > 0 && (
            <p className="mt-1 text-sm text-red-600">Trip title is required</p>
          )}
        </div>

        {/* Duration Input */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
            Trip Duration (Days)
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D] transition-colors"
          >
            {[...Array(14)].map((_, i) => {
              const days = i + 1;
              return (
                <option key={days} value={days}>
                  {days} {days === 1 ? 'Day' : 'Days'}
                </option>
              );
            })}
          </select>
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
              id="cover-image"
            />
            <label
              htmlFor="cover-image"
              className={`relative cursor-pointer w-full h-48 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                imagePreview ? 'border-[#6ECE9D]' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                  <span className="text-xs text-gray-400">PNG, JPG up to 10MB</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`w-full font-medium py-2 rounded-lg transition-colors ${
            isFormValid
              ? 'bg-[#6ECE9D] text-black hover:bg-[#6ECE9D]/90'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Places
        </button>
        
        {!isFormValid && (
          <p className="text-sm text-gray-500 text-center">
            Please enter a trip title to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default BasicInfoPhase;