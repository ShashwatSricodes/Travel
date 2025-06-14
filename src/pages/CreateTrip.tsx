import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { Place, Accommodation, Activity, TipWarning } from '../components/CreateTrip/types';
import ProgressIndicator from '../components/CreateTrip/ProgressIndicator';
import BasicInfoPhase from '../components/CreateTrip/BasicInfoPhase';
import MapPhase from '../components/CreateTrip/MapPhase';
import AccommodationPhase from '../components/CreateTrip/AccommodationPhase';
import ItineraryPhase from '../components/CreateTrip/ItineraryPhase';
import TipsWarningsPhase from '../components/CreateTrip/TipsWarningsPhase';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import { useAuth } from '../components/Auth/useAuth';
import { apiService } from '../services/api';

const CreateTripContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [phase, setPhase] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(7);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tips, setTips] = useState<TipWarning[]>([]);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    day: 1,
    type: 'activity',
    time: '09:00',
    cost: 0,
    images: [],
  });
  const [newAccommodation, setNewAccommodation] = useState<Partial<Accommodation>>({
    startDay: 1,
    endDay: 1,
    images: [],
  });
  const [newTip, setNewTip] = useState<Partial<TipWarning>>({
    category: 'general',
    priority: 'medium',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAccommodationImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setNewAccommodation((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
    }
  };

  const handleActivityImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setNewActivity((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
    }
  };

  const handleNextPhase = () => {
    if (phase < 5) {
      setPhase(phase + 1);
    }
  };

  const handlePreviousPhase = () => {
    if (phase > 1) {
      setPhase(phase - 1);
    }
  };

  const handleFinishTrip = async () => {
    // Validate required fields before proceeding
    if (!title.trim()) {
      alert('Please enter a trip title before creating the trip.');
      setPhase(1); // Go back to the first phase to enter title
      return;
    }

    if (!duration || duration < 1) {
      alert('Please select a valid trip duration.');
      setPhase(1); // Go back to the first phase to select duration
      return;
    }

    setIsLoading(true);
    
    try {
      // Filter out places that are just coordinates (no proper name)
      const namedPlaces = places.filter(place => 
        place.name && 
        !place.name.startsWith('Location ') && 
        place.name.length > 10 // Ensure it's a proper place name, not just coordinates
      );

      // Prepare trip data for API
      const tripData = {
        title: title.trim(),
        duration,
        coverImage: imagePreview || 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1200',
        places: namedPlaces,
        accommodations,
        activities,
        tips,
        createdBy: user?.name || 'Anonymous User',
        isPublic: true
      };

      // Save to database
      const response = await apiService.createTrip(tripData);
      
      if (response.success) {
        // Navigate to final itinerary with the trip ID/slug
        navigate(`/final-itinerary/${response.data.slug || response.data._id}`);
      } else {
        throw new Error(response.error || 'Failed to create trip');
      }
    } catch (error) {
      console.error('Error creating trip:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Title and duration are required')) {
          alert('Please make sure you have entered a trip title and selected a duration.');
          setPhase(1); // Go back to basic info phase
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          alert('Network error. Please check your internet connection and try again.');
        } else {
          alert(`Failed to create trip: ${error.message}`);
        }
      } else {
        alert('Failed to create trip. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Trip</h1>
            <p className="text-gray-600">
              Welcome back, {user?.name}! Let's create your next amazing itinerary.
            </p>
          </div>

          <ProgressIndicator currentPhase={phase} totalPhases={5} />

          {phase === 1 && (
            <BasicInfoPhase
              title={title}
              setTitle={setTitle}
              duration={duration}
              setDuration={setDuration}
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              onNext={handleNextPhase}
            />
          )}

          {phase === 2 && (
            <MapPhase
              places={places}
              setPlaces={setPlaces}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              duration={duration}
              onNext={handleNextPhase}
              onBack={handlePreviousPhase}
            />
          )}

          {phase === 3 && (
            <AccommodationPhase
              accommodations={accommodations}
              setAccommodations={setAccommodations}
              newAccommodation={newAccommodation}
              setNewAccommodation={setNewAccommodation}
              onImageChange={handleAccommodationImageChange}
              duration={duration}
              onNext={handleNextPhase}
              onBack={handlePreviousPhase}
            />
          )}

          {phase === 4 && (
            <ItineraryPhase
              activities={activities}
              setActivities={setActivities}
              newActivity={newActivity}
              setNewActivity={setNewActivity}
              onActivityImageChange={handleActivityImageChange}
              duration={duration}
              onNext={handleNextPhase}
              onBack={handlePreviousPhase}
            />
          )}

          {phase === 5 && (
            <TipsWarningsPhase
              tips={tips}
              setTips={setTips}
              newTip={newTip}
              setNewTip={setNewTip}
              onBack={handlePreviousPhase}
              onFinish={handleFinishTrip}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const CreateTrip = () => {
  return (
    <ProtectedRoute>
      <CreateTripContent />
    </ProtectedRoute>
  );
};

export default CreateTrip;