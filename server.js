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
app.get('/api/login', (req, res) => {
    User.findOne({ where: { username: 'chris', password: '123' } })
        .then(user => {
            if (user) {
                res.json(user);
                console.log(user);
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server error');
        });
});

const sslOptions = {
    key: fs.readFileSync('C:/Users/chris/OneDrive/Documents/GitHub/GETPrepared/localhost-key.pem'),
    cert: fs.readFileSync('C:/Users/chris/OneDrive/Documents/GitHub/GETPrepared/localhost.pem'),
};

https.createServer(sslOptions, app).listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});
