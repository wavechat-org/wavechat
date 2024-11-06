import { createBrowserRouter, redirect } from "react-router-dom"
import Chat from "../views/Chat";
import socket from "../utils/socket" 
import LoginPage from "../views/LoginPage";

const router = createBrowserRouter([

    {
        path: "/login",
        element: <LoginPage socket={socket} />
    },
    {
        path: "/chat",
        element: <Chat socket={socket} />
    }
]);

export default router;