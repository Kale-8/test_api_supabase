import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/enrollments', enrollmentRoutes);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));