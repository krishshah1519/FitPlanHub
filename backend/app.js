require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT|| 5000;
const authRoutes = require('./routes/authRoutes');
const planRoutes = require('./routes/planRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Database Connected')).catch((err) => console.log('Database Error:', err));
require('./models/User');
require('./models/Plan');

app.get('/',(req,res)=>{
    res.send('Hello World')
});

app.use('/api/auth', authRoutes);
app.use('/api/plans',planRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});