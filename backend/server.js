const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/indian-culture', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/festivals', require('./routes/festivals'));
app.use('/api/traditions', require('./routes/traditions'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/culture', require('./routes/culture'));
app.use('/api/auth', require('./routes/auth'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Indian Culture API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
