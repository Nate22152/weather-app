import ThemeToggle from './components/themeContext.jsx';
export default function Header() {
    function locationinput(location){
        const formEl = location.currentTarget
        const formData = new FormData(formEl)
        const currloc = formData.get("location")
        formEl.reset()
    }
    return (
    <header>
      <h1>Weather App</h1>
      {/*search bar*/}
      <form>
        <label htmlFor = "Location">Location:</label>
        <input id = "search" type="location" name="location" placeholder="Input location" />  
      </form>
      {/*day/night*/}
      <ThemeToggle />
    </header>
  )
}