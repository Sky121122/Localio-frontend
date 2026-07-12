import "./ForgotPassword.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {Helmet} from "react-helmet-async"

import { forgotPassword } from "../../Services/authService";


function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim())
            return toast.error("Email is required.");

        try {

            setLoading(true);

            await forgotPassword(email);

            toast.success(
                "Password reset link sent to your email."
            );

            setEmail("");

        } catch (error) {

            toast.error(error.message);

        } finally {

            setLoading(false);

        }

    };

    return (
<>
        <Helmet>
            <title>Forgot Password | Localio</title>
        </Helmet>
        <div className="forgot-page">

            <div className="forgot-card">

                <h2>Forgot Password</h2>

                <p>

                    Enter your registered email address.
                    We'll send you a password reset link.

                </p>

                <form onSubmit={handleSubmit}>

                    <input

                        type="email"

                        placeholder="Enter your email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                    />

                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading ?

                                <>


                                    Sending...

                                </>

                                :

                                "Send Reset Link"

                        }

                    </button>

                </form>

                <Link to="/login">

                    Back to Login

                </Link>

            </div>

        </div>
</>
    );

}

export default ForgotPassword;