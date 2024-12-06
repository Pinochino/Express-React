import { OrderStatus } from "@prisma/client";
import UserInterface from "./UserInterface";
import OrderItemInterface from "./OrderItemInterface";

interface OrderInterface {
    id?: string;
    order_date?: Date;
    order_status?: OrderStatus;
    total_amount?: number;
    userId?: string;
    User?: UserInterface;
    order_items?: OrderItemInterface;
}
export default OrderInterface;