const express = require('express');
const router = express.Router();
const { followUser, unfollowUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.put('/:id/follow', protect, followUser);
router.put('/:id/unfollow', protect, unfollowUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;