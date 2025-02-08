import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database.js';
import Location from './models/Location.js';
import User from './models/User.js';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));

connectToDatabase();

app.get('/api/locations', async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
