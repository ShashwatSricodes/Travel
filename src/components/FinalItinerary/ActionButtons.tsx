import React from 'react';

const ActionButtons: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="px-8 py-3 bg-[#6ECE9D] text-black font-medium rounded-lg hover:bg-[#6ECE9D]/90 transition-colors">
        Share Itinerary
      </button>
      <button className="px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
        Download PDF
      </button>
      <button className="px-8 py-3 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors">
        Edit Trip
      </button>
    </div>
  );
};

export default ActionButtons;