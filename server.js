import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import professionalRoutes from './routes/professionalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import association from './models/association.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 


// app.use('/auth', authRoutes);
// app.use('/professionals', professionalRoutes); 
// app.use('/users', userRoutes);

// app.use("/admin", adminRoutes);
// app.use((req, res, next) => {
//     console.log(` Route Not Found: ${req.method} ${req.url}`);
//     res.status(404).json({ message: "Route not found" });
// });
// app.use('/consultations', consultationRoutes);
// app.use('/ratings', ratingRoutes);

// const PORT = process.env.PORT || 5000;

// sequelize.sync()
//     .then(() => {
//         console.log('Database connected & synced');
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     })
//     .catch(err => console.error('Database connection error:', err));
app.use('/auth', authRoutes);
app.use('/professionals', professionalRoutes);
app.use('/users', userRoutes);
app.use('/consultations', consultationRoutes); // ✅ Moved above 404 handler
app.use('/ratings', ratingRoutes); // ✅ Moved above 404 handler
app.use('/admin', adminRoutes);

// Handle 404
app.use((req, res, next) => {
    console.log(` Route Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ message: "Route not found" });
});

sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database & Tables Synced'))
  .catch(err => console.error('❌ Sync Error:', err));

  app.listen( 5000, () => { console.log('Server running on port 5000') }
  );
