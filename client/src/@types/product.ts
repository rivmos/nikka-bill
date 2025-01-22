export type ProductState = {
    id: string,
    code: number | null,
    name: string;
    description?: string;
    price: number;
    currency: string;
    quantityInStock: number;
    tenant: string; // Associated company (tenant)
    category?: string; // Optional product category
    sku?: string; // Stock Keeping Unit (unique identifier)
    createdBy: string; // User who created the product
    updatedBy?: string; // User who last updated the product
    createdAt: Date;
    updatedAt: Date;
}