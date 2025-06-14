import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateTrip from './pages/CreateTrip';
import FinalItinerary from './pages/FinalItinerary';
import BrowseTrips from './pages/BrowseTrips';
import HeroSection from './components/Home/HeroSection';
import FeaturesSection from './components/Home/FeaturesSection';
import TestimonialsSection from './components/Home/TestimonialsSection';
import PricingSection from './components/Home/PricingSection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/final-itinerary/:tripId" element={<FinalItinerary />} />
          <Route path="/final-itinerary" element={<FinalItinerary />} />
          <Route path="/browse" element={<BrowseTrips />} />
          <Route
            path="/"
            element={
              <main className="pt-16">
                <HeroSection />
                <FeaturesSection />
                <TestimonialsSection />
                <PricingSection />
              </main>
            }
          />
          {/* Catch all route for 404 */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                  <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                  <a 
                    href="/" 
                    className="px-6 py-3 bg-[#6ECE9D] text-black font-medium rounded-lg hover:bg-[#6ECE9D]/90 transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;