import "./NotFound.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import {Helmet} from "react-helmet-async"

function NotFound() {

    const navigate = useNavigate();

    return (
<>
        <Helmet>
            <title>Page Not Found | Localio</title>
        </Helmet>

        <div className="notfound-page">

            <div className="notfound-card">

                <h1>404</h1>

                <h2>Oops! Page Not Found</h2>

                <p>
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <div className="notfound-buttons">

                    <button
                        onClick={() => navigate(-1)}
                        className="back-btn"
                    >
                        <IoArrowBack />
                        Go Back
                    </button>

                    <Link
                        to="/dashboard"
                        className="home-btn"
                    >
                        <FaHome />
                        Dashboard
                    </Link>

                </div>

            </div>

        </div>
</>
    );

}

export default NotFound;