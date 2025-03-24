import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Consultation = sequelize.define('Consultation', {
  userId: {                     
    type: DataTypes.INTEGER,
    allowNull: false
  },
  professionalId: {             
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  professionalName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  meetingDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  meetingTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Consultation;
