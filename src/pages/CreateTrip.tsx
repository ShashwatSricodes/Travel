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

const CreateTrip = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(1);
  const [title, setTitle] = useState('');
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

  const handleFinishTrip = () => {
    // Save trip data to localStorage for the final itinerary page
    const tripData = {
      title,
      coverImage: imagePreview || 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1200',
      places,
      accommodations,
      activities,
      tips,
    };
    
    localStorage.setItem('tripData', JSON.stringify(tripData));
    
    // Navigate to final itinerary
    navigate('/final-itinerary');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Trip</h1>

          <ProgressIndicator currentPhase={phase} totalPhases={5} />

          {phase === 1 && (
            <BasicInfoPhase
              title={title}
              setTitle={setTitle}
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;