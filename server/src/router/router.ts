import { Application } from "express";
import userRouter from './user.service';
import productRouter from './product.service';

function routers(app: Application) {
    app.use('/users', userRouter),
    app.use('/products', productRouter)
}

export default routers;
