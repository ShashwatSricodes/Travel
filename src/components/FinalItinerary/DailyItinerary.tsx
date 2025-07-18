import React from 'react';
import { Clock, ExternalLink, MapPin, Utensils, Bus } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import { Activity } from '../CreateTrip/types';

interface DailyItineraryProps {
  activities: Activity[];
  totalDays: number;
}

const DailyItinerary: React.FC<DailyItineraryProps> = ({ activities, totalDays }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'dining':
        return <Utensils className="w-5 h-5" />;
      case 'transportation':
        return <Bus className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'dining':
        return 'Restaurant/Café';
      case 'transportation':
        return 'Transportation';
      default:
        return 'Activity';
    }
  };

  const calculateDailyTotal = (day: number) => {
    return activities
      .filter((activity) => activity.day === day)
      .reduce((total, activity) => total + activity.cost, 0);
  };

  const formatTime = (time: string) => {
    if (!time) return '09:00';
    // Ensure time is in HH:MM format
    const [hours, minutes] = time.split(':');
    const formattedHours = hours.padStart(2, '0');
    const formattedMinutes = (minutes || '00').padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Itinerary</h2>
      <div className="space-y-8">
        {[...Array(totalDays)].map((_, dayIndex) => {
          const dayNumber = dayIndex + 1;
          const dayActivities = activities.filter((activity) => activity.day === dayNumber);
          const dailyTotal = calculateDailyTotal(dayNumber);

          return (
            <div key={dayNumber} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Day {dayNumber}</h3>
                <span className="text-lg font-medium text-gray-600">
                  ${dailyTotal.toFixed(2)}
                </span>
              </div>
              
              {dayActivities.length === 0 ? (
                <p className="text-gray-500 italic">Free day - no activities planned</p>
              ) : (
                <div className="space-y-6">
                  {dayActivities
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((activity) => (
                      <div key={activity.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="space-y-4">
                          {/* Activity Details */}
                          <div>
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-10 h-10 bg-[#6ECE9D]/10 rounded-lg flex items-center justify-center text-[#6ECE9D]">
                                  {getActivityIcon(activity.type)}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm font-medium text-gray-900">{formatTime(activity.time)}</span>
                                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                    {getActivityTypeLabel(activity.type)}
                                  </span>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{activity.title}</h4>
                                <p className="text-gray-600 mb-3">{activity.description}</p>
                                
                                <div className="flex items-center gap-4">
                                  <span className="text-lg font-semibold text-gray-900">
                                    ${activity.cost.toFixed(2)}
                                  </span>
                                  {activity.link && (
                                    <a
                                      href={activity.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-[#6ECE9D] hover:underline text-sm"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      Visit Website
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Activity Images */}
                          <div>
                            {activity.images.length > 0 && (
                              <div className={`
                                ${activity.images.length === 1 
                                  ? 'max-w-md mx-auto' 
                                  : activity.images.length === 2 
                                    ? 'grid grid-cols-2 gap-2' 
                                    : activity.images.length === 3
                                      ? 'grid grid-cols-2 gap-2'
                                      : 'grid grid-cols-2 gap-2'
                                }
                              `}>
                                {activity.images.slice(0, 4).map((image, index) => (
                                  <div 
                                    key={index} 
                                    className={`
                                      relative overflow-hidden rounded-lg cursor-pointer group
                                      ${activity.images.length === 1 
                                        ? 'aspect-[4/3]' 
                                        : activity.images.length === 3 && index === 0
                                          ? 'row-span-2 aspect-square'
                                          : 'aspect-square'
                                      }
                                      ${activity.images.length > 4 && index === 3 ? 'relative' : ''}
                                    `}
                                  >
                                    <img
                                      src={image}
                                      alt={`${activity.title} ${index + 1}`}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {activity.images.length > 4 && index === 3 && (
                                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <span className="text-white font-semibold text-lg">
                                          +{activity.images.length - 4}
                                        </span>
                                      </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DailyItinerary;