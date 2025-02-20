import User from "../models/User.js";

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
                res.json(user);
            } else {
                res.status(404).send('Feil brukernavn eller passord');
            }
        })
        .catch(err => {
            res.status(500).send('Server error');
        })
}
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
export default {
    getUsers,
    updateUser,
    getUserById,
    login,
    postUser,
}
