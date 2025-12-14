const express = require('express');
const router = express.Router();
const {createPlan, getPlans, updatePlans, deletePlan} = require('../controllers/planControllers');
const {protect, trainerOnly} = require('../middleware/authMiddleware');
const { subscribe } = require('../controllers/subscriptionController');


router.get('/',getPlans);
router.post('/' , protect ,trainerOnly ,createPlan);
router.put('/:id' ,protect,trainerOnly , updatePlans);
router.delete('/:id',protect,trainerOnly ,deletePlan);
router.post('/:id/subscribe',protect,subscribe);
module.exports=router;