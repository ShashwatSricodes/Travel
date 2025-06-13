import React from 'react';
import { MapPin, Camera, Calendar, Share2, Search, Heart, MessageCircle, Filter } from 'lucide-react';

const features = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "For Creators",
    subtitle: "Build your perfect trip, one day at a time",
    description: "Create stunning travel itineraries with our intuitive tools designed for travel creators.",
    features: [
      "🗺️ Select locations on an interactive map",
      "🖼️ Add stunning cover images and titles", 
      "📆 Tag places with specific days and build a clean itinerary",
      "📝 Tell your story through each stop",
      "🔗 Share your itinerary with one link"
    ]
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "For Explorers", 
    subtitle: "Not sure where to go? Let others inspire you",
    description: "Discover amazing destinations through curated itineraries from real travelers around the world.",
    features: [
      "🔍 Browse curated itineraries from real travelers",
      "🌄 Filter by destination, duration, or vibe",
      "💬 Leave comments or ask questions",
      "❤️ Save trips you love for future travel",
      "📱 Access everything on any device"
    ]
  }
];

const whyEvora = [
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "No more messy docs",
    description: "Say goodbye to scattered notes and confusing spreadsheets"
  },
  {
    icon: <Camera className="h-8 w-8" />,
    title: "Visually rich plans",
    description: "Create beautiful, day-wise itineraries in minutes"
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "Built for sharing",
    description: "Perfect for creators who want to share and travelers who want to experience"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 md:text-5xl px-4">
            Everything you need to plan & share
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Whether you're a travel creator or explorer, Evora has the tools to make your journey unforgettable.
          </p>
        </div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="rounded-2xl bg-gray-50 p-6 md:p-8">
              <div className="mb-6 inline-block rounded-lg bg-[#6ECE9D]/10 p-3 text-[#6ECE9D]">
                {feature.icon}
              </div>
              <div className="mb-2">
                <span className="text-2xl font-bold text-gray-900">✨ {feature.title}</span>
              </div>
              <h3 className="mb-4 text-lg font-semibold text-[#6ECE9D]">{feature.subtitle}</h3>
              <p className="mb-6 text-sm sm:text-base text-gray-600">{feature.description}</p>
              
              <div className="space-y-3">
                {feature.features.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Why Evora Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            🚀 Why Evora?
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {whyEvora.map((item, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
              <div className="inline-block p-3 rounded-lg bg-[#6ECE9D]/10 text-[#6ECE9D] mb-4">
                {item.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#6ECE9D]/10 to-blue-50">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🎒 Ready to explore differently?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Start building your trip now or browse itineraries from travelers across the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-[#6ECE9D] text-black font-medium rounded-lg hover:bg-[#6ECE9D]/90 transition-colors">
              Create Your First Trip
            </button>
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Browse Itineraries
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;