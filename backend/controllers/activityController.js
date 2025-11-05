const Activity = require('../models/Activity');
const User = require('../models/User');
const {
  calculateTransportEmission,
  calculateEnergyEmission,
  calculateFoodEmission,
  calculateWasteEmission,
} = require('../utils/carbonCalculator');

// Add new activity
const addActivity = async (req, res) => {
  try {
    const { type, category, details, notes } = req.body;

    let carbonEmission = 0;

    // Calculate carbon emission based on activity type
    switch (type) {
      case 'transport':
        carbonEmission = calculateTransportEmission(details.mode, details.distance);
        break;
      case 'energy':
        carbonEmission = calculateEnergyEmission(category, details.energyUsage);
        break;
      case 'food':
        carbonEmission = calculateFoodEmission(details.mealType);
        break;
      case 'waste':
        carbonEmission = calculateWasteEmission(details.wasteType, details.wasteAmount);
        break;
      default:
        return res.status(400).json({ message: 'Invalid activity type' });
    }

    const activity = await Activity.create({
      user: req.user._id,
      type,
      category,
      details,
      carbonEmission,
      notes,
    });

    // Update user's total carbon footprint
    const user = await User.findById(req.user._id);
    user.totalCarbonFootprint += carbonEmission;
    user.points += 10; // Award points for logging activity
    await user.save();

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all activities for user
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(100);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get activities by date range
const getActivitiesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const activities = await Activity.find({
      user: req.user._id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).sort({ date: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get daily summary
const getDailySummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const activities = await Activity.find({
      user: req.user._id,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const totalEmission = activities.reduce((sum, act) => sum + act.carbonEmission, 0);

    const byType = activities.reduce((acc, act) => {
      if (!acc[act.type]) {
        acc[act.type] = 0;
      }
      acc[act.type] += act.carbonEmission;
      return acc;
    }, {});

    res.json({
      date: today,
      totalEmission,
      activityCount: activities.length,
      byType,
      activities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get weekly summary
const getWeeklySummary = async (req, res) => {
  try {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const activities = await Activity.find({
      user: req.user._id,
      date: {
        $gte: weekAgo,
        $lte: today,
      },
    });

    const totalEmission = activities.reduce((sum, act) => sum + act.carbonEmission, 0);
    const avgDailyEmission = totalEmission / 7;

    const byType = activities.reduce((acc, act) => {
      if (!acc[act.type]) {
        acc[act.type] = 0;
      }
      acc[act.type] += act.carbonEmission;
      return acc;
    }, {});

    res.json({
      startDate: weekAgo,
      endDate: today,
      totalEmission,
      avgDailyEmission,
      activityCount: activities.length,
      byType,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete activity
const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (activity.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update user's total carbon footprint
    const user = await User.findById(req.user._id);
    user.totalCarbonFootprint -= activity.carbonEmission;
    await user.save();

    await activity.deleteOne();

    res.json({ message: 'Activity removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addActivity,
  getActivities,
  getActivitiesByDateRange,
  getDailySummary,
  getWeeklySummary,
  deleteActivity,
};