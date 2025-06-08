import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
    text: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable."
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Founder at InnovateLabs",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
    text: "The analytics provided deep insights that transformed our decision-making process. Highly recommended!"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Head of Product at Nexus",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
    text: "Their customer support is outstanding. Any questions we had were answered promptly and thoroughly."
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
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Join Happy Customers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Hundreds of millions of page views for thousands of sites are collected with our analytics each month — see what our customers have to say.
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
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="mt-1 text-sm sm:text-base text-gray-600">{testimonial.role}</p>
                      <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 px-4">{testimonial.text}</p>
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
      </div>
    </section>
  );
};

export default TestimonialsSection;