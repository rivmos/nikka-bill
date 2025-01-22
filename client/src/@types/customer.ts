interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }

export type CustomerState = {
    id?: string;
    name: string; // Customer's full name or business name
    email?: string; // Email address
    phone?: string[]; // Phone number
    address?: Address; // Address details
    companyName?: string; // Optional, if this is a business
    tenant: string; // Associated company (tenant)
    createdBy: string; // User who added the customer
    updatedBy?: string; // User who last updated the customer
    createdAt: Date;
    updatedAt: Date;
  }
