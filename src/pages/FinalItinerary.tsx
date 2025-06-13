import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import HeroSection from '../components/FinalItinerary/HeroSection';
import TripOverview from '../components/FinalItinerary/TripOverview';
import AccommodationsSection from '../components/FinalItinerary/AccommodationsSection';
import DailyItinerary from '../components/FinalItinerary/DailyItinerary';
import TipsSection from '../components/FinalItinerary/TipsSection';
import CostBreakdown from '../components/FinalItinerary/CostBreakdown';
import ActionButtons from '../components/FinalItinerary/ActionButtons';
import { Place, Accommodation, Activity, TipWarning } from '../components/CreateTrip/types';
import { apiService } from '../services/api';

// Sample data - fallback if no trip is found
const sampleTripData = {
  _id: 'sample-trip-id',
  slug: 'magical-bali-adventure',
  title: "7 Days in Magical Bali",
  duration: 7,
  coverImage: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1200",
  places: [
    { day: 1, location: { lat: -8.3405, lng: 115.0920 }, name: "Ngurah Rai International Airport, Denpasar, Bali, Indonesia" },
    { day: 2, location: { lat: -8.5069, lng: 115.2625 }, name: "Sacred Monkey Forest Sanctuary, Ubud, Bali, Indonesia" },
    { day: 3, location: { lat: -8.4095, lng: 115.1889 }, name: "Tegallalang Rice Terraces, Ubud, Bali, Indonesia" },
    { day: 4, location: { lat: -8.8303, lng: 115.0892 }, name: "Uluwatu Temple, Pecatu, Badung Regency, Bali, Indonesia" },
    { day: 5, location: { lat: -8.6500, lng: 115.1372 }, name: "Mount Batur, Kintamani, Bangli Regency, Bali, Indonesia" },
  ] as Place[],
  accommodations: [
    {
      id: "1",
      name: "Luxury Villa Ubud",
      startDay: 1,
      endDay: 4,
      link: "https://booking.com/villa-ubud",
      images: [
        "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: "2", 
      name: "Beachfront Resort Seminyak",
      startDay: 5,
      endDay: 7,
      link: "https://booking.com/seminyak-resort",
      images: [
        "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    }
  ] as Accommodation[],
  activities: [
    {
      id: "1",
      day: 1,
      type: "transportation" as const,
      time: "14:00",
      title: "Airport Transfer to Ubud",
      description: "Private car transfer from Ngurah Rai Airport to Ubud villa",
      cost: 35,
      link: "https://klook.com/airport-transfer",
      images: []
    },
    {
      id: "2",
      day: 2,
      type: "activity" as const,
      time: "09:00",
      title: "Ubud Monkey Forest Sanctuary",
      description: "Explore the sacred monkey forest sanctuary and ancient temples",
      cost: 5,
      link: "https://monkeyforestubud.com",
      images: [
        "https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: "3",
      day: 2,
      type: "dining" as const,
      time: "12:30",
      title: "Lunch at Locavore Restaurant",
      description: "Award-winning restaurant featuring modern Indonesian cuisine",
      cost: 85,
      link: "https://locavore.co.id",
      images: [
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: "4",
      day: 3,
      type: "activity" as const,
      time: "06:00",
      title: "Sunrise at Tegallalang Rice Terraces",
      description: "Watch the sunrise over the famous stepped rice terraces",
      cost: 10,
      images: [
        "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: "5",
      day: 4,
      type: "activity" as const,
      time: "16:00",
      title: "Uluwatu Temple Sunset",
      description: "Visit the clifftop temple and watch traditional Kecak dance performance",
      cost: 25,
      link: "https://uluwatu-temple.com",
      images: [
        "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    }
  ] as Activity[],
  tips: [
    {
      id: "1",
      category: "customs" as const,
      title: "Temple Etiquette",
      description: "Always wear a sarong when entering temples. Remove shoes and hats as a sign of respect.",
      priority: "high" as const
    },
    {
      id: "2",
      category: "scams" as const,
      title: "Taxi Scams at Airport",
      description: "Use official airport taxis or pre-booked transfers. Avoid unofficial drivers who approach you.",
      priority: "high" as const
    },
    {
      id: "3",
      category: "language" as const,
      title: "Basic Indonesian Phrases",
      description: "Learn 'Terima kasih' (thank you), 'Selamat pagi' (good morning), and 'Permisi' (excuse me).",
      priority: "medium" as const
    },
    {
      id: "4",
      category: "money" as const,
      title: "Currency and Payments",
      description: "Indonesian Rupiah (IDR) is the local currency. Many places accept cards, but carry cash for local markets.",
      priority: "medium" as const
    }
  ] as TipWarning[]
};

interface TripData {
  _id?: string;
  slug?: string;
  title: string;
  duration: number;
  coverImage: string;
  places: Place[];
  accommodations: Accommodation[];
  activities: Activity[];
  tips: TipWarning[];
}

const FinalItinerary: React.FC = () => {
  const { tripId } = useParams<{ tripId?: string }>();
  const [tripData, setTripData] = useState<TripData>(sampleTripData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTripData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (tripId) {
          // Fetch from database using trip ID or slug
          const response = await apiService.getTrip(tripId);
          if (response.success) {
            setTripData(response.data);
          } else {
            throw new Error(response.error || 'Failed to fetch trip');
          }
        } else {
          // Try to get data from localStorage (fallback for direct navigation)
          const savedTripData = localStorage.getItem('tripData');
          if (savedTripData) {
            try {
              const parsedData = JSON.parse(savedTripData);
              setTripData(parsedData);
            } catch (error) {
              console.error('Error parsing saved trip data:', error);
              // Fall back to sample data
            }
          }
          // If no tripId and no localStorage data, use sample data (already set)
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
        setError('Failed to load trip data. Showing sample itinerary.');
        // Keep sample data as fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripData();
  }, [tripId]);

  const calculateTotalCost = () => {
    return tripData.activities.reduce((total, activity) => total + activity.cost, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6ECE9D] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mx-4 mt-4">
          <p className="text-yellow-800">{error}</p>
        </div>
      )}
      
      <HeroSection
        title={tripData.title}
        coverImage={tripData.coverImage}
        totalDays={tripData.duration}
        totalPlaces={tripData.places.length}
        totalCost={calculateTotalCost()}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <TripOverview
          totalDays={tripData.duration}
          totalPlaces={tripData.places.length}
          totalAccommodations={tripData.accommodations.length}
          totalCost={calculateTotalCost()}
          places={tripData.places}
        />

        <AccommodationsSection accommodations={tripData.accommodations} />

        <DailyItinerary activities={tripData.activities} totalDays={tripData.duration} />

        <TipsSection tips={tripData.tips} />

        <CostBreakdown activities={tripData.activities} totalDays={tripData.duration} />

        <ActionButtons 
          tripId={tripData._id || tripData.slug} 
          tripTitle={tripData.title}
        />
      </div>
    </div>
  );
};

export default FinalItinerary;