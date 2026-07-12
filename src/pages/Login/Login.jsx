import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaGooglePlay } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import hero1 from "../../assets/images/hero1.png"
import { useState } from "react";
import toast from "react-hot-toast";
import { loginUser } from "../../Services/authService";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";

function Login() {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email:"", password:""
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        console.log(e.target.name, e.target.value);
        
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) =>{
   
        e.preventDefault();
        setLoading(true);

        try {
            await loginUser (formData.email, formData.password);
            toast.success("Login Successful");
            navigate("/dashboard")
            
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }



    return (

        <>
            <Helmet>
                  <title>Login | Localio</title>
            </Helmet>
 

        <div className="login-page">

            {/* Left Section */}

            <div className="login-left">

                <div className="overlay"></div>

                <div className="left-content">

                    <img src={hero1} className="localio-image"></img>

                </div>

            </div>

            {/* Right Section */}

            <div className="login-right">

                <div className="login-card">

                    <h2>Welcome Back 👋</h2>

                    <p>
                        Login to manage your business.
                    </p>

                    <form onSubmit={handleSubmit}>

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

                            <FaLock />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="login-options">


                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>

                        </div>

                        <button type="submit" className="login-btn" disabled={loading}>
                               {loading ? (
                                        <>
                                            <ClipLoader
                                                size={18}
                                                color="#fff"
                                            />
                                            <span>Signing In...</span>
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                          </button>

                    </form>

                    <div className="bottom-text">

                        Don't have an account?

                        <Link to="/register">
                            Register
                        </Link>

                    </div>

                </div>

            </div>

        </div>
           </>
    );
}

export default Login;