import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage"

const App = () => {
  
  return (
    <div>
      <Navbar />
      <Routes >
        <Route path="/" element ={<HomePage />}/>
        <Route path="/signup" element ={<SignUpPage/>}/>
        <Route path="/login" element ={<LogInPage />}/>
        <Route path="/settings" element ={<SettingsPage />}/>
        <Route path="/profile" element ={<ProfilePage />}/>
      </Routes>
    </div>
  )
}

export default App
