const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  avatar: {
    type: String,
    default: 'default-avatar.png',
  },
  lifestyle: {
    transportMode: {
      type: String,
      enum: ['car', 'bus', 'train', 'bike', 'walk', 'mixed'],
      default: 'mixed',
    },
    diet: {
      type: String,
      enum: ['vegan', 'vegetarian', 'pescatarian', 'omnivore'],
      default: 'omnivore',
    },
    householdSize: {
      type: Number,
      default: 1,
    },
    energySource: {
      type: String,
      enum: ['renewable', 'mixed', 'fossil'],
      default: 'mixed',
    },
  },
  totalCarbonFootprint: {
    type: Number,
    default: 0,
  },
  badges: [{
    name: String,
    icon: String,
    earnedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  level: {
    type: Number,
    default: 1,
  },
  points: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);