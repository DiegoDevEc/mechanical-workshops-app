export interface ProductSaveRequestDto {
  id?: string;
  sku?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}
