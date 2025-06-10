import express from 'express';
import Trip from '../models/Trip.js';

const router = express.Router();

// Create a new trip
router.post('/', async (req, res) => {
  try {
    const tripData = req.body;
    
    // Validate required fields
    if (!tripData.title || !tripData.duration) {
      return res.status(400).json({
        error: 'Title and duration are required'
      });
    }

    const trip = new Trip(tripData);
    const savedTrip = await trip.save();
    
    res.status(201).json({
      success: true,
      data: savedTrip,
      message: 'Trip created successfully'
    });
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({
      error: 'Failed to create trip',
      details: error.message
    });
  }
});

// Get all trips
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = search 
      ? { 
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { 'places.name': { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const trips = await Trip.find(query)
      .select('title duration coverImage places createdAt slug')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Trip.countDocuments(query);

    res.json({
      success: true,
      data: trips,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({
      error: 'Failed to fetch trips',
      details: error.message
    });
  }
});

// Get a specific trip by ID or slug
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Try to find by slug first, then by ID
    let trip = await Trip.findOne({ slug: identifier });
    if (!trip) {
      trip = await Trip.findById(identifier);
    }

    if (!trip) {
      return res.status(404).json({
        error: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({
      error: 'Failed to fetch trip',
      details: error.message
    });
  }
});

// Update a trip
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const trip = await Trip.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({
        error: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: trip,
      message: 'Trip updated successfully'
    });
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({
      error: 'Failed to update trip',
      details: error.message
    });
  }
});

// Delete a trip
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const trip = await Trip.findByIdAndDelete(id);
    
    if (!trip) {
      return res.status(404).json({
        error: 'Trip not found'
      });
    }

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({
      error: 'Failed to delete trip',
      details: error.message
    });
  }
});

export default router;