import ProductInterface from "./ProductInterface";

interface CategoryInterface {
    id?: string;
    name?: string;
    products?: ProductInterface;
}
export default CategoryInterface;