import productsJson from "@/data/products.json";
import { Product } from "@/store/cartStore";

export const products: Product[] = productsJson as Product[];

/**
 * Returns a slice of products.
 * @param start Start index
 * @param end End index
 * @returns Array of products
 */
export const getProductSlice = (start: number, end: number): Product[] => {
  return products.slice(start, end);
};
