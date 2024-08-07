require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/database/db');
const carRoute = require('./src/routes/carRoutes');
const authRoutes = require('./src/routes/authRoutes');



const corsOptions = {
    origin: '*',  
    Credential: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: 'Content-Type, Authorization',
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api', carRoute);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));