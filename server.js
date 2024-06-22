const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const dotenv = require('dotenv')
dotenv.config()
const app = express();
console.log(process.env.MONGO_DB_URL)
const mongo=process.env.MONGO_DB_URL;
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// MongoDB Atlas connection
mongoose.connect(mongo, {
    
    
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
