const User = require('../models/User');
const Plan = require('../models/Plan');

const subscribe = async(req, res)=> {
    try{
        const planId = req.params.id;
        const userId=req.user.id; 
        const plan =await Plan.findById(planId);
        if(!plan) return res.status(404).json({message:'Plan not found' });

        const user = await User.findById(userId);
        if (user.purchasedPlans.includes(planId)) {
            return res.status(400).json({ message: 'You already subscribed to this plan' });
        }
        user.purchasedPlans.push(planId);
        await user.save();

        plan.subscribers.push(userId);
        await plan.save();
        
        res.status(200).json({ 
            message: `Successfully subscribed to ${plan.title}`,
            planId: planId 
        });
    }catch (error) {
        res.status(500).json({message: error.message });
    }
};
module.exports ={subscribe};