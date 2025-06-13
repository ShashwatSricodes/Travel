import React from 'react';
import { Star, MapPin, Calendar, Users } from 'lucide-react';
import NavButton from '../Navbar/NavButton';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 md:py-20 text-center md:px-6">
      <div className="mb-6">
        <span className="inline-block px-4 py-2 bg-[#6ECE9D]/10 text-[#6ECE9D] rounded-full text-sm font-medium mb-4">
          🌍 Plan. Share. Inspire.
        </span>
      </div>
      
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
        Discover beautifully crafted 
        <span className="text-[#6ECE9D]"> travel itineraries</span>
      </h1>
      
      <p className="mx-auto mb-8 max-w-3xl text-base sm:text-lg text-gray-600 md:text-xl px-4">
        Welcome to Evora, where travel creators bring journeys to life. Whether you're planning your next adventure or sharing memories from the last one, we make it seamless.
      </p>
      
      <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row px-4">
        <NavButton>Start Creating</NavButton>
        <button 
          onClick={() => scrollToSection('browse')}
          className="w-full sm:w-auto rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-900 transition-all hover:bg-gray-200"
        >
          Browse Itineraries
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <MapPin className="w-6 h-6 text-[#6ECE9D]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">500+</div>
          <div className="text-sm text-gray-600">Destinations</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-6 h-6 text-[#6ECE9D]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">1,200+</div>
          <div className="text-sm text-gray-600">Itineraries</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-6 h-6 text-[#6ECE9D]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">10k+</div>
          <div className="text-sm text-gray-600">Travelers</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-6 h-6 text-[#6ECE9D]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">4.9</div>
          <div className="text-sm text-gray-600">Rating</div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4 px-4">
        <div className="flex -space-x-4">
          {[
            'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100',
            'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
            'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
            'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
            'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Traveler ${i + 1}`}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" />
            ))}
          </div>
          <p className="text-sm sm:text-base text-gray-600">Trusted by 10,000+ Travelers</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;