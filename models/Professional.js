

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Professional = sequelize.define('Professional', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qualification: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false
    },
    consultationPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    profilePic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
    aadharCard: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    panCard: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    tenthResult: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    twelfthResult: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    collegeMarksheet: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    profileUpdateMessage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      resetOtp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetOtpExpiry: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
}, {
    timestamps: true
});

sequelize.sync()
  .then(() => console.log('Database & Tables Synced'))
  .catch(err => {
    console.error('Sync Error:', err);
  });

export default Professional;
