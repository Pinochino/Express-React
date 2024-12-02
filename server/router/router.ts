import { Application } from "express";
import userRouter from './user';

function routers(app: Application) {
    app.use('/users', userRouter)
}

export default routers;
