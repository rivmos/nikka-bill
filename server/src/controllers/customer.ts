import express, { Request, Response } from "express";
import Customer from "../models/Customer";
import { verifyAccessToken } from "../utils/middlewares/auth";

const router = express.Router();

router.use(verifyAccessToken);

// Create a new customer
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, companyName, tenant, createdBy } = req.body;

    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
      companyName,
      tenant,
      createdBy,
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ message: '' });
    } else {
        res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

// Get all customers
router.get("/", async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find().populate("tenant createdBy updatedBy");
    res.json(customers);
  } catch (error) {
     if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
  }
});

// Get a single customer by ID
router.get("/:id", async (req: Request, res: Response):Promise<any> => {
  try {
    const customer = await Customer.findById(req.params.id).populate("tenant createdBy updatedBy");
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
     if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
  }
});

// Update a customer
router.put("/:id", async (req: Request, res: Response):Promise<any> => {
  try {
    const { name, email, phone, address, companyName, tenant, updatedBy } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, companyName, tenant, updatedBy },
      { new: true }
    );

    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });
    res.json(updatedCustomer);
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
    } else {
        res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

// Delete a customer
router.delete("/:id", async (req: Request, res: Response):Promise<any> => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
     if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
  }
});

// Fetch customers by tenant
router.get("/tenant/:tenantId", async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find({ tenant: req.params.tenantId }).populate("tenant createdBy updatedBy");
    res.json(customers);
  } catch (error) {
     if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
  }
});

// Search customers by company name
router.get("/company/:companyName", async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find({ companyName: req.params.companyName }).populate("tenant createdBy updatedBy");
    res.json(customers);
  } catch (error) {
     if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
  }
});

// Search customers by email or phone
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.query;

    const query: any = {};
    if (email) query.email = email;
    if (phone) query.phone = phone;

    const customers = await Customer.find(query).populate("tenant createdBy updatedBy");
    res.json(customers);
  } catch (error) {
     if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
  }
});

// Find customer by phone number

  router.get(
    "/phone/:phoneNumber",
    async (req: Request, res: Response):Promise<any> => {
      try {
        const { phoneNumber } = req.params;
        const { tenant } = req.query; // Assuming tenantId is provided as a query parameter
  
        if (!tenant) {
          return res
            .status(400)
            .json({ message: "Tenant ID is required for this operation" });
        }
  
        // Find customer for the specific tenant where phone array contains the given number
        const customer = await Customer.findOne({
          phone: phoneNumber,
          tenant: tenant,
        }).populate("tenant createdBy updatedBy");
  
        if (!customer) {
          return res
            .status(404)
            .json({ message: "Customer not found with the provided phone number" });
        }
  
        res.json(customer);
      } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
      }
    }
  );
  
  

export default router;
