import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/userRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());

//  use body-parser middleware to parse incoming JSON data in the request body.
// body-parser is a middleware
// It reads the request body and converts it into a JavaScript object so you can access it via: req.body 
// app.use(bodyParser.json()); or 
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 8000;

// Connect to MongoDB using the connection string from the environment variable
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use('/api', route);
