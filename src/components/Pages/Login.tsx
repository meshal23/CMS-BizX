/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Form, redirect, useNavigation } from "react-router-dom";

const APT_URL = import.meta.env.VITE_REACT_APP_API_URL;

export async function action({ request }: any) {
  const requestData = await request.formData();

  const username = requestData.get("username");
  const password = requestData.get("password");

  if (username === "" || password === "") {
    return toast.error("username or password cannot be empty");
  }

  const values = {
    username,
    password,
  };

  try {
    const res = await axios({
      method: "post",
      url: `${APT_URL}login`,
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("BizX_accessToken", res.data.accessToken);
    localStorage.setItem(
      "BizX_LocationCode",
      res.data.user.stockLocations[0].code
    );
    return redirect("/intro");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    localStorage.setItem("isLoggedIn", "false");
    return toast.error("Credentials not valid");
  }
}

function Login() {
  const state = useNavigation().state;
  return (
    <section className="flex items-center justify-center w-full h-screen bg-blue-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-center mx-2 motion-preset-slide-up motion-duration-1500 motion-ease-spring-bouncy h-3/4 desktop:w-2/5 pocket:max-desktop:w-full">
        <Form
          className="w-full p-4 space-y-6 bg-white desktop:shadow-lg h-3/4 pocket:max-desktop:border-2 pocket:max-desktop:rounded-lg "
          method="post"
          replace
        >
          <h1 className="w-full p-3 text-center text-white rounded-md bg-formHeaderBg font-roboto-bold">
            Login Form
          </h1>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <button
            disabled={state === "submitting"}
            type="submit"
            className={`w-full px-5 py-3 text-base motion-preset-slide-right motion-ease-spring-bouncier motion-duration-1500 motion-delay-500 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              state === "submitting" && "bg-blue-300"
            }`}
          >
            {state === "submitting"
              ? "Logging in ...."
              : "Login to your account"}
          </button>
        </Form>
      </div>
    </section>
  );
}

export default Login;
