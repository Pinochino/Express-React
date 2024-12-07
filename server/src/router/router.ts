import { Application } from "express";
import userRouter from './user.route';
import productRouter from './product.route';
import roleRouter from './role.router';

function routers(app: Application) {
    app.use('/users', userRouter),
    app.use('/products', productRouter),
    app.use('/roles', roleRouter)
}

export default routers;
