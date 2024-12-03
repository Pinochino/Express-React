import { routeConfigs } from "../configs/routeConfig";
import {CreateProduct, HomePage, Login, ProductDetail, Register} from "@/pages";
import UpdateProduct from "@/pages/UpdateProduct";
import ListProduct from "@/pages/ListProduct";

// import UserDetail from "../pages/UserDetail";

const publicRoute = [
    {
        path: routeConfigs.home,
        component: HomePage,
    },
    {
        path: routeConfigs.createProduct,
        component: CreateProduct,
    },
    // {
    //     path: routeConfigs.userdetail,
    //     component: UserDetail,
    //     layout: null,
    // },
    {
        path: routeConfigs.productById,
        component: ProductDetail,
        layout: null,
    },
    {
        path: routeConfigs.editProduct,
        component: UpdateProduct,
        layout: null,
    },
    {
        path: routeConfigs.login,
        component: Login,
        layout: null,
    },
    {
        path: routeConfigs.register,
        component: Register,
        layout: null,
    },
    {
        path: routeConfigs.listProduct,
        component: ListProduct,
        layout: null,
    },
];

const privateRoute = [];

export { publicRoute, privateRoute };
