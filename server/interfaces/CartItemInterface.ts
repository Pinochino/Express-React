import CartInterface from "./CartInterface";
import ProductInterface from "./ProductInterface";

interface CartItemInterface {
    id?: string;
    quantity?: number;
    total_price?: number;
    unit_price?: number;
    cartId?: string;
    productId?: string;
    Cart?: CartInterface;
    Product?: ProductInterface;
}
export default CartItemInterface;