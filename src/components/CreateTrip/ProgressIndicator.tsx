import React from 'react';

interface ProgressIndicatorProps {
  currentPhase: number;
  totalPhases: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentPhase, totalPhases }) => {
  const getPhaseStatus = (phaseNumber: number) => {
    if (phaseNumber === currentPhase) return 'current';
    if (phaseNumber < currentPhase) return 'completed';
    return 'upcoming';
  };

  const getProgressWidth = (segmentIndex: number) => {
    if (segmentIndex < currentPhase - 1) return 'w-full';
    if (segmentIndex === currentPhase - 1) {
      const progress = Math.min(100, ((currentPhase - 1) / (totalPhases - 1)) * 100);
      return progress === 100 ? 'w-full' : `w-${Math.round(progress / 25) * 25}/4`;
    }
    return 'w-0';
  };

  const getPhaseLabel = (phaseNumber: number) => {
    switch (phaseNumber) {
      case 1: return 'Basic Info';
      case 2: return 'Places';
      case 3: return 'Stay';
      case 4: return 'Itinerary';
      case 5: return 'Tips';
      default: return `Phase ${phaseNumber}`;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPhases }, (_, index) => {
          const phaseNumber = index + 1;
          const status = getPhaseStatus(phaseNumber);
          
          return (
            <React.Fragment key={phaseNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors ${
                    status === 'current'
                      ? 'bg-[#6ECE9D] text-white'
                      : status === 'completed'
                      ? 'bg-[#6ECE9D]/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {phaseNumber}
                </div>
                <span className={`text-xs mt-1 ${
                  status === 'current' ? 'text-[#6ECE9D] font-medium' : 'text-gray-500'
                }`}>
                  {getPhaseLabel(phaseNumber)}
                </span>
              </div>
              {phaseNumber < totalPhases && (
                <div className="h-1 flex-1 bg-gray-200 mx-2">
                  <div
                    className={`h-full bg-[#6ECE9D] transition-all duration-300 ${getProgressWidth(index)}`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;