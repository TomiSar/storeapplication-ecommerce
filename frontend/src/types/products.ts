export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  popularity?: string | number;
  imageUrl: string;
}
