const express = require('express');
const router = express.Router();
const {
  getChallenges,
  startChallenge,
  getUserChallenges,
  updateChallengeProgress,
  completeChallenge,
  getCompletedChallenges,
} = require('../controllers/challengeController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getChallenges);
router.post('/start', protect, startChallenge);
router.get('/user', protect, getUserChallenges);
router.get('/completed', protect, getCompletedChallenges);
router.put('/:id/progress', protect, updateChallengeProgress);
router.put('/:id/complete', protect, completeChallenge);

module.exports = router;