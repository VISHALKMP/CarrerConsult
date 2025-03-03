import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Rating = sequelize.define('Rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    review: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

sequelize.sync()
.then(result=>{
    console.log("Rating table created successfully"); 
})
.catch(err=>{
    console.log("Error while creating Rating table",err);
});

export default Rating;