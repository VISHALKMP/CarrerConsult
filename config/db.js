import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('careerconsultdb', 'root', 'Gateofhouse9826', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Disable logging for cleaner console output
});


export default sequelize;
