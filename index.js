import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recommendRoutes from './routes/recommend.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', recommendRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the Car AI Assistant server!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
