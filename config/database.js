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
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully!');
        sequelize.sync();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;

