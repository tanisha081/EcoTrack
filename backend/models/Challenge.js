const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['transport', 'energy', 'food', 'waste', 'general'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy',
  },
  points: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, // days
    default: 1,
  },
  targetValue: Number,
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userChallengeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'failed'],
    default: 'active',
  },
  progress: {
    type: Number,
    default: 0,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: Date,
});

const Challenge = mongoose.model('Challenge', challengeSchema);
const UserChallenge = mongoose.model('UserChallenge', userChallengeSchema);

module.exports = { Challenge, UserChallenge };