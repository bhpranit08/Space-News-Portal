import NavBar from "./components/layout/NavBar"
import Banner from "./components/layout/Banner"
import NearEarthCards from "./components/layout/NearEarthCards"
import NasaImages from "./components/layout/NasaImages"
import Footer from "./components/layout/Footer"

function App() {
  return (
    <div className="flex flex-col items-center justify-center mx-4 my-2 gap-4">
      <NavBar />
      <Banner />
      <NearEarthCards />
      <NasaImages />
      <Footer />
    </div>
  )
}

export default App