import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import BaseLayout from "../views/BaseLayout";
import HomePage from "../views/HomePage";
import AddPage from "../views/AddPage";
import ChatPage from "../views/ChatPage";
import ProfilePage from "../views/ProfilePage";
import Toastify from "toastify-js";

const base_url = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage base_url={base_url} />,
  },
  {
    path: "/login",
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You are already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#008000",
          },
        }).showToast();
        throw redirect("/");
      } else {
        return null;
      }
    },
    element: <LoginPage base_url={base_url} />,
  },

  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        loader: () => {
          if (!localStorage.access_token) {
            Toastify({
              text: "Please login first",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "#008000",
              },
            }).showToast();
            throw redirect("/login");
          } else {
            return null;
          }
        },
        element: <HomePage base_url={base_url} />,
      },
      {
        path: "/add-room",
        element: <AddPage base_url={base_url} />,
      },
      {
        path: "/upload",
        element: <ProfilePage base_url={base_url} />,
      },
    ],
  },
]);

export default router;
