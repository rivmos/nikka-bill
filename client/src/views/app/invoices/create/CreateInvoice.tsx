import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Mock product list
const products = [
  { id: "101", name: "Rice", price: 50 },
  { id: "102", name: "Wheat", price: 40 },
  { id: "103", name: "Sugar", price: 30 },
];

// Validation schema
const validationSchema = Yup.object().shape({
  productInput: Yup.string()
    .required("Required")
    .matches(
      /^\d+(\*\d+(\.\d+)?)?$/,
      "Input must be in the format: id or id*quantity (e.g., 101 or 101*2.5)"
    ),
});

const BillCreator = () => {
  const [billItems, setBillItems] = useState<
    { id: string; name: string; quantity: number; totalPrice: number }[]
  >([]);

  const handleAddProduct = (productInput: string, resetField: () => void) => {
    const [id, quantityStr] = productInput.split("*");
    const quantity = quantityStr ? parseFloat(quantityStr) : 1; // Default quantity is 1

    const product = products.find((p) => p.id === id);
    if (!product) {
      alert("Product ID not found!");
      return;
    }

    const newBillItem = {
      id: product.id,
      name: product.name,
      quantity,
      totalPrice: product.price * quantity,
    };

    setBillItems((prev) => [...prev, newBillItem]);
    resetField();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bill Creator</h1>
      <Formik
        initialValues={{ productInput: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleAddProduct(values.productInput, resetForm);
        }}
      >
        {({ errors, touched, submitForm }) => (
          <Form className="mb-6">
            <div className="flex items-center space-x-4">
              <Field
                name="productInput"
                className="border rounded-md p-2 w-full"
                placeholder="Enter product ID and quantity (e.g., 101 or 101*2.5)"
                autocomplete="off"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (
                    e.key === "Enter" ||
                    e.key === "Tab" ||
                    e.key === "Escape" ||
                    e.key === "ArrowDown" // Add other keys as needed
                  ) {
                    e.preventDefault(); // Prevent default behavior (e.g., form submission or focus change)
                    submitForm();
                  }
                }}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
            {errors.productInput && touched.productInput && (
              <p className="text-red-500 text-sm mt-1">{errors.productInput}</p>
            )}
          </Form>
        )}
      </Formik>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {billItems.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
              <td className="border border-gray-300 px-4 py-2">
                ₹{item.totalPrice.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillCreator;
