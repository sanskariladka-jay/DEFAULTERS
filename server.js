const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/numberGame', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
  name: String,
  score: Number,
  date: { type: Date, default: Date.now }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Routes
// Get top 5 leaderboard
app.get('/leaderboard', async (req, res) => {
  try {
    const topScores = await Leaderboard.find().sort({ score: -1 }).limit(5);
    res.json(topScores);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new score
app.post('/leaderboard', async (req, res) => {
  try {
    const { name, score } = req.body;
    const newEntry = new Leaderboard({ name, score });
    await newEntry.save();
    res.json({ message: 'Score added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));