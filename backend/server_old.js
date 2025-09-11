const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Important to parse JSON body

// Routes
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/your_db_name', {
  // No need for useNewUrlParser / useUnifiedTopology if using latest driver
})
.then(() => {
  console.log('MongoDB connected successfully');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => console.error('MongoDB connection error:', err));

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);
