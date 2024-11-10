import { createBrowserRouter, redirect } from "react-router-dom";

import { io } from "socket.io-client";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import BaseLayout from "../views/BaseLayout";
import HomePage from "../views/HomePage";
import AddPage from "../views/AddPage";
import ChatPage from "../views/ChatPage";
import ProfilePage from "../views/ProfilePage";
import Toastify from "toastify-js";

// ---------------------cara 1 : bisa pilih development atau production tp not working--------------------------------------
// Conditionally set the socket URL based on the environment
// const socketURL =
//   process.env.NODE_ENV === "production"
//     ? "https://wavechat.wijayacode.tech" // Production server URL
//     : "http://localhost:3000"; // Development server URL

// const socket = io(socketURL, {
//   autoConnect: false, // You can choose to connect manually or automatically
// });

// const base_url = socketURL; // Set base_url accordingly to match socket URL

// -------------------------cara 2 : development env----------------------------------
// const socket = io("http://localhost:3000", {
//   autoConnect: false,
// });

// const base_url = "http://localhost:3000";

// -------------------------cara 3 : jika sudah production (deploy server)----------------------------------
const socket = io("https://wavechat.wijayacode.tech", {
  autoConnect: false,
});

const base_url = "https://wavechat.wijayacode.tech";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage socket={socket} base_url={base_url} />,
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
    element: <LoginPage socket={socket} base_url={base_url} />,
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
        element: <HomePage socket={socket} base_url={base_url} />,
      },
      {
        path: "/add-room",
        element: <AddPage socket={socket} base_url={base_url} />,
      },
      {
        path: "/room/:id",
        element: <ChatPage socket={socket} base_url={base_url} />,
      },
      {
        path: "/upload",
        element: <ProfilePage socket={socket} base_url={base_url} />,
      },
    ],
  },
]);

export default router;
