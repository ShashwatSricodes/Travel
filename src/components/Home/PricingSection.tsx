import React from 'react';
import { Check, MapPin, Camera, Share2, Crown, Zap, Globe } from 'lucide-react';

const pricingPlans = [
  {
    name: "Explorer",
    price: 0,
    description: "Perfect for casual travelers and trip planners.",
    icon: <MapPin className="w-6 h-6" />,
    features: [
      "Create up to 3 itineraries",
      "Basic map integration",
      "Photo uploads (up to 10 per trip)",
      "Share via public link",
      "Community access",
      "Mobile responsive design",
      "Basic trip templates"
    ]
  },
  {
    name: "Creator",
    price: 12,
    popular: true,
    description: "For travel influencers and content creators.",
    icon: <Camera className="w-6 h-6" />,
    features: [
      "Unlimited itineraries",
      "Advanced map features",
      "Unlimited photo uploads",
      "Custom branding",
      "Analytics & insights",
      "Priority support",
      "PDF export",
      "Collaboration tools",
      "Custom domains"
    ]
  },
  {
    name: "Agency",
    price: 29,
    description: "For travel agencies and professional planners.",
    icon: <Crown className="w-6 h-6" />,
    features: [
      "Everything in Creator",
      "Team collaboration",
      "White-label solution",
      "API access",
      "Advanced analytics",
      "Client management",
      "Custom integrations",
      "Dedicated account manager"
    ]
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Choose your adventure
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade as your travel planning needs grow. All plans include our core features to help you create amazing itineraries.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.popular 
                  ? 'bg-white border-2 border-[#6ECE9D] shadow-lg scale-105' 
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-[#6ECE9D]/10 text-[#6ECE9D] mb-4">
                  Most Popular
                </span>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[#6ECE9D]/10 text-[#6ECE9D]">
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="ml-1 text-gray-500">/month</span>
                </div>
                {plan.price === 0 && (
                  <span className="text-sm text-[#6ECE9D] font-medium">Forever free</span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <button className={`w-full rounded-lg px-4 py-3 font-medium transition-all mb-8 ${
                plan.popular
                  ? 'bg-[#6ECE9D] text-black hover:bg-[#6ECE9D]/90'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                {plan.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
              </button>
              
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <Check className="h-5 w-5 text-[#6ECE9D] mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto text-left">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Can I upgrade or downgrade anytime?</h4>
              <p className="text-gray-600 text-sm">Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the next billing cycle.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">All paid plans come with a 14-day free trial. No credit card required to start.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">What happens to my data if I cancel?</h4>
              <p className="text-gray-600 text-sm">Your itineraries remain accessible for 30 days after cancellation. You can export them anytime during this period.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600 text-sm">We offer a 30-day money-back guarantee for all paid plans. Contact support for assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;