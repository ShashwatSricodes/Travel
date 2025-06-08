import React from 'react';
import { Star } from 'lucide-react';
import NavButton from '../Navbar/NavButton';

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20 text-center md:px-6">
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
        Share Travel Essentials in a Brezze
      </h1>
      <p className="mx-auto mb-8 max-w-3xl text-base sm:text-lg text-gray-600 md:text-xl px-4">
        Privacy-friendly web analytics made and hosted in Germany — powerful, cookie-free, and fully
        compliant with GDPR, CCPA, and PECR.
      </p>
      <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row px-4">
        <NavButton>Try It For Free</NavButton>
        <button className="w-full sm:w-auto rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-900 transition-all hover:bg-gray-200">
          View Live Demo
        </button>
      </div>
      <div className="flex flex-col items-center gap-4 px-4">
        <div className="flex -space-x-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white bg-gray-200"
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" />
            ))}
          </div>
          <p className="text-sm sm:text-base text-gray-600">Trusted by 500+ Customers</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;