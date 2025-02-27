import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Consultation = sequelize.define('Consultation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    requestedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});


export default Consultation;