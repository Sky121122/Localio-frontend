import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from 'react'
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "../components/layouts/PublicLayout";
import MyBusinesses from "../pages/Dashboard/MyBusinesses";
import AddBusiness from "../pages/Dashboard/AddBusiness";
import ExploreBusiness from "../pages/Dashboard/ExploreBusiness";
import Settings from "../pages/Dashboard/Settings";
import DashboardLayout from "../components/layouts/DashboardLayout";
import BusinessDetails from "../pages/BusinessDetails/BusinessDetails";
import NotFound from "../pages/NotFound/NotFound";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import About from "../pages/Home/About";

export default function AppRoutes() {
  return (
    <BrowserRouter>
       
          {/* ------------------- web for public -----------  */}
            <Routes>
              
                <Route element={<PublicLayout />} >
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />}/>
                    <Route path="/forgot-password" element={<ForgotPassword />}/>
                    <Route path="*" element={<NotFound />} />
                </Route>

{/* ---------------- for dashboard ------------  */}
                <Route element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                }>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/my-business" element={<MyBusinesses />} />
                  <Route path="/dashboard/add-business" element={<AddBusiness />} />
                  <Route path="/dashboard/explore" element={<ExploreBusiness />} />
                  <Route path="/dashboard/settings" element={<Settings />} />
                  <Route path="/business/:id" element={<BusinessDetails />} />
                  <Route path="/dashboard/edit-business/:id" element={<AddBusiness />}/>
                  <Route path="*" element={<NotFound />} />
                </Route>

            </Routes>
    
    </BrowserRouter>
  )
}
