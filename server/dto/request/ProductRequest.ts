import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID, Min, MinLength, ValidateNested } from "class-validator";
import ImageInterface from "interfaces/ImageInterface";
import ProductInterface from "interfaces/ProductInterface";
import OrderItemRequest from "./OrderItemRequest";
import CartItemRequest from "./CartItemRequest";
import ImageRequest from "./ImageRequest";
import 'reflect-metadata';


class ProductRequest implements ProductInterface {
    @IsOptional()
    @IsUUID()
    id?: string;
  
    @IsString()
    @MinLength(4, { message: "Name must be at least 4 characters long" })
    name: string;
  
    @IsOptional()
    @IsNumber({}, { message: "Inventory must be a number" })
    inventory: number;
  
    @IsOptional()
    @IsNumber({}, { message: "Price must be a valid number" })
    price: number;
  
    @IsOptional()
    @IsString()
    @MinLength(2, { message: "Brand must be at least 2 characters long" })
    brand: string;
  
    @IsOptional()
    @IsString()
    description: string;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => OrderItemRequest)
    order_items?: OrderItemRequest[];
  
    @IsOptional()
    @ValidateNested()
    @Type(() => CartItemRequest)
    cart_items?: CartItemRequest[];
  
    @IsOptional()
    @ValidateNested()
    @Type(() => ImageRequest)
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
export default ProductRequest;