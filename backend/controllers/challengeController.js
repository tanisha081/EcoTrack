const { Challenge, UserChallenge } = require('../models/Challenge');
const User = require('../models/User');

// Get all active challenges
const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({ isActive: true });
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Start a challenge
const startChallenge = async (req, res) => {
  try {
    const { challengeId } = req.body;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user already has this challenge active
    const existingChallenge = await UserChallenge.findOne({
      user: req.user._id,
      challenge: challengeId,
      status: 'active',
    });

    if (existingChallenge) {
      return res.status(400).json({ message: 'Challenge already active' });
    }

    const userChallenge = await UserChallenge.create({
      user: req.user._id,
      challenge: challengeId,
    });

    res.status(201).json(userChallenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's active challenges
const getUserChallenges = async (req, res) => {
  try {
    const userChallenges = await UserChallenge.find({
      user: req.user._id,
      status: 'active',
    }).populate('challenge');

    res.json(userChallenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update challenge progress
const updateChallengeProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const userChallenge = await UserChallenge.findById(req.params.id).populate('challenge');

    if (!userChallenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (userChallenge.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    userChallenge.progress = progress;

    // Check if challenge is completed
    if (progress >= 100) {
      userChallenge.status = 'completed';
      userChallenge.completedAt = Date.now();

      // Award points and badge to user
      const user = await User.findById(req.user._id);
      user.points += userChallenge.challenge.points;
      
      // Add badge if earned
      user.badges.push({
        name: userChallenge.challenge.title,
        icon: '🏆',
      });

      // Level up if points threshold reached
      const pointsForNextLevel = user.level * 1000;
      if (user.points >= pointsForNextLevel) {
        user.level += 1;
      }

      await user.save();
    }

    await userChallenge.save();
    res.json(userChallenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete a challenge
const completeChallenge = async (req, res) => {
  try {
    const userChallenge = await UserChallenge.findById(req.params.id).populate('challenge');

    if (!userChallenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (userChallenge.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    userChallenge.status = 'completed';
    userChallenge.progress = 100;
    userChallenge.completedAt = Date.now();

    // Award points to user
    const user = await User.findById(req.user._id);
    user.points += userChallenge.challenge.points;
    
    user.badges.push({
      name: userChallenge.challenge.title,
      icon: '🏆',
    });

    await user.save();
    await userChallenge.save();

    res.json({ message: 'Challenge completed!', userChallenge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get completed challenges
const getCompletedChallenges = async (req, res) => {
  try {
    const completedChallenges = await UserChallenge.find({
      user: req.user._id,
      status: 'completed',
    }).populate('challenge');

    res.json(completedChallenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChallenges,
  startChallenge,
  getUserChallenges,
  updateChallengeProgress,
  completeChallenge,
  getCompletedChallenges,
};