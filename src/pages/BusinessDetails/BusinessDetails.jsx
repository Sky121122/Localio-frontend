import "./BusinessDetails.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    FaPhoneAlt,
    FaWhatsapp,
    FaGlobe,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaClock,
    FaMapMarkerAlt,
    FaEnvelope,
    FaUser,
    FaTag,
    FaCheckCircle
} from "react-icons/fa";

import { getBusinessById } from "../../Services/businessService";

import appLogo from "../../assets/images/hero1.png";

import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

function BusinessDetails() {

    const { id } = useParams();

    const [business, setBusiness] = useState(null);

    useEffect(() => {

        loadBusiness();

    }, []);

    const loadBusiness = async () => {

        try {

            const res = await getBusinessById(id);

            setBusiness(res.business);

        } catch (error) {

            toast.error("Business not found.");

        }

    };

    if (!business) {

        return (
            <div className="loading-container">
                <h2>Loading Business...</h2>
            </div>
        );

    }

    return (
        <>
            <Helmet>
                <title>Business Details | Localio</title>
            </Helmet>
        <div className="business-page">

            {/* Banner */}

            <div className="banner-section">

                <img
                    src={business.banner || appLogo}
                    alt="Banner"
                    className="banner-image"
                />

            </div>

            {/* Profile */}

            <div className="profile-section">

                <div className="logo-wrapper">

                    <img
                        src={business.logo || appLogo}
                        alt="Logo"
                        className="business-logo"
                    />

                </div>

                <div className="profile-content">

                    <div className="title-row">

                        <h1>{business.businessName}</h1>

                        <span className="status-badge">

                            <FaCheckCircle />

                            Active

                        </span>

                    </div>

                    <p className="tagline">

                        {business.businessTagline || "Trusted Local Business"}

                    </p>

                    <div className="badge-row">

                        <span className="category-badge">

                            {business.category}

                        </span>

                        <span className="type-badge">

                            {business.businessType}

                        </span>

                    </div>

                </div>

            </div>

            {/* Action Buttons */}

            <div className="action-buttons">

                <a href={`tel:${business.phone}`}>

                    <FaPhoneAlt />

                    Call

                </a>

                <a
                    href={`https://wa.me/91${business.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                >

                    <FaWhatsapp />

                    WhatsApp

                </a>

                {business.website && (

                    <a
                        href={business.website}
                        target="_blank"
                        rel="noreferrer"
                    >

                        <FaGlobe />

                        Website

                    </a>

                )}

            </div>

            {/* Information */}

            <div className="info-section">

                <div className="info-card">

                    <FaUser className="icon" />

                    <div>

                        <h4>Owner</h4>

                        <p>{business.ownerName}</p>

                    </div>

                </div>

                <div className="info-card">

                    <FaPhoneAlt className="icon" />

                    <div>

                        <h4>Phone</h4>

                        <p>{business.phone}</p>

                    </div>

                </div>

                <div className="info-card">

                    <FaEnvelope className="icon" />

                    <div>

                        <h4>Email</h4>

                        <p>{business.email}</p>

                    </div>

                </div>

                <div className="info-card">

                    <FaTag className="icon" />

                    <div>

                        <h4>GST Number</h4>

                        <p>{business.gstNumber || "Not Available"}</p>

                    </div>

                </div>

                <div className="info-card">

                    <FaClock className="icon" />

                    <div>

                        <h4>Business Hours</h4>

                        <p>

                            {business.openingTime || "--:--"}

                            {" - "}

                            {business.closingTime || "--:--"}

                        </p>

                    </div>

                </div>

                <div className="info-card address-card">

                    <FaMapMarkerAlt className="icon" />

                    <div>

                        <h4>Address</h4>

                        <p>

                            {business.address},

                            <br />

                            {business.city},

                            {" "}

                            {business.state}

                            {" - "}

                            {business.pincode}

                        </p>

                    </div>

                </div>

            </div>

            {/* About */}

            <div className="about-section">

                <h2>

                    About Business

                </h2>

                <p>

                    {business.description}

                </p>

            </div>

            {/* Social */}

            {(business.facebook ||
                business.instagram ||
                business.linkedin ||
                business.youtube) && (

                    <div className="social-section">

                        <h2>

                            Follow Us

                        </h2>

                        <div className="social-icons">

                            {business.facebook && (

                                <a
                                    href={business.facebook}
                                    target="_blank"
                                    rel="noreferrer"
                                >

                                    <FaFacebookF />

                                </a>

                            )}

                            {business.instagram && (

                                <a
                                    href={business.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                >

                                    <FaInstagram />

                                </a>

                            )}

                            {business.linkedin && (

                                <a
                                    href={business.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                >

                                    <FaLinkedinIn />

                                </a>

                            )}

                            {business.youtube && (

                                <a
                                    href={business.youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                >

                                    <FaYoutube />

                                </a>

                            )}

                        </div>

                    </div>

                )}

        </div>
</>
    );

}

export default BusinessDetails;