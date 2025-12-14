const Plan =require('../models/Plan');

const createPlan = async(req,res)=> {
    try{
        const {title,description ,price, duration} = req.body;

        if(!title ||!description || !price||!duration){
        return res.status(400).json({message: 'All fields are required'
        });
    }
    const plan = await Plan.create({
        title,
        description ,
        price,
        duration ,
        trainer: req.user.id
    });

    res.status(201).json(plan);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

const getPlans =async (req, res) =>{
    try {
      const plans= await Plan.find().populate('trainer' , 'name email');
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const updatePlans = async(req,res)=> {
    try{
        const plan = await Plan.findById(req.params.id);

        if(!plan) return res.status(404).json({message: 'plan not found'});

        if(plan.trainer.toString() !== req.user.id){
            return res.status(401).json({message: 'Not authorized'})
        }

        const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedPlan);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const deletePlan = async(req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if(!plan) return res.status(404).json({message:'plan not found'});

        if(plan.trainer.toString() !== req.user.id){
            return res.status(401).json({message: 'Not authorized'});
        }
        await plan.deleteOne();
        res.status(200).json({id: req.params.id,message: 'Deleted Successfully'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports= {createPlan,getPlans,updatePlans,deletePlan };