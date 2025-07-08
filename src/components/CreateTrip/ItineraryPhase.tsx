import React from 'react';
import { X, MapPin, Utensils, Bus, DollarSign, Plus, ExternalLink, Upload } from 'lucide-react';
import { Activity } from './types';
import { convertFilesToBase64, compressImage } from '../../utils/imageUtils';

interface ItineraryPhaseProps {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  newActivity: Partial<Activity>;
  setNewActivity: React.Dispatch<React.SetStateAction<Partial<Activity>>>;
  onActivityImageChange: (images: string[]) => void;
  duration: number;
  onNext: () => void;
  onBack: () => void;
}

const ItineraryPhase: React.FC<ItineraryPhaseProps> = ({
  activities,
  setActivities,
  newActivity,
  setNewActivity,
  onActivityImageChange,
  duration,
  onNext,
  onBack,
}) => {
  const handleActivityImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        const base64Images: string[] = [];
        
        for (const file of Array.from(files)) {
          try {
            const compressedBase64 = await compressImage(file, 800, 0.8);
            base64Images.push(compressedBase64);
          } catch (error) {
            console.error('Error compressing image:', error);
            // Fallback to regular base64 conversion
            const base64 = await convertFilesToBase64(files);
            base64Images.push(...base64);
            break;
          }
        }
        
        onActivityImageChange(base64Images);
      } catch (error) {
        console.error('Error processing images:', error);
        alert('Failed to process some images. Please try again.');
      }
    }
  };

  const addActivity = () => {
    if (newActivity.title && newActivity.description) {
      const activity: Activity = {
        id: Date.now().toString(),
        day: newActivity.day || 1,
        type: newActivity.type || 'activity',
        time: newActivity.time || '09:00',
        title: newActivity.title,
        description: newActivity.description,
        cost: newActivity.cost || 0,
        link: newActivity.link || '',
        images: newActivity.images || [],
      };
      setActivities((prev) => [...prev, activity]);
      setNewActivity({
        day: newActivity.day,
        type: 'activity',
        time: '09:00',
        cost: 0,
        images: [],
      });
    }
  };

  const removeActivity = (id: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  const removeActivityImage = (index: number) => {
    setNewActivity((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const removeExistingActivityImage = (activityId: string, imageIndex: number) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              images: activity.images.filter((_, i) => i !== imageIndex),
            }
          : activity
      )
    );
  };

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

  const calculateTripTotal = () => {
    return activities.reduce((total, activity) => total + activity.cost, 0);
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
    <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="font-medium text-gray-900 text-xl">Daily Itinerary</h3>
          <p className="text-sm text-gray-600 mt-1">
            Plan your activities, dining, and transportation for each day
          </p>
        </div>

        {/* Add New Activity Form */}
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900">Add New Activity</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <select
                value={newActivity.day}
                onChange={(e) =>
                  setNewActivity((prev) => ({ ...prev, day: Number(e.target.value) }))
                }
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              >
                {[...Array(duration)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Day {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={formatTime(newActivity.time || '09:00')}
                onChange={(e) =>
                  setNewActivity((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newActivity.type}
                onChange={(e) =>
                  setNewActivity((prev) => ({ ...prev, type: e.target.value as Activity['type'] }))
                }
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              >
                <option value="activity">Activity/Sightseeing</option>
                <option value="dining">Restaurant/Café</option>
                <option value="transportation">Transportation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={newActivity.title || ''}
              onChange={(e) =>
                setNewActivity((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              placeholder="e.g., Visit Eiffel Tower, Lunch at Café de Flore"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newActivity.description || ''}
              onChange={(e) =>
                setNewActivity((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              placeholder="Add details, tips, or notes about this activity..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website/Booking Link (Optional)
              </label>
              <input
                type="url"
                value={newActivity.link || ''}
                onChange={(e) =>
                  setNewActivity((prev) => ({ ...prev, link: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="number"
                  value={newActivity.cost || ''}
                  onChange={(e) =>
                    setNewActivity((prev) => ({ ...prev, cost: Number(e.target.value) }))
                  }
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Images (Optional)</label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleActivityImageChange}
                className="hidden"
                id="activity-images"
              />
              <label
                htmlFor="activity-images"
                className="cursor-pointer flex items-center justify-center w-full px-4 py-3 text-sm border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Upload className="w-5 h-5 mr-2 text-gray-400" />
                <span className="text-gray-600">Add Photos</span>
              </label>
              
              {newActivity.images && newActivity.images.length > 0 && (
                <div className={`
                  gap-2 
                  ${newActivity.images.length === 1 
                    ? 'grid grid-cols-1 max-w-xs' 
                    : newActivity.images.length === 2 
                      ? 'grid grid-cols-2 max-w-sm' 
                      : 'grid grid-cols-3 md:grid-cols-4'
                  }
                `}>
                  {newActivity.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Activity ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                      />
                      <button
                        onClick={() => removeActivityImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={addActivity}
            className="w-full px-4 py-2 bg-[#6ECE9D] text-black rounded-lg hover:bg-[#6ECE9D]/90 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Activity
          </button>
        </div>

        {/* Daily Activities List */}
        {[...Array(duration)].map((_, dayIndex) => {
          const dayNumber = dayIndex + 1;
          const dayActivities = activities.filter((activity) => activity.day === dayNumber);
          const dailyTotal = calculateDailyTotal(dayNumber);

          return (
            <div key={dayNumber} className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-900">Day {dayNumber}</h4>
                <span className="text-sm text-gray-600">
                  Daily Total: ${dailyTotal.toFixed(2)}
                </span>
              </div>
              {dayActivities.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No activities planned for this day</p>
              ) : (
                <div className="space-y-3">
                  {dayActivities
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((activity) => (
                      <div
                        key={activity.id}
                        className="p-4 bg-white border border-gray-200 rounded-lg space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="mt-1 text-gray-600">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {formatTime(activity.time)}
                                </span>
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                  {getActivityTypeLabel(activity.type)}
                                </span>
                              </div>
                              <h5 className="font-medium text-gray-900 mb-1">{activity.title}</h5>
                              <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                              
                              <div className="flex items-center gap-4 text-sm">
                                <span className="font-medium text-gray-900">
                                  ${activity.cost.toFixed(2)}
                                </span>
                                {activity.link && (
                                  <a
                                    href={activity.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-[#6ECE9D] hover:underline"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Visit Website
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeActivity(activity.id)}
                            className="text-red-500 hover:text-red-600 ml-2"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {activity.images.length > 0 && (
                          <div className={`
                            gap-2 
                            ${activity.images.length === 1 
                              ? 'grid grid-cols-1 max-w-xs' 
                              : activity.images.length === 2 
                                ? 'grid grid-cols-2 max-w-sm' 
                                : 'grid grid-cols-3 md:grid-cols-4'
                            }
                          `}>
                            {activity.images.map((image, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={image}
                                  alt={`${activity.title} ${index + 1}`}
                                  className="w-full aspect-square object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                                />
                                <button
                                  onClick={() => removeExistingActivityImage(activity.id, index)}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Total Trip Cost */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-medium">
            <span>Total Trip Cost</span>
            <span>${calculateTripTotal().toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-6 py-2 bg-[#6ECE9D] text-black rounded-lg hover:bg-[#6ECE9D]/90 transition-colors"
          >
            Continue to Tips
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPhase;