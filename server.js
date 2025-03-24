import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
import professionalRoutes from './routes/professionalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
// import association from './models/association.js';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

const app = express();
app.use(fileUpload())
dotenv.config();
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


app.use('/professionals',professionalRoutes); // done ye part 
app.use('/users',userRoutes);  // done
app.use('/consultations', consultationRoutes); //done
app.use('/ratings', ratingRoutes); //done
app.use('/admin', adminRoutes); //done


app.use('/uploads', express.static('uploads'));

sequelize.sync()
  .then(() => console.log(' Database & Tables Synced'))
  .catch(err => console.error(' Sync Error:', err));

app.listen( 3001, () => { console.log('Server running on port 3001') });
