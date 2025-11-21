import ThemeToggle from './components/themeContext.jsx';
export default function Header() {
    return (
    <header>
      <h1>Weather App</h1>
      {/*day/night*/}
      <ThemeToggle />
    </header>
  )
}