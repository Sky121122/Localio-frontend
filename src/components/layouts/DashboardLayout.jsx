import { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import Sidebar from "../Sidebar/Sidebar";

import "./DashboardLayout.css";

function DashboardLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="dashboard-layout">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="dashboard-main">

                <div className="mobile-header">

                    <button
                        className="menu-btn"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <HiOutlineMenuAlt3 />
                    </button>

                    <h2>Localio</h2>

                </div>

                <Outlet />

            </div>

        </div>

    );

}

export default DashboardLayout;