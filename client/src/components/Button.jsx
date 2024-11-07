import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

export default function Button() {
  const themeContext = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = themeContext.theme === "light" ? "dark" : "light";

    themeContext.setTheme(newTheme);
  };

  return (
    <>
      <button onClick={toggleTheme}>toggle theme</button>
    </>
  );
}

// title_id, title_en, description_id, description_en, img_url
