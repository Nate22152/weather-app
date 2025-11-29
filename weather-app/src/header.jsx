import ThemeToggle from './components/themeContext.jsx';
export default function Header({unit, toggleUnit}) {
    return (
    <header>
      <h1>Weather App</h1>
      <ThemeToggle />
    </header>
  )
}