import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import router from 'router/router';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

router(app);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is running on port http://localhost:${port}`);
})