import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import meRoutes from './routes/me.js';
import clientRoutes from './routes/client.js';
import roomRoutes from './routes/room.js'
import areaRoutes from './routes/area.js'
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is working!');
});

app.use('/auth', authRoutes);
app.use('/c', meRoutes);
app.use('/clients', clientRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/areas', areaRoutes)


app.listen(5000, () => console.log('Server running on port 5000'));
