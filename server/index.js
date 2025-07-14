const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? (process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['https://evora-travel.netlify.app'])
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Trip Schema
const placeSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  name: {
    type: String,
    required: true
  }
});

const accommodationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  startDay: {
    type: Number,
    required: true
  },
  endDay: {
    type: Number,
    required: true
  },
  link: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }]
});

const activitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['activity', 'dining', 'transportation'],
    required: true
  },
  time: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    default: 0
  },
  link: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }]
});

const tipWarningSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['customs', 'scams', 'language', 'safety', 'money', 'general'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  }
});

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 30
  },
  coverImage: {
    type: String,
    default: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  places: [placeSchema],
  accommodations: [accommodationSchema],
  activities: [activitySchema],
  tips: [tipWarningSchema],
  createdBy: {
    type: String,
    default: 'anonymous'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Generate slug before saving
tripSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
  next();
});

const Trip = mongoose.model('Trip', tripSchema);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      heartbeatFrequencyMS: 10000,
    });
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Trip Routes
const router = express.Router();

// Create a new trip
router.post('/', async (req, res) => {
  try {
    const tripData = req.body;
    
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

// Use trip routes
app.use('/api/trips', router);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    mongodb: mongoStatus
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 API available at http://localhost:${PORT}/api`);
  });
};

startServer().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});