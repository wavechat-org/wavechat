import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useContext } from "react";
import "./App.css";
import ThemeContext from "./contexts/ThemeContext";

function App() {
  const theme = useContext(ThemeContext);
  return (
    <>
      <div className={theme.theme}>
        <RouterProvider router={router} />;
      </div>
    </>
  );
}

export default App;
