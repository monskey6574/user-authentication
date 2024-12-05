import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import axios from "axios";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  rememberMe: Yup.boolean(),
});

const SignIn = () => {
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true); // Indicate submission started
    try {
      const response = await axios.post("http://localhost:8000/signin", {
        email: values.email, // Use values from Formik
        password: values.password,
      });
  
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      toast.success("Successfully signed in!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred while signing in");
    } finally {
      setSubmitting(false); // Stop submission state
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-auth-secondary p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-auth-dark">Welcome back</h2>
          <p className="mt-2 text-gray-600">Please sign in to your account</p>
        </div>

        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    className={`mt-1 ${errors.email && touched.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    className={`mt-1 ${errors.password && touched.password ? "border-red-500" : ""}`}
                  />
                  {errors.password && touched.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      as={Checkbox}
                      id="rememberMe"
                      name="rememberMe"
                      className="h-4 w-4 text-auth-primary"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-auth-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-auth-primary hover:bg-auth-primary/90"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-auth-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
