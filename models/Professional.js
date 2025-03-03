import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Professional = sequelize.define('Professional', {
    id :{
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
        // unique: true
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
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
    }
}, {
    timestamps: true
});
sequelize.sync()
  .then(() => console.log('✅ Database & Tables Synced'))
  .catch(err =>{
    console.log("Pro")
    console.error('❌ Sync Error:', err)
}
);


export default Professional;