import React from 'react';
import { Plus, X, AlertTriangle, Info, Shield, DollarSign, MessageCircle, Globe } from 'lucide-react';
import { TipWarning } from './types';

interface TipsWarningsPhaseProps {
  tips: TipWarning[];
  setTips: React.Dispatch<React.SetStateAction<TipWarning[]>>;
  newTip: Partial<TipWarning>;
  setNewTip: React.Dispatch<React.SetStateAction<Partial<TipWarning>>>;
  onBack: () => void;
  onFinish: () => void;
}

const TipsWarningsPhase: React.FC<TipsWarningsPhaseProps> = ({
  tips,
  setTips,
  newTip,
  setNewTip,
  onBack,
  onFinish,
}) => {
  const addTip = () => {
    if (newTip.title && newTip.description && newTip.category) {
      const tip: TipWarning = {
        id: Date.now().toString(),
        category: newTip.category,
        title: newTip.title,
        description: newTip.description,
        priority: newTip.priority || 'medium',
      };
      setTips((prev) => [...prev, tip]);
      setNewTip({
        category: 'general',
        priority: 'medium',
      });
    }
  };

  const removeTip = (id: string) => {
    setTips((prev) => prev.filter((tip) => tip.id !== id));
  };

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'customs':
        return 'text-purple-600';
      case 'scams':
        return 'text-red-600';
      case 'language':
        return 'text-blue-600';
      case 'safety':
        return 'text-orange-600';
      case 'money':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const groupedTips = tips.reduce((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = [];
    }
    acc[tip.category].push(tip);
    return acc;
  }, {} as Record<string, TipWarning[]>);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="font-medium text-gray-900 text-xl">Tips & Warnings</h3>
          <p className="text-sm text-gray-600 mt-1">
            Add helpful tips about local customs, safety warnings, and travel advice (Optional)
          </p>
        </div>
        
        {/* Add New Tip Form */}
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900">Add New Tip or Warning</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newTip.category || 'general'}
                onChange={(e) => setNewTip(prev => ({ ...prev, category: e.target.value as TipWarning['category'] }))}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              >
                <option value="general">General</option>
                <option value="customs">Local Customs</option>
                <option value="scams">Scams & Safety</option>
                <option value="language">Language Tips</option>
                <option value="safety">Safety</option>
                <option value="money">Money & Payments</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={newTip.priority || 'medium'}
                onChange={(e) => setNewTip(prev => ({ ...prev, priority: e.target.value as TipWarning['priority'] }))}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newTip.title || ''}
              onChange={(e) => setNewTip(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              placeholder="e.g., Always remove shoes when entering temples"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newTip.description || ''}
              onChange={(e) => setNewTip(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              placeholder="Provide detailed information about this tip or warning..."
              rows={3}
            />
          </div>

          <button
            onClick={addTip}
            className="w-full px-4 py-2 bg-[#6ECE9D] text-black rounded-lg hover:bg-[#6ECE9D]/90 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Tip
          </button>
        </div>

        {/* Tips List by Category */}
        {Object.keys(groupedTips).length > 0 && (
          <div className="space-y-6">
            <h4 className="font-medium text-gray-900">Added Tips & Warnings</h4>
            
            {Object.entries(groupedTips).map(([category, categoryTips]) => (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={getCategoryColor(category)}>
                    {getCategoryIcon(category)}
                  </div>
                  <h5 className="font-medium text-gray-900 capitalize">
                    {category === 'customs' ? 'Local Customs' : 
                     category === 'scams' ? 'Scams & Safety' :
                     category === 'language' ? 'Language Tips' :
                     category}
                  </h5>
                  <span className="text-sm text-gray-500">({categoryTips.length})</span>
                </div>
                
                <div className="space-y-2 ml-7">
                  {categoryTips.map((tip) => (
                    <div key={tip.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h6 className="font-medium text-gray-900">{tip.title}</h6>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(tip.priority)}`}>
                              {tip.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{tip.description}</p>
                        </div>
                        <button
                          onClick={() => removeTip(tip.id)}
                          className="text-red-500 hover:text-red-600 ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sample Tips */}
        {tips.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-900 mb-2">💡 Tip Examples:</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Customs:</strong> Remove shoes when entering temples or homes</li>
              <li>• <strong>Scams:</strong> Avoid unofficial taxi drivers at the airport</li>
              <li>• <strong>Language:</strong> "Thank you" is "Terima kasih" in Indonesian</li>
              <li>• <strong>Money:</strong> Always carry small bills for local markets</li>
              <li>• <strong>Safety:</strong> Don't drink tap water, stick to bottled water</li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={onFinish}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Skip Tips
          </button>
          <button
            onClick={onFinish}
            className="px-6 py-2 bg-[#6ECE9D] text-black rounded-lg hover:bg-[#6ECE9D]/90 transition-colors"
          >
            Create Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipsWarningsPhase;