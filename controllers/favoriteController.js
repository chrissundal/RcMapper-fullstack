import Favorites from "../models/Favorites.js";

const getFavorites = async (req, res) => {
    Favorites.findAll({ where: { userId: req.params.id } })
        .then(favorites => res.json(favorites))
        .catch(err => {
            res.status(500).send('Server error');
            console.error(err);
        });
}
const postFavorite = async (req, res) => {
    const { userId, locationId } = req.body;
    Favorites.create({ userId, locationId })
        .then(favorite => res.status(201).json(favorite))
        .catch(err => {
            res.status(500).send('Server error');
            console.error(err);
        });
}
const deleteFavorite = async (req, res) => {
    const { userId, locationId } = req.body;
    Favorites.destroy({ where: { userId, locationId } })
        .then(() => res.status(200).send('Favoritt slettet'))
        .catch(err => {
            res.status(500).send('Server error');
            console.error(err);
        });
}
export default {
    getFavorites,
    postFavorite,
    deleteFavorite,
}
