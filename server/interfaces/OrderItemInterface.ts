import OrderInterface from "./OrdersInterface";
import ProductInterface from "./ProductInterface";

interface OrderItemInterface {
  id?: string;
  price?: number;
  quantity?: number;
  orderId?: string;
  productId?: string;
  orders?: OrderInterface;
  Product?: ProductInterface;
}
export default OrderItemInterface;
