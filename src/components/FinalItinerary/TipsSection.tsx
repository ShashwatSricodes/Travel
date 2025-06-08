import React from 'react';
import { AlertTriangle, Info, Shield, DollarSign, MessageCircle, Globe } from 'lucide-react';
import { TipWarning } from '../CreateTrip/types';

interface TipsSectionProps {
  tips: TipWarning[];
}

const TipsSection: React.FC<TipsSectionProps> = ({ tips }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'customs':
        return <Globe className="w-5 h-5" />;
      case 'scams':
        return <Shield className="w-5 h-5" />;
      case 'language':
        return <MessageCircle className="w-5 h-5" />;
      case 'safety':
        return <AlertTriangle className="w-5 h-5" />;
      case 'money':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const groupedTips = tips.reduce((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = [];
    }
    acc[tip.category].push(tip);
    return acc;
  }, {} as Record<string, TipWarning[]>);

  if (Object.keys(groupedTips).length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips & Warnings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(groupedTips).map(([category, categoryTips]) => (
          <div key={category} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#6ECE9D]/10 rounded-lg flex items-center justify-center text-[#6ECE9D]">
                {getCategoryIcon(category)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {category === 'customs' ? 'Local Customs' : 
                 category === 'scams' ? 'Scams & Safety' :
                 category === 'language' ? 'Language Tips' :
                 category}
              </h3>
            </div>
            <div className="space-y-3">
              {categoryTips.map((tip) => (
                <div key={tip.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{tip.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(tip.priority)}`}>
                      {tip.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TipsSection;