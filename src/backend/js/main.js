import express from 'express';
import cors from 'cors';
import employeesRoutes from './routes/employeesRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/employees', employeesRoutes);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));