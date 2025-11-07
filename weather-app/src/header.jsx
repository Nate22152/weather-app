
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
      {/*day/night*/}
      
      <button>Dark Mode</button>
      {/*search bar*/}
      <form>
        <label htmlFor = "Location">Location:</label>
        <input id = "search" type="location" name="location" placeholder="Input location" />  
      </form>
    </header>
  )
}