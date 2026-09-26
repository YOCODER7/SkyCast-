import { CloudSun, Moon, Sun } from "lucide-react";

export default function Header({ theme, onToggleTheme }) {
  return <header className="topbar"><div className="brand"><CloudSun size={28} /><span>Skycast</span></div><button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle colour theme">{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}<span>{theme === "dark" ? "Light" : "Dark"}</span></button></header>;
}
