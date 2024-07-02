import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "../contexts/AppContext";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import { PrivateRoute, SimpleRoute, TenantRoute } from "./auth";
import RealEstates from "../pages/RealEstates";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import SelectProfile from "../pages/SelectProfile";
import IncomeReports from "../pages/IncomeReports";
import Documents from "../pages/Documents";
import Receipts from "../pages/Receipts";
import AddressReceipts from "../pages/Receipts/AddressReceipts";

export function AppRoutes() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/documents" element={<PrivateRoute component={Documents} />} />
          <Route path="/income-reports" element={<PrivateRoute component={IncomeReports} />} />
          <Route path="/real-estates" element={<PrivateRoute component={RealEstates} />} />
          <Route path="/home" element={<PrivateRoute component={Home} />} />

          <Route path="/home/tenant" element={<TenantRoute component={Home} />} />
          <Route path="/receipts" element={<TenantRoute component={Receipts} />} />
          <Route path="/receipts/address/:id" element={<TenantRoute component={AddressReceipts} />} />
          <Route path="/documents/tenant" element={<TenantRoute component={Documents} />} />

          <Route path="/" element={<SimpleRoute component={Login} />} />
          <Route path="/select-profile" element={<SelectProfile />} />
          <Route path="/login/reset" element={<SimpleRoute component={ResetPassword} />} />
          <Route path="/sign-up" element={<SimpleRoute component={SignUp} />} />
        </Routes>
      </AppProvider>
    </Router>
  )
}