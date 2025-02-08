import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('RcMapper', 'christoffer', 'test123', {
  host: 'localhost\\MSSQLSERVER01',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      trustServerCertificate: true,
      encrypt: true
    }
  },
  logging: false
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
    await sequelize.sync();
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

export { sequelize, connectToDatabase };

