import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "../contexts/AppContext";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import { PrivateRoute } from "./auth";
import RealEstates from "../pages/RealEstates";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";

export function AppRoutes() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/real-estates" element={<PrivateRoute component={RealEstates} />} />
          <Route path="/home" element={<PrivateRoute component={Home} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/login/reset" element={<ResetPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </AppProvider>
    </Router>
  )
}