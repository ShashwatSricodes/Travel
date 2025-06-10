import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateTrip from './pages/CreateTrip';
import FinalItinerary from './pages/FinalItinerary';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;