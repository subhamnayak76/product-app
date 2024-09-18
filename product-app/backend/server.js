import dotenv from "dotenv";
import express from "express";
import { connectDB } from './db/db.js';

import productRoutes from './routes/product.routes.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 5000;
// Connect to the database before starting the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    });