import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star, MapPin, Camera, Users } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Travel Blogger & Content Creator",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
    text: "Evora transformed how I share my travel experiences. My followers love the visual itineraries, and I've seen a 300% increase in engagement!",
    stats: { trips: 47, followers: "125K", rating: 5 }
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Adventure Travel Guide",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
    text: "As a professional guide, I need tools that work. Evora's detailed itinerary builder helps me create comprehensive trip plans that my clients absolutely love.",
    stats: { trips: 89, followers: "45K", rating: 5 }
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Digital Nomad & Travel Influencer",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
    text: "The community aspect is incredible. I've discovered hidden gems through other creators' itineraries and made connections with fellow travelers worldwide.",
    stats: { trips: 62, followers: "89K", rating: 5 }
  }
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Loved by travel creators worldwide
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of travel creators who are already using Evora to plan, share, and inspire amazing journeys.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6 sm:mb-8">
                      <div className="absolute -left-4 -top-4 -z-10 h-[calc(100%+2rem)] w-[calc(100%+2rem)] rounded-[2rem] bg-[#6ECE9D]/10"></div>
                      <img
                        src={testimonial.image}
                        alt=""
                        className="h-48 w-48 sm:h-64 sm:w-64 rounded-2xl object-cover shadow-lg"
                      />
                    </div>
                    
                    <div className="text-center max-w-xl mx-auto">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.stats.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="mt-1 text-sm sm:text-base text-[#6ECE9D] font-medium">{testimonial.role}</p>
                      
                      <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 px-4 italic">
                        "{testimonial.text}"
                      </p>
                      
                      {/* Stats */}
                      <div className="mt-6 flex justify-center gap-6 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{testimonial.stats.trips} trips</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{testimonial.stats.followers} followers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 sm:mt-12 flex justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="rounded-full bg-gray-100 p-2 sm:p-3 text-gray-600 transition-colors hover:bg-gray-200"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="rounded-full bg-gray-100 p-2 sm:p-3 text-gray-600 transition-colors hover:bg-gray-200"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Trusted by creators from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="text-lg font-semibold text-gray-400">Instagram</span>
            <span className="text-lg font-semibold text-gray-400">YouTube</span>
            <span className="text-lg font-semibold text-gray-400">TikTok</span>
            <span className="text-lg font-semibold text-gray-400">Pinterest</span>
            <span className="text-lg font-semibold text-gray-400">Travel Blogs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;