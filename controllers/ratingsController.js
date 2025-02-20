import Ratings from "../models/Rating.js";

const getRatings = async (req,res) => {
    Ratings.findAll({ where: { locationId: req.params.id } })
        .then(rating => res.json(rating))
        .catch(err => {
            res.status(500).send('Server error');
            console.error(err);
        });
}
const postRating = async (req,res) => {
    Ratings.create(req.body)
        .then(newRating => {
            res.status(201).json(newRating);
        })
        .catch((err) => {
            res.status(500).send('Server error');
        })
}
export default {
    getRatings,
    postRating,
}
