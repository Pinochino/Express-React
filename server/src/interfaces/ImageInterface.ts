import ProductInterface from "./ProductInterface";

interface ImageInterface {
    id?: string;
    file_name?: string;
    file_type?: string;
    image?: string;
    Product?: ProductInterface;
    productId?: string;
}
export default ImageInterface;