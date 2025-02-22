import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        options: {
            trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
            encrypt: process.env.DB_ENCRYPT === 'true',
        },
    },
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully!');
        sequelize.sync();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
