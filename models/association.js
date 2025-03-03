import User from './User.js';
import Professional from './Professional.js';
import Admin from './Admin.js';
import sequelize from '../config/db.js';
import Consultation from './Consultation.js'; 
import Rating from './Rating.js'; 

// Admin - Professional Relationship (Verification)
Admin.hasMany(Professional);
Professional.belongsTo(Admin);




// Professional - Consultation Relationship
Professional.hasMany(Consultation);
Consultation.belongsTo(Professional);

// User - Consultation Relationship
User.hasMany(Consultation);
Consultation.belongsTo(User);

// User - Rating Relationship
User.hasMany(Rating);
Rating.belongsTo(User);

// Professional - Rating Relationship
Professional.hasMany(Rating);
Rating.belongsTo(Professional);

export default { User, Professional, Admin, Consultation, Rating };
