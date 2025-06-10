import mongoose from 'mongoose';

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

export default mongoose.model('Trip', tripSchema);