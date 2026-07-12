import "./MyBusinesses.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
    getMyBusinesses,
    deleteBusiness
} from "../../services/businessService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import appLogo from "../../assets/images/hero1.png";

import {
    FaEdit,
    FaTrash,
    FaEye
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";

function MyBusinesses() {

    const { user } = useContext(AuthContext);

    const [businesses, setBusinesses] = useState([]);

    const loadBusinesses = async () => {

        try {

            const res = await getMyBusinesses(user.uid);

            setBusinesses(res.businesses);

        } catch {

            toast.error("Unable to load businesses.");

        }

    };

    useEffect(() => {

        if(user){

            loadBusinesses();

        }

    }, [user]);

    const handleDelete = async(id)=>{

        const confirmDelete = window.confirm(
            "Delete this business?"
        );

        if(!confirmDelete) return;

        try{

            await deleteBusiness(id);

            toast.success("Business Deleted");

            setBusinesses(
                businesses.filter(
                    (business)=>business._id!==id
                )
            );

        }catch{

            toast.error("Delete Failed");

        }

    }

    return (
<>
        <Helmet>
            <title>My Businesses | Localio</title>
        </Helmet>

        <div className="my-business-page">

            <div className="page-header">

                <h1>

                    My Businesses

                </h1>

                <Link
                    to="/dashboard/add-business"
                    className="add-btn"
                >

                    + Add Business

                </Link>

            </div>

            {
                businesses.length===0 ?

                <h3>

                    No Business Added Yet

                </h3>

                :

                businesses.map((business)=>(

                    <div
                        className="business-row"
                        key={business._id}
                    >

                        <img
                            src={business.logo || appLogo}
                            onError={(e)=>e.target.src=appLogo}
                            className="business-logo"
                        />

                        <div className="business-info">

                            <h3>

                                {business.businessName}

                            </h3>

                            <p>

                                {business.category}

                            </p>

                            <small>

                                {business.city},
                                {" "}
                                {business.state}

                            </small>

                        </div>

                        <div className="business-actions">

                            <Link
                                to={`/business/${business._id}`}
                            >

                                <FaEye/>

                            </Link>

                            <Link
                                to={`/dashboard/edit-business/${business._id}`}
                            >

                                <FaEdit/>

                            </Link>

                            <button
                                onClick={()=>handleDelete(business._id)}
                            >

                                <FaTrash/>

                            </button>

                        </div>

                    </div>

                ))
            }

        </div>
</>
    );

}

export default MyBusinesses;