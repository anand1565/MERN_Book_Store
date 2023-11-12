import express from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js'
import cors from 'cors';
const app = express()

// Middleware for parsing the request body
app.use(express.json())

// Middleware for handling CORS Policy
// Option 1 : Allow All Origins with Default of cors(*)
app.use(cors())
// Option 2: Allow Customs origins
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))
app.use('/book', bookRoutes)

mongoose.connect(mongodbURL)
    .then(() => {
        console.log("Database Connected")
        app.listen(PORT, () => {
            console.log(`App is listening at http://localhost:${PORT}/`)
        })
    })
    .catch((error) => {
        console.log(error)
    })