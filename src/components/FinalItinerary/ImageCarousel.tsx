import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title: string;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <Camera className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`${title} ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        
        {images.length > 1 && (
          <>
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;