import { Application } from "express";
import userRouter from './user';

function router(app: Application) {
    app.use('/', userRouter)
}

export default router;
