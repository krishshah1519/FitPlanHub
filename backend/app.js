require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT|| 5000;
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database Error:', err));
app.get('/',(req,res)=>{
    res.send('Hello World')
});
app.use('/api/auth', authRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});