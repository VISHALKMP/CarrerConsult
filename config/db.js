import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('careerconsultdb', 'root', 'Gateofhouse9826', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Disable logging for cleaner console output
});


export default sequelize;
