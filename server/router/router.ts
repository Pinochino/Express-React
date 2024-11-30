import { Application } from "express";
import userRouter from './user';

function routers(app: Application) {
    app.use('/', userRouter)
}

export default routers;
