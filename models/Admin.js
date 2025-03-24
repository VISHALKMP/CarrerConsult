import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Admin = sequelize.define('Admin', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    resetOtp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetOtpExpiry: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
});

export default Admin;