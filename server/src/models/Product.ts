import mongoose, { Schema, Document, Types } from "mongoose";

interface IProduct extends Document {
  code: number;
  name: string;
  description?: string;
  price: number;
  currency: string;
  quantityInStock: number;
  tenant: Types.ObjectId; // Associated company (tenant)
  category?: string; // Optional product category
  sku?: string; // Stock Keeping Unit (unique identifier)
  createdBy: Types.ObjectId; // User who created the product
  updatedBy?: Types.ObjectId; // User who last updated the product
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    code: {
      type: Number,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: "INR", // Default currency
    },
    quantityInStock: {
      type: Number,
      required: true,
      min: 0,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    category: {
      type: String,
      trim: true,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true, // Allows null but enforces uniqueness
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
