import { CustomerState } from "@/@types/customer";
import { useAppDispatch, useAppSelector } from "@/store";
import { addCustomer } from "@/store/slices/customer/customerSlice";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

type CustomerFormValues = Partial<CustomerState>

const CustomerForm = () => {

  const dispatch = useAppDispatch();

  const tenant = useAppSelector(state => state.auth.user.tenant) as string;
  const userId = useAppSelector(state => state.auth.user.id) as string;

  const initialValues: CustomerFormValues = {
    name: '',
    email: '',
    phone: [],
    address: {
      street:'',
      city:'',
      state:'',
      country:'',
      postalCode: ''
    },
    companyName: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address"),
    phone: Yup.array().of(Yup.string().matches(/^\d+$/, "Phone must be numeric")),
    address: Yup.object({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string(),
      postalCode: Yup.string()
        .required("Postal code is required")
        .matches(/^\d+$/, "Postal code must be numeric"),
      country: Yup.string().required("Country is required"),
    }),
    companyName: Yup.string(),
  });

  const handleSubmit = (values: CustomerFormValues) => {
    dispatch(addCustomer({ ...values, tenant, createdBy: userId }))
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name / Business Name
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <FieldArray name="phone">
            {({ push, remove }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Numbers
                </label>
                {values.phone?.map((_, index) => (
                  <div key={index} className="flex items-center space-x-4 mt-2">
                    <Field
                      name={`phone[${index}]`}
                      placeholder="Phone number"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      className="text-red-600 text-sm"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 text-indigo-600 text-sm"
                  onClick={() => push("")}
                >
                  Add Phone Number
                </button>
              </div>
            )}
          </FieldArray>

          <div>
            <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <Field
              id="address.street"
              name="address.street"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="address.street"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <Field
              id="address.city"
              name="address.city"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="address.city"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="address.state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <Field
              id="address.state"
              name="address.state"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="address.postalCode" className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <Field
              id="address.postalCode"
              name="address.postalCode"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="address.postalCode"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <Field
              id="address.country"
              name="address.country"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="address.country"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name (Optional)
            </label>
            <Field
              id="companyName"
              name="companyName"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

export default CustomerForm;
