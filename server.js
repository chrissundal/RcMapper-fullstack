import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import morgan from 'morgan';
import sequelize from './config/database.js';
import Location from './models/Location.js';
import User from './models/User.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

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
app.post('/api/login', (req, res) => {
    User.findOne({ where: { username: req.body.username, password: req.body.password } })
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
               res.status(404).send('Feil brukernavn eller passord');
            }
        })
        .catch(err => {
            res.status(500).send('Server error');
        })
});
app.post('/api/locations', async (req, res) => {
    Location.create(req.body)
        .then(newLocation => {
        res.status(201).json(newLocation);
    })
        .catch((err) => {
            res.status(500).send('Server error');
        })
})
app.post('/api/users', async (req, res) => {
    try {
        const existingUser = await User.findOne({ where: {username: req.body.username}});
        if (existingUser) {
            return res.status(409).json("Brukernavn allerede tatt.");
        }
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/locations/:id', async (req, res) => {
    Location.destroy({ where: { locationId: req.params.id } })
        .then(() => {
        res.status(200).send('Sted slettet');
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
