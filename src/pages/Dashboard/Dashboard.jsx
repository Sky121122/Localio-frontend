import "./Dashboard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAllBusinesses, getMyBusinesses } from "../../Services/businessService";
import appLogo from "../../assets/images/hero1.png"

import {
    HiBuildingOffice2
} from "react-icons/hi2";

import {
    FaEye,
    FaPhoneAlt,
    FaStar
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";

function Dashboard() {

    const { user } = useContext(AuthContext);
   
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading]  = useState(true); 
    
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user) return

        fetchBusinesses();
    },[user]);


    const fetchBusinesses = async () =>{
        try {
            const res = await getMyBusinesses(user.uid);
            console.log("the business res = ", res);
            setBusinesses(res.businesses);
        } catch (error) {
             toast.error("Unable to load businesses.");
        } finally{
            setLoading(false);
        }
    };



    return (
<>
        <Helmet>
            <title>Dashboard | Localio</title>
        </Helmet>
        <div className="dashboard-home">

            <div className="welcome-card">

                <div>

                    <h1>

                        Hello, 

                        <span>

                            { user?.displayName || " Business Owner"}

                        </span>

                        👋

                    </h1>

                    <p>

                        Welcome back to Localio.
                        Manage your business and reach more customers.

                    </p>

                </div>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <HiBuildingOffice2 />

                    <h2>{businesses.length}</h2>

                    <p>Total Businesses</p>

                </div>

                <div className="stat-card">

                    <FaEye />

                    <h2>0</h2>

                    <p>Total Views</p>

                </div>

                <div className="stat-card">

                    <FaPhoneAlt />

                    <h2>0</h2>

                    <p>Leads</p>

                </div>

                <div className="stat-card">

                    <FaStar />

                    <h2>0</h2>

                    <p>Reviews</p>

                </div>

            </div>

            <div className="quick-actions">

                <h2>

                    Quick Actions

                </h2>

                <div className="action-buttons">

                    <button

                        onClick={() => navigate("/dashboard/add-business")}

                    >

                        + Add Business

                    </button>

                    <button

                        className="secondary"

                        onClick={() => navigate("/dashboard/explore")}

                    >

                        Explore Businesses

                    </button>

                </div>

            </div>

           <div className="recent-business">

            <h2>Recent Businesses</h2>

    {

        loading ?

            <p>Loading...</p>

            :

            businesses.length === 0 ?

                <div className="empty-box">

                    <HiBuildingOffice2 />

                    <h3>No Businesses Yet</h3>

                    <p>Start by adding your first business.</p>

                </div>

                :

                businesses.map((business) => (

                    <div
                        className="business-card"
                        key={business._id}
                    >

                         <div className="business-header">

                        <img
                            src={business.logo || appLogo}
                            alt={business.businessName}
                            className="business-logo"
                        />

                        <div>
                            <h3>{business.businessName}</h3>
                            <p>{business.category}</p>
                        </div>
                    </div>

                    <small>
                        {business.city}, {business.state}
                    </small>

                    </div>

                ))
    }

</div>

        </div>
</>
    );

}

export default Dashboard;