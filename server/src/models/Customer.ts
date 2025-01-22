import mongoose, { Schema, Document, Types } from "mongoose";

interface ICustomer extends Document {
  name: string; // Customer's full name or business name
  email?: string; // Email address
  phone?: string[]; // Phone number
  address?: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  }; // Address details
  companyName?: string; // Optional, if this is a business
  tenant: Types.ObjectId; // Associated company (tenant)
  createdBy: Types.ObjectId; // User who added the customer
  updatedBy?: Types.ObjectId; // User who last updated the customer
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
        message: "Invalid email format",
      },
    },
    phone: [{
      type: String,
      trim: true,
      validate: {
        validator: (value: string) =>
          /^\+?[1-9]\d{1,14}$/.test(value), // E.164 format for phone numbers
        message: "Invalid phone number format",
      },
    }],
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postalCode: { type: String, trim: true, required: true },
      country: { type: String, trim: true, required: true },
    },
    companyName: {
      type: String,
      trim: true,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
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

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
export default Customer;
