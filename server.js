import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import morgan from 'morgan';
import chatController from "./controllers/chatController.js";
import userController from "./controllers/userController.js";
import locationController from "./controllers/locationController.js";
import favoriteController from "./controllers/favoriteController.js";
import ratingsController from "./controllers/ratingsController.js";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/chats', chatController.getChats);
app.post('/api/chats', chatController.postChat);
app.post('/upload', chatController.upload.single('file'), chatController.uploadFile);
app.delete('/api/chats/:id', chatController.deleteChat);

app.get('/api/favorites/:id', favoriteController.getFavorites);
app.post('/api/favorites', favoriteController.postFavorite);
app.delete('/api/favorites', favoriteController.deleteFavorite);

app.get('/api/locations', locationController.getLocations);
app.get('/api/locations/:id', locationController.getSingleLocation);
app.post('/api/locations', locationController.postLocation);
app.delete('/api/locations/:id', locationController.deleteLocation);

app.get('/api/users', userController.getUsers);
app.put('/api/users', userController.updateUser);
app.get('/api/users/:id', userController.getUserById);
app.post('/api/login', userController.login);
app.post('/api/users', userController.postUser);

app.get('/api/ratings/:id', ratingsController.getRatings);
app.post('/api/ratings', ratingsController.postRating);

const sslOptions = {
    key: fs.readFileSync('C:/Users/chris/OneDrive/Documents/GitHub/GETPrepared/localhost-key.pem'),
    cert: fs.readFileSync('C:/Users/chris/OneDrive/Documents/GitHub/GETPrepared/localhost.pem'),
};

https.createServer(sslOptions, app).listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});
