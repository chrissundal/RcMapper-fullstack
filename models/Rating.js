import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Ratings = sequelize.define('Ratings', {
    ratingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: 'Ratings',
});

export default Ratings;
