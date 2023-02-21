import {
  BrowserRouter,
  Router,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SIgnUp";
import Faq from "./pages/Forgotpassword";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import OderHistory from "./pages/Offers";

import ErrorPage from "./pages/ErrorPage";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/Forgotpassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />}>
          <Route path="/pages/forgotpassword" element={<ForgotPassword />} />
          <Route path="/pages/signup" element={<SignUp />} />
          <Route path="/pages/signin" element={<SignIn />} />
          <Route path="pages/Offers" element={<Offers />}></Route>

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </>
    )
  );

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      ;
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
