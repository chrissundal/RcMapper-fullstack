import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Favorites = sequelize.define('Favorites', {
    favoriteId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    locationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: 'Favorites',
});

export default Favorites;
