const User= require('../models/User');

const followUser =async (req, res) => {
  try {
    const user= await User.findById(req.user.id);
    const trainerToFollow = await User.findById(req.params.id);

    if (!trainerToFollow || trainerToFollow.role !== 'trainer') {
      return res.status(404).json({ message:'Trainer not found'});
    }

    if (user.following.includes(trainerToFollow._id)) {
      return res.status(400).json({ message:'You already follow this trainer'});
    }

    user.following.push(trainerToFollow._id);
    await user.save();

    res.status(200).json({ message:`You are now following ${trainerToFollow.name}`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const trainerToUnfollow = await User.findById(req.params.id);

    user.following = user.following.filter(
      (id) => id.toString() !== req.params.id
    );
    await user.save();

    res.status(200).json({ message: `Unfollowed ${trainerToUnfollow.name}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('following', 'name email');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { followUser, unfollowUser, getUserProfile };