const express = require('express');
const router = express.Router();
const {
  addActivity,
  getActivities,
  getActivitiesByDateRange,
  getDailySummary,
  getWeeklySummary,
  deleteActivity,
} = require('../controllers/activityController');
const { protect } = require('../middleware/auth');

router.post('/', protect, addActivity);
router.get('/', protect, getActivities);
router.get('/range', protect, getActivitiesByDateRange);
router.get('/daily', protect, getDailySummary);
router.get('/weekly', protect, getWeeklySummary);
router.delete('/:id', protect, deleteActivity);

module.exports = router;