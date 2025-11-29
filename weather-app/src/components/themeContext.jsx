import { useEffect, useState } from "react";

export default function Theme() {
    const [theme, setTheme] = useState("light"); 

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]); 
    return (
        <div className = "button-header">
            <button className="theme-toggle-btn" onClick={toggleTheme}>{theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
        </div>
    );
}