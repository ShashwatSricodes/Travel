const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { fileURLToPath } = require('url');

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

// MongoDB connection with better error handling and timeout configuration
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set');
  console.log('💡 Please create a .env file with your MongoDB connection string');
  console.log('💡 For MongoDB Atlas: MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/travel-itinerary');
  console.log('💡 For local MongoDB: MONGODB_URI=mongodb://localhost:27017/travel-itinerary');
  process.exit(1);
}

// Configure mongoose with better timeout settings
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Increased timeout for Atlas
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      heartbeatFrequencyMS: 10000, // Every 10 seconds
    });
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Make sure your MongoDB Atlas connection string is correct');
    console.log('💡 Check your network connection and Atlas cluster status');
    console.log('💡 Verify your database user credentials and IP whitelist');
    
    // Exit the process if MongoDB connection fails
    console.log('🛑 Server cannot start without database connection');
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
});

// Trip Schema
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
  places: [{
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
  }],
  accommodations: [{
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
  }],
  activities: [{
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
  }],
  tips: [{
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
  }],
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

// Routes
// Create a new trip
app.post('/api/trips', async (req, res) => {
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
app.get('/api/trips', async (req, res) => {
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
app.get('/api/trips/:identifier', async (req, res) => {
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
app.put('/api/trips/:id', async (req, res) => {
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
app.delete('/api/trips/:id', async (req, res) => {
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
  
  // Handle React Router - send all non-API requests to index.html
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

// Start server function
const startServer = async () => {
  // Wait for MongoDB connection before starting server
  await connectDB();
  
  // Start the Express server only after successful DB connection
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Frontend should be available at http://localhost:5173`);
    console.log(`🔗 API available at http://localhost:${PORT}/api`);
  });
};

// Start the server
startServer().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});