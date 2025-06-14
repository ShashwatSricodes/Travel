import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import tripRoutes from './routes/trips.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB connection with better error handling and timeout configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-itinerary';

// Configure mongoose with better timeout settings
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      bufferCommands: false, // Disable mongoose buffering
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Make sure MongoDB is running on your system');
    console.log('💡 You can start MongoDB with: mongod --dbpath /path/to/your/db');
    
    // Don't exit the process, just log the error
    // This allows the server to start even if MongoDB is not available
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

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/trips', tripRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    mongodb: mongoStatus
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});