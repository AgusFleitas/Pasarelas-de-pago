import express from "express";
import cors from 'cors'
import morgan from 'morgan'

import paymentRoutes from './routes/payment.routes.js'

import { PORT } from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(paymentRoutes);

app.listen(PORT, 
    console.log(`Server currently working on port ${PORT}`)
);
