import Location from "../models/Location.js";
import Favorites from "../models/Favorites.js";

const getLocations = async (req, res) => {
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
}
const getSingleLocation = async (req, res) => {
    Location.findOne({ where: { locationId: req.params.id} })
        .then(locations => {
            res.json(locations);
        })
        .catch(err => {
            res.status(500).send('Server error');
        });
}
const postLocation = async (req, res) => {
    Location.create(req.body)
        .then(newLocation => {
            res.status(201).json(newLocation);
        })
        .catch((err) => {
            res.status(500).send('Server error');
        })
}
const deleteLocation = async (req, res) => {
    Favorites.destroy({ where: { locationId: req.params.id } }).catch(err => res.status(500).send('Server error'));
    Location.destroy({ where: { locationId: req.params.id } })
        .then(() => {
            res.status(200).send('Sted slettet');
        }).catch(err => {
        res.status(500).send('Server error');
    })
}
export default {
    getLocations,
    getSingleLocation,
    postLocation,
    deleteLocation,
}
