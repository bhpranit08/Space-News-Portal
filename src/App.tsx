import NavBar from "./components/layout/NavBar"
import Home from "./components/layout/Home"
import About from "./components/layout/About"
import Footer from "./components/layout/Footer"

import APOD from "./components/layout/APOD"
import LaunchData from "./components/layout/LaunchData"
import ISSTracker from "./components/layout/ISSTracker"

import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="flex flex-col items-center justify-center mx-4 my-2 gap-4">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/about" element={<About />}  />
        <Route path="/apod" element={<APOD />} />
        <Route path="/launch" element={<LaunchData />} />
        <Route path="/iss" element={<ISSTracker />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App