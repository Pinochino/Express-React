import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import swaggerDocs from 'utils/swagger';
import log from 'utils/logger';
import routers from 'router/router';


const app = express();

app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

routers(app);

const port:number = parseInt(process.env.PORT || "8000", 10);
// swaggerDocs(app, port);

app.listen(port, () => {
    log.info(`App is running on port http://localhost:${port}`);
})