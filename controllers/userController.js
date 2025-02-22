import User from "../models/User.js";
import Favorites from "../models/Favorites.js";
import jwt from 'jsonwebtoken';

const getUsers = async (req, res) => {
    User.findAll()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Server error');
        })
}
const updateUser = async (req, res) => {
    User.update(req.body, {where: { id: req.body.id }})
        .then((updatedUser) => { res.json(updatedUser); })
        .catch(err => { res.status(500).send('Server error'); })
}
const getUserById = async (req, res) => {
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
}

const login = async (req, res) => {
    User.findOne({ where: { username: req.body.username, password: req.body.password } })
        .then((user) => {
            if (user) {
                const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '24h' });
                res.json({ user, token });
            } else {
                res.status(404).send('Feil brukernavn eller passord');
            }
        })
        .catch(err => {
            res.status(500).send('Server error');
        });
};

const postUser = async (req, res) => {
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
}
const deleteUser = async (req, res) => {
    Favorites.destroy({ where: { userId: req.params.id }})
        .catch(err => {
            res.status(500).send('Kunne ikke slette favoritt');
        })
    User.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.status(200).send('Bruker slettet');
        }).catch(err => {
        res.status(500).send('Kunne ikke slette bruker');
    })
}
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
export default {
    getUsers,
    updateUser,
    getUserById,
    login,
    postUser,
    deleteUser,
    authenticateToken,
}
