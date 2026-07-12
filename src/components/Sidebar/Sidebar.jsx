import "./Sidebar.css";

import defaultAvatar from "../../assets/images/hero1.png";

import { RiDashboardFill } from "react-icons/ri";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaStore, FaSignOutAlt } from "react-icons/fa";
import { MdExplore, MdSettings } from "react-icons/md";

import { NavLink, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import { logoutUser } from "../../Services/authService";
import { getUserProfile } from "../../Services/userService";

import toast from "react-hot-toast";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState(null);

    useEffect(() => {

        if (user?.uid) {
            loadUser();
        }

    }, [user]);

    const loadUser = async () => {

        try {

            const res = await getUserProfile(user.uid);

            setUserData(res.user);

        } catch (error) {

            console.log(error);

        }

    };

    const handleLogout = async () => {

        try {

            setSidebarOpen(false);

            await logoutUser();

            toast.success("Logout Successful");

            navigate("/login");

        } catch (error) {

            toast.error(error.message);

        }

    };

    return (
        <>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

                <div className="logo">
                    <h2>Localio</h2>
                </div>

                <div className="user-box">

                    <div className="avatar">

                        <img
                            src={userData?.photo || defaultAvatar}
                            alt="Profile"
                            onError={(e) => {
                                e.target.src = defaultAvatar;
                            }}
                        />

                    </div>

                    <h3>
                        {userData?.name || user?.displayName || "Business Owner"}
                    </h3>

                    <p>
                        {userData?.email || user?.email}
                    </p>

                    <small>
                        {userData?.mobile}
                    </small>

                </div>

                <div className="menu">

                    <NavLink
                        to="/dashboard"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <RiDashboardFill />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/dashboard/add-business"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <HiBuildingOffice2 />
                        Add Business
                    </NavLink>

                    <NavLink
                        to="/dashboard/explore"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <MdExplore />
                        Explore Business
                    </NavLink>

                    <NavLink
                        to="/dashboard/my-business"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FaStore />
                        My Businesses
                    </NavLink>

                    <NavLink
                        to="/dashboard/settings"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <MdSettings />
                        Settings
                    </NavLink>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </>
    );

}

export default Sidebar;