import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaGooglePlay, FaLock, FaUser } from "react-icons/fa";
import { MdEmail, MdMobileFriendly, MdPhone } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../../Services/authService";
import { saveUser } from "../../Services/userService";
import { ClipLoader } from "react-spinners";
import {Helmet} from "react-helmet-async"


function Register() {

    const [formData, setFormData] = useState({
        name:"", email:"", mobile:"", password:"", confirmPassword:"",  terms: false,
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) =>{
      const { name, value, type, checked } = e.target;

            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
            });
    };



    const handleSubmit = async (e) =>{
         e.preventDefault();
                // Name
                    if (formData.name.trim().length < 3) {
                        return toast.error("Name must be at least 3 characters.");
                    }

                    // Email
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailRegex.test(formData.email)) {
                        return toast.error("Please enter a valid email.");
                    }

                    // Mobile
                    const mobileRegex = /^[6-9]\d{9}$/;

                    if (!mobileRegex.test(formData.mobile)) {
                        return toast.error("Enter a valid 10-digit mobile number.");
                    }

                    // Password
                   if (formData.password.length < 6) {
                        return toast.error("Password must be at least 6 characters.");
                    }


                    // Confirm Password
                    if (formData.password !== formData.confirmPassword) {
                        return toast.error("Passwords do not match.");
                    }

                    // Terms
                    if (!formData.terms) {
                        return toast("Please accept the Terms & Conditions.", {
                                            icon: "⚠️",
                                            duration: 5000,
                                            style: {
                                                border: "1px solid #f59e0b",
                                                padding: "16px",
                                                color: "#92400e",
                                                background: "#fef3c7",
                                            },
                                            });
      }

             setLoading(true);

         try {
           const firebaseUser =  await registerUser(formData.name, formData.email, formData.password);

            await saveUser({
                firebaseUID: firebaseUser.uid,
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile, 
            })

            toast.success("Varification Link send to email, Please Check Spam also.");
            navigate("/login")
         } catch (error) {
            toast.error(error.message)
         }finally{
            setLoading(false)
         }
    }


    return (
        <>
            <Helmet>
                <title>Register | Localio</title>
            </Helmet>
       
        <div className="register-page">

            {/* Left Section */}

            <div className="register-left">

                <div className="overlay"></div>

                <div className="left-content">

                    <div className="brand">
                        <HiOutlineLocationMarker className="brand-icon" />
                        <h1>Localio</h1>
                    </div>

                    <h2>
                        Join Localio
                        <br />
                        Grow Your Business
                    </h2>

                    <p>
                        Register your business and connect with thousands of
                        customers looking for trusted local services. <br />
                        <i>Read Terms & Conditions in the App</i>
                    </p>

                    <button className="play-btn">
                        <FaGooglePlay />
                        Download Android App
                    </button>

                </div>

            </div>

            {/* Right Section */}

            <div className="register-right">

                <div className="register-card">

                    <h2>Create Account 🚀</h2>

                    <p>
                        Create your Localio Business Account.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-box">
                            <FaUser />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-box">
                            <MdEmail />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                           <div className="input-box">
                            <MdPhone />
                        
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Email Mobile No"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="input-box">
                            <FaLock />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                 minLength={6}
                            />
                        </div>

                        <div className="input-box">
                            <FaLock />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                 minLength={6}
                            />
                        </div>

                        <div className="terms">

                            <label>
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                />
                                I agree to the Terms & Conditions
                            </label>

                        </div>

                        <button type="submit" className="register-btn" disabled={loading}>

                            {loading ? (
                                <>
                                    <ClipLoader
                                        size={18}   
                                        color="#fff"                                 
                                    />
                                    <span>Please wait....</span>
                                </>
                            ) : ("Create Account")}

                        </button>

                    </form>

                    <div className="bottom-text">

                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>
     </>
    );
}

export default Register;