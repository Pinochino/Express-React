import CartItemInterface from "./CartItemInterface";
import UserInterface from "./UserInterface";

interface CartInterface {
    id?: string;
    total_amount?: number;
    quantity?: number;
    userId?: string;
    user?: UserInterface;
    cart_items?: CartItemInterface;
}
export default CartInterface;