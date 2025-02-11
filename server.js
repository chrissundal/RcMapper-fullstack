import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import { connectToDatabase } from './config/database.js';
import Location from './models/Location.js';
import User from './models/User.js';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

connectToDatabase();

app.get('/api/locations', async (req, res) => {
    Location.findAll()
    .then(locations => {
        res.json(locations);
    })
    .catch(err => {
        res.status(500).send('Server error');
    });
});
app.get('/api/locations/:id', async (req, res) => {
    Location.findOne({ where: { locationId: req.params.id} })
        .then(locations => {
            res.json(locations);
        })
        .catch(err => {
            res.status(500).send('Server error');
        });
});
app.get('/api/users', async (req, res) => {
    User.findAll()
    .then((users) => {
        res.json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Server error');
    })
});
app.get('/api/users/:id', async (req, res) => {
    User.findByPk(req.params.id)
    .then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Server error');
    });
});
app.post('/api/login', async (req, res) => {
    User.findOne({ where: { username: req.body.username, password: req.body.password } })
        .then((user) => {
            if (user) {
                res.json(user);
            }
            else{
                res.status(404).send('User not found');
            }
        })
        .catch(err => {
            res.status(500).send('Server error');
        })
});
app.post('/api/locations', async (req, res) => {
    const { userId, latitude, longitude, title, description, category } = req.body;
    Location.create({
        userId,
        latitude,
        longitude,
        title,
        description,
        category,
        createdAt: new Date(),
    }).then(newLocation => {
        res.status(201).json(newLocation);
    })
        .catch((err) => {
            res.status(500).send('Server error');
        })
})
app.delete('/api/locations/:id', async (req, res) => {
    Location.destroy({ where: { locationId: req.params.id } })
        .then(() => {
        res.status(200).send('Location deleted');
    }).catch(err => {
        res.status(500).send('Server error');
    })
})
const sslOptions = {
    key: fs.readFileSync('C:/Users/chris/OneDrive/Documents/GitHub/GETPrepared/localhost-key.pem'),
    cert: fs.readFileSync('C:/Users/chris/OneDrive/Documents/GitHub/GETPrepared/localhost.pem'),
};

https.createServer(sslOptions, app).listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});
