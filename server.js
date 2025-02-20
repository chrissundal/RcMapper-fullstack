import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import morgan from 'morgan';
import sequelize from './config/database.js';
import Location from './models/Location.js';
import User from './models/User.js';
import Favorites from "./models/Favorites.js";
import Chat from "./models/Chat.js";
import Ratings from "./models/Rating.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get('/api/favorites/:id', (req, res) => {
    Favorites.findAll({ where: { userId: req.params.id } })
        .then(favorites => res.json(favorites))
        .catch(err => {
            res.status(500).send('Server error');
            console.error(err);
        });
});
app.get('/api/ratings/:id', (req, res) => {
    Ratings.findAll({ where: { locationId: req.params.id } })
        .then(rating => res.json(rating))
        .catch(err => {
            res.status(500).send('Server error');
            console.error(err);
        });
});
app.get('/api/chats', async (req, res) => {
    const {category} = req.query;
    try {
        let chats;
        let sortedChats;
        if (category) {
            chats = await Chat.findAll({where: {category}});
            sortedChats = chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        if (chats.length > 50) {
            const oldestChats = sortedChats.slice(-10);
            for (let chat of oldestChats) {
                await Chat.destroy({ where: { chatId: chat.chatId } });
            }
            if (category) {
                chats = await Chat.findAll({where: {category}, order: [['createdAt', 'DESC']]});
            }
        }
        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.get('/api/locations', async (req, res) => {
    const { category } = req.query;
    let categoryQuery = {};
    if (category) {
        categoryQuery.category = category;
    }
    Location.findAll({ where: categoryQuery })
        .then(locations => {
            res.json(locations);
        })
        .catch(err => {
            console.log(err)
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
app.put('/api/users', async (req, res) => {
        User.update(req.body, {where: { id: req.body.id }})
            .then((updatedUser) => { res.json(updatedUser); })
            .catch(err => { res.status(500).send('Server error'); })
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
app.post('/api/ratings', async (req, res) => {
    Ratings.create(req.body)
        .then(newRating => {
            res.status(201).json(newRating);
        })
        .catch((err) => {
            res.status(500).send('Server error');
        })
})
app.post('/api/chats', async (req, res) => {
    Chat.create(req.body)
        .then(chat => {
        res.status(201).json(chat);
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
app.post('/api/favorites', (req, res) => {
    const { userId, locationId } = req.body;

    Favorites.create({ userId, locationId })
        .then(favorite => res.status(201).json(favorite))
        .catch(err => {
            res.status(500).send('Server error');
            console.error(err);
        });
});
app.delete('/api/favorites', (req, res) => {
    const { userId, locationId } = req.body;

    Favorites.destroy({ where: { userId, locationId } })
        .then(() => res.status(200).send('Favoritt slettet'))
        .catch(err => {
            res.status(500).send('Server error');
            console.error(err);
        });
});
app.delete('/api/locations/:id', async (req, res) => {
    Favorites.destroy({ where: { locationId: req.params.id } }).catch(err => res.status(500).send('Server error'));
    Location.destroy({ where: { locationId: req.params.id } })
        .then(() => {
        res.status(200).send('Sted slettet');
    }).catch(err => {
        res.status(500).send('Server error');
    })
})
app.delete('/api/chats/:id', async (req, res) => {
    Chat.destroy({ where: { chatId: req.params.id } })
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
