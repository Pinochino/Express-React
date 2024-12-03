import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsUUID, ValidateNested } from "class-validator";
import CartItemInterface from "interfaces/CartItemInterface";
import CartRequest from "./CartRequest";
import CartInterface from "interfaces/CartInterface";
import ProductRequest from "./ProductRequest";
import 'reflect-metadata';


class CartItemRequest implements CartItemInterface {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsOptional()
    @IsNumber({}, { message: "Quantity must be a number" })
    quantity?: number;

    @IsOptional()
    @IsNumber({}, { message: "Inventory must be a number" })
    unit_price?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => CartRequest)
    Cart?: CartInterface;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductRequest)
    Product?: ProductRequest;


    constructor(data: CartItemInterface) {
        this.id = data.id
        this.quantity = data.quantity
        this.unit_price = data.unit_price
        this.Cart = data.Cart
        this.Product = data.Product
    }
}
export default CartItemRequest;