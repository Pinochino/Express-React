import CartInterface from "@/interfaces/CartInterface";
import CartItemInterface from "@/interfaces/CartItemInterface";
import ProductInterface from "@/interfaces/ProductInterface";
import 'reflect-metadata';


class CartItemResponse implements CartItemInterface{
    id?: string;
    quantity?: number;
    total_price?: number;
    unit_price?: number;
    cartId?: string;
    productId?: string;
    Cart?: CartInterface;
    Product?: ProductInterface;
    constructor(data: CartItemInterface){

    }
}
export default CartItemResponse;