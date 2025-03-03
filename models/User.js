import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
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
    role: {
        type: DataTypes.ENUM('user'),
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT
    }
    }
);

sequelize.sync()
.then(result=>{
    console.log("User table created successfully"); 
})
.catch(err=>{
    console.log("Error while creating User table",err);
});

export default User;