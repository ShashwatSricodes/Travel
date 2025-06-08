import React from 'react';
import { BarChart3, Filter, Search } from 'lucide-react';

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Track Everything You Need",
    description: "With a wide range of data points, you get a detailed understanding of your visitors and target audience.",
    tags: ["Pages", "Entry Pages", "Exit Pages", "Referrers", "Sources", "Media", "Campaigns", "Events"]
  },
  {
    icon: <Filter className="h-6 w-6" />,
    title: "Filter With One Click",
    description: "Our platform makes it effortless to explore your stats through intuitive filtering on a super-fast, highly visual dashboard.",
    demo: {
      filters: [
        { label: "Country", value: "Germany", type: "is" },
        { label: "Browser", value: "Firefox", type: "is not" }
      ],
      stats: [
        { path: "/", visits: "4.5k" },
        { path: "/pricing", visits: "1.9k" },
        { path: "/blog", visits: "1.6k" },
        { path: "/login", visits: "623" }
      ]
    }
  }
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 md:text-5xl px-4">
            Unlock Key Insights
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            With a powerful yet easy-to-use dashboard, you can access the most relevant data necessary to understand your customers and make the right decisions.
          </p>
        </div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="rounded-2xl bg-gray-50 p-6 md:p-8">
              <div className="mb-6 inline-block rounded-lg bg-[#6ECE9D]/10 p-3 text-[#6ECE9D]">
                {feature.icon}
              </div>
              <h3 className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{feature.title}</h3>
              <p className="mb-6 text-sm sm:text-base text-gray-600">{feature.description}</p>
              
              {feature.tags && (
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, i) => (
                    <span key={i} className="rounded-full bg-white px-3 py-1.5 text-xs sm:text-sm text-gray-600 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {feature.demo && (
                <div className="mt-6 rounded-xl bg-white p-4 shadow-sm">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <div className="flex flex-wrap items-center gap-2 rounded-full bg-[#6ECE9D]/10 px-3 py-1.5 text-xs sm:text-sm">
                      <Search size={14} className="sm:size-16" />
                      {feature.demo.filters.map((filter, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="text-gray-500">{filter.label}</span>
                          <span className="text-gray-400">{filter.type}</span>
                          <span className="font-medium text-gray-900">{filter.value}</span>
                          {i < feature.demo.filters.length - 1 && <span className="mx-1">•</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {feature.demo.stats.map((stat, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="font-mono text-xs sm:text-sm text-gray-600">{stat.path}</span>
                        <span className="font-medium text-gray-900">{stat.visits}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;