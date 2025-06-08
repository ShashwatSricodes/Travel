import React from 'react';
import { Activity } from '../CreateTrip/types';

interface CostBreakdownProps {
  activities: Activity[];
  totalDays: number;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ activities, totalDays }) => {
  const calculateDailyTotal = (day: number) => {
    return activities
      .filter((activity) => activity.day === day)
      .reduce((total, activity) => total + activity.cost, 0);
  };

  const calculateTotalCost = () => {
    return activities.reduce((total, activity) => total + activity.cost, 0);
  };

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'dining':
        return 'Restaurant/Café';
      case 'transportation':
        return 'Transportation';
      default:
        return 'Activities';
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Breakdown</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Expenses</h3>
            <div className="space-y-3">
              {[...Array(totalDays)].map((_, dayIndex) => {
                const dayNumber = dayIndex + 1;
                const dailyTotal = calculateDailyTotal(dayNumber);
                return (
                  <div key={dayNumber} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Day {dayNumber}</span>
                    <span className="font-medium text-gray-900">${dailyTotal.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              {['activity', 'dining', 'transportation'].map((type) => {
                const typeTotal = activities
                  .filter((activity) => activity.type === type)
                  .reduce((total, activity) => total + activity.cost, 0);
                return (
                  <div key={type} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">{getActivityTypeLabel(type)}</span>
                    <span className="font-medium text-gray-900">${typeTotal.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total Trip Cost</span>
            <span className="text-[#6ECE9D]">${calculateTotalCost().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostBreakdown;