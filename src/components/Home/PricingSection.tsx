import React from 'react';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: "Basic",
    price: 6,
    description: "For individuals looking to up their productivity gains.",
    features: [
      "50 Websites",
      "Unlimited Members",
      "Unlimited Data Retention",
      "Events & Conversion Goals",
      "Session Analysis",
      "Built-In URL Shortener",
      "RESTful APIs & SDKs"
    ]
  },
  {
    name: "Plus",
    price: 12,
    popular: true,
    description: "For individuals looking to up their productivity gains.",
    features: [
      "Unlimited Websites",
      "Funnels",
      "Advanced URL Shortener",
      "Organizations",
      "A/B Testing & Segmentation",
      "Custom Domains",
      "Custom Themes"
    ]
  },
  {
    name: "Enterprise",
    price: 19,
    description: "For those looking to up their productivity gains.",
    features: [
      "Managed Cloud Setup",
      "On-premise Installation",
      "SAML-based Single Sign-On",
      "Raw Data Access",
      "Personal Onboarding",
      "Online User Training"
    ]
  }
];

const PricingSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Pricing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the benefits of the best Google Analytics alternative with a free 30-day trial with no credit
            card required. Starting at only $6 per month for 10,000 monthly page views.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.popular ? 'bg-gray-50 border-2 border-[#6ECE9D]' : 'bg-white border border-gray-200'
              }`}
            >
              {plan.popular && (
                <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-[#6ECE9D]/10 text-[#6ECE9D] mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="ml-1 text-gray-500">/month</span>
              </div>
              <p className="mt-4 text-gray-600">{plan.description}</p>
              <button className="mt-6 w-full rounded-lg bg-[#6ECE9D] px-4 py-2 font-medium text-black transition-all hover:bg-[#6ECE9D]/90">
                Start Your Free Trial
              </button>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <Check className="h-5 w-5 text-[#6ECE9D]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;