import express, { Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router();

// Create a new product
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const { code, name, description, price, currency, quantityInStock, tenant, category, sku, createdBy } = req.body;

        const codeAlreadyExists =  await Product.findOne({ code });

        console.log(codeAlreadyExists);

        if (codeAlreadyExists) return res.status(404).json({ message: "Code Already Exists" });

        const newProduct = new Product({
            code,
            name,
            description,
            price,
            currency,
            quantityInStock,
            tenant,
            category,
            sku,
            createdBy,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});

// Get all products
router.get("/", async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate("tenant createdBy updatedBy");
        res.json(products);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});

// Get a single product by ID
router.get("/:id", async (req: Request, res: Response):Promise<any> => {
    try {
        const product = await Product.findById(req.params.id).populate("tenant createdBy updatedBy");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});

// Update a product
router.put("/:id", async (req: Request, res: Response):Promise<any> => {
    try {
        const { code, name, description, price, currency, quantityInStock, tenant, category, sku, updatedBy } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { code, name, description, price, currency, quantityInStock, tenant, category, sku, updatedBy },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json(updatedProduct);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});

// Delete a product
router.delete("/:id", async (req: Request, res: Response):Promise<any> => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});

// Fetch products by tenant
router.get("/tenant/:tenantId", async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ tenant: req.params.tenantId });
        // const products = await Product.find({ tenant: req.params.tenantId }).populate("tenant createdBy updatedBy");
        res.json(products);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});

// Fetch products by category
router.get("/category/:category", async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ category: req.params.category }).populate("tenant createdBy updatedBy");
        res.json(products);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});

// Fetch product by SKU
router.get("/sku/:sku", async (req: Request, res: Response):Promise<any> => {
    try {
        const product = await Product.findOne({ sku: req.params.sku }).populate("tenant createdBy updatedBy");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});

export default router;
