const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Challenge } = require('./models/Challenge');

dotenv.config();

const challenges = [
  {
    title: 'Public Transport Day',
    description: 'Use public transportation instead of personal vehicle for one full day',
    category: 'transport',
    difficulty: 'easy',
    points: 50,
    duration: 1,
  },
  {
    title: 'Meatless Monday',
    description: 'Go vegetarian or vegan for an entire day',
    category: 'food',
    difficulty: 'easy',
    points: 40,
    duration: 1,
  },
  {
    title: 'Zero Waste Week',
    description: 'Minimize waste by recycling and composting for 7 days',
    category: 'waste',
    difficulty: 'medium',
    points: 150,
    duration: 7,
  },
  {
    title: 'Energy Saver',
    description: 'Reduce your daily energy consumption by 20%',
    category: 'energy',
    difficulty: 'medium',
    points: 100,
    duration: 1,
  },
  {
    title: 'Bike to Work Week',
    description: 'Commute by bicycle for 5 consecutive days',
    category: 'transport',
    difficulty: 'hard',
    points: 200,
    duration: 7,
  },
  {
    title: 'Plant-Based Week',
    description: 'Eat only plant-based meals for 7 days',
    category: 'food',
    difficulty: 'hard',
    points: 250,
    duration: 7,
  },
  {
    title: 'Lights Out Hour',
    description: 'Turn off all non-essential lights for 1 hour daily',
    category: 'energy',
    difficulty: 'easy',
    points: 30,
    duration: 1,
  },
  {
    title: 'Reusable Revolution',
    description: 'Use only reusable bags, bottles, and containers for a week',
    category: 'waste',
    difficulty: 'medium',
    points: 120,
    duration: 7,
  },
];

const seedChallenges = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing challenges
    await Challenge.deleteMany();
    console.log('Cleared existing challenges');

    // Insert new challenges
    await Challenge.insertMany(challenges);
    console.log('Challenges seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding challenges:', error);
    process.exit(1);
  }
};

seedChallenges();