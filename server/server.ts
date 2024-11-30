import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import multer from 'multer';
import connectDb from './dbSetup';
import router from './router/router';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

connectDb();
router(app);



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is running on port http://localhost:${port}`);
})