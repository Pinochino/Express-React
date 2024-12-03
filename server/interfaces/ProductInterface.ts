import CartItemInterface from "./CartItemInterface";
import ImageInterface from "./ImageInterface";
import OrderItemInterface from "./OrderItemInterface";

interface ProductInterface {
    id?: string;
    name?: string;
    inventory?: number;
    price?: number;
    brand?: string;
    description?: string;
    order_items?: OrderItemInterface[];
    cart_items?: CartItemInterface[];
    images?: ImageInterface[];
}
export default ProductInterface;