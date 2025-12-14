const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    trainer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscribers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
},{timeStamps: true});

module.exports = mongoose.model('Plan', planSchema);