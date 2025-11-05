const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['transport', 'energy', 'food', 'waste'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  details: {
    distance: Number,
    mode: String,
    energyUsage: Number,
    mealType: String,
    wasteAmount: Number,
    wasteType: String,
  },
  carbonEmission: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: String,
});

// Index for faster queries
activitySchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Activity', activitySchema);