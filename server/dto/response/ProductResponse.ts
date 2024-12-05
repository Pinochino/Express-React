import CartItemRequest from 'dto/request/CartItemRequest';
import OrderItemRequest from 'dto/request/OrderItemRequest';
import ImageInterface from 'interfaces/ImageInterface';
import ProductInterface from 'interfaces/ProductInterface';
import 'reflect-metadata';

class ProductResponse {
    id?: string;
  
    name: string;
  
    inventory: number;
  
    price: number;
  
    brand: string;
  
    description: string;

    order_items?: OrderItemRequest[];
  

    cart_items?: CartItemRequest[];
  
    images?: ImageInterface[];
    constructor(data: ProductInterface){
        this.id = data.id,
        this.name = data.name,
        this.inventory = data.inventory,
        this.price = data.price,
        this.brand = data.brand,
        this.description = data.description,
        this.order_items = data.order_items,
        this.cart_items = data.cart_items,
        this.images = data.images
    }
}
export default ProductResponse;