import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, DollarSign, Filter, Heart, Eye } from 'lucide-react';
import { apiService } from '../services/api';
import { getImageSrc } from '../utils/imageUtils';

interface TripCard {
  _id: string;
  slug: string;
  title: string;
  duration: number;
  coverImage: string;
  places: Array<{ name: string; day: number }>;
  createdAt: string;
  totalCost?: number;
  createdBy: string;
}

const BrowseTrips: React.FC = () => {
  const [trips, setTrips] = useState<TripCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTrips();
  }, [currentPage, searchTerm, filterDuration]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const response = await apiService.getTrips({
        page: currentPage,
        limit: 12,
        search: searchTerm || undefined,
      });

      if (response.success) {
        setTrips(response.data);
        setTotalPages(response.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      // Show sample data on error
      setTrips([
        {
          _id: '1',
          slug: 'magical-bali-adventure',
          title: '7 Days in Magical Bali',
          duration: 7,
          coverImage: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
          places: [
            { name: 'Ubud', day: 1 },
            { name: 'Seminyak', day: 4 },
            { name: 'Uluwatu', day: 6 }
          ],
          createdAt: '2024-01-15',
          totalCost: 1200,
          createdBy: 'Sarah Chen'
        },
        {
          _id: '2',
          slug: 'tokyo-foodie-guide',
          title: 'Tokyo Foodie Adventure',
          duration: 5,
          coverImage: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
          places: [
            { name: 'Shibuya', day: 1 },
            { name: 'Harajuku', day: 2 },
            { name: 'Tsukiji', day: 3 }
          ],
          createdAt: '2024-01-10',
          totalCost: 800,
          createdBy: 'Marcus Johnson'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchTrips();
  };

  const filteredTrips = trips.filter(trip => {
    if (filterDuration) {
      const duration = parseInt(filterDuration);
      if (duration === 3 && trip.duration > 3) return false;
      if (duration === 7 && (trip.duration < 4 || trip.duration > 7)) return false;
      if (duration === 14 && trip.duration < 8) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Itineraries
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse curated travel itineraries from creators around the world. Find your next adventure or get inspired for future trips.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search destinations, cities, or trip titles..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
              />
            </div>
            
            <select
              value={filterDuration}
              onChange={(e) => setFilterDuration(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6ECE9D]/50 focus:border-[#6ECE9D]"
            >
              <option value="">All Durations</option>
              <option value="3">1-3 Days</option>
              <option value="7">4-7 Days</option>
              <option value="14">8+ Days</option>
            </select>
            
            <button
              type="submit"
              className="px-6 py-3 bg-[#6ECE9D] text-black font-medium rounded-lg hover:bg-[#6ECE9D]/90 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6ECE9D] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading amazing trips...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Found {filteredTrips.length} amazing itineraries
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Filter className="w-4 h-4" />
                <span>Sort by: Most Recent</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredTrips.map((trip) => (
                <div key={trip._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={getImageSrc(trip.coverImage)}
                      alt={trip.title}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{trip.title}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{trip.duration} days</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{trip.places.length} places</span>
                      </div>
                      {trip.totalCost && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>${trip.totalCost}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {trip.places.slice(0, 3).map((place, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {place.name}
                        </span>
                      ))}
                      {trip.places.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{trip.places.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">by {trip.createdBy}</span>
                      <a
                        href={`/final-itinerary/${trip.slug || trip._id}`}
                        className="flex items-center gap-1 px-4 py-2 bg-[#6ECE9D] text-black text-sm font-medium rounded-lg hover:bg-[#6ECE9D]/90 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Trip
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === index + 1
                        ? 'bg-[#6ECE9D] text-black'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseTrips;