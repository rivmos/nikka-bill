import { ProductState } from "@/@types/product";
import { useAppDispatch, useAppSelector } from "@/store";
import { addProduct } from "@/store/slices/product/productSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type ProductFormValues = Partial<ProductState>

const ProductForm = () => {

  const dispatch = useAppDispatch();

  const tenant = useAppSelector(state => state.auth.user.tenant) as string;
  const userId = useAppSelector(state => state.auth.user.id) as string;

  const initialValues: ProductFormValues = {
    code: null,
    name: "",
    description: "",
    price: 0,
    currency: "",
    quantityInStock: 0,
    category: "",
    sku: "",
    hsn: "",
  };

  const validationSchema = Yup.object({
    code: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .min(0, "Price cannot be negative"),
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .min(0, "Price cannot be negative"),
    currency: Yup.string().required("Currency is required"),
    quantityInStock: Yup.number()
      .typeError("Quantity in stock must be a number")
      .required("Quantity in stock is required")
      .min(0, "Quantity cannot be negative"),
    category: Yup.string().required("Category is required"),
    sku: Yup.string().required("SKU is required"),
    hsn: Yup.string().required("SKU is required"),
  });

  const handleSubmit = (values: ProductFormValues) => {
    dispatch(addProduct({ ...values, tenant, createdBy: userId }))
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Field
              id="name"
              name="name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <Field
              id="code"
              name="code"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="code"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Field
              id="description"
              name="description"
              as="textarea"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <Field
              id="price"
              name="price"
              type="number"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <Field
              id="currency"
              name="currency"
              as="select"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" label="Select currency" />
              <option value="USD" label="USD" />
              <option value="EUR" label="EUR" />
              <option value="INR" label="INR" />
            </Field>
            <ErrorMessage
              name="currency"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="quantityInStock" className="block text-sm font-medium text-gray-700">
              Quantity in Stock
            </label>
            <Field
              id="quantityInStock"
              name="quantityInStock"
              type="number"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="quantityInStock"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <Field
              id="category"
              name="category"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="category"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU
            </label>
            <Field
              id="sku"
              name="sku"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="sku"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="hsn" className="block text-sm font-medium text-gray-700">
              HSN
            </label>
            <Field
              id="hsn"
              name="hsn"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="hsn"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
