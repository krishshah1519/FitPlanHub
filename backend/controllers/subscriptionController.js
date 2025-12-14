const User = require('../models/User');
const Plan = require('../models/Plan');

const subscribe = async (req, res) => {
    try {
        const { id: planId } = req.params;
        const userId = req.user.id; 

        const [plan, user] = await Promise.all([
            Plan.findById(planId),
            User.findById(userId)
        ]);

        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        const alreadySubscribed = user.purchasedPlans.some(
            (id) => id.toString() === planId
        );

        if (alreadySubscribed) {
            return res.status(400).json({ message: 'Already subscribed' });
        }
        user.purchasedPlans.push(planId);
        plan.subscribers.push(userId);

        await Promise.all([user.save(), plan.save()]);
        
        return res.status(200).json({ 
            message: `Subscribed to ${plan.title}`,
            planId 
        });

    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Server error during subscription' });
    }
};

module.exports = { subscribe };