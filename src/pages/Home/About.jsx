import "./About.css";
import {
    FaBuilding,
    FaSearch,
    FaUserShield,
    FaCloudUploadAlt,
    FaMapMarkedAlt,
    FaRocket,
    FaGithub,
    FaLinkedin,
    FaGlobe
} from "react-icons/fa";

function About() {

    const features = [
        {
            icon: <FaBuilding />,
            title: "Business Listing",
            text: "Create a professional business profile with logo, contact details and location."
        },
        {
            icon: <FaSearch />,
            title: "Smart Search",
            text: "Search businesses by name, category and city within seconds."
        },
        {
            icon: <FaCloudUploadAlt />,
            title: "Image Upload",
            text: "Upload professional business logos securely using Cloudinary."
        },
        {
            icon: <FaMapMarkedAlt />,
            title: "Location Based",
            text: "Help customers discover nearby businesses effortlessly."
        },
        {
            icon: <FaUserShield />,
            title: "Secure Authentication",
            text: "Firebase Authentication keeps every account secure."
        },
        {
            icon: <FaRocket />,
            title: "Fast & Responsive",
            text: "Optimized experience across desktop, tablet and mobile devices."
        }
    ];

    return (

        <div className="about-page">

            {/* Hero */}

            <section className="about-hero">

                <h1>
                    About Localio
                </h1>

                <p>

                    Helping Local Businesses Build Their Online Presence.

                </p>

            </section>

            {/* About */}

            <section className="about-section">

                <div className="about-content">

                    <h2>

                        What is Localio?

                    </h2>

                    <p>

                        Localio is a modern business directory platform designed
                        to help local businesses create an online presence without
                        the need for a personal website.

                    </p>

                    <p>

                        Business owners can register, manage and showcase their
                        businesses while customers can easily search, explore and
                        discover nearby services.

                    </p>

                </div>

            </section>

            {/* Why */}

            <section className="features-section">

                <h2>

                    Why Choose Localio?

                </h2>

                <div className="feature-grid">

                    {

                        features.map((item, index) => (

                            <div
                                key={index}
                                className="feature-card"
                            >

                                <div className="about-feature-icon">

                                    {item.icon}

                                </div>

                                <h3>

                                    {item.title}

                                </h3>

                                <p>

                                    {item.text}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </section>

            {/* How it Works */}

            <section className="timeline-section">

                <h2>

                    How It Works

                </h2>

                <div className="timeline">

                    <div>

                        <span>1</span>

                        <h4>Create Account</h4>

                    </div>

                    <div>

                        <span>2</span>

                        <h4>Complete Profile</h4>

                    </div>

                    <div>

                        <span>3</span>

                        <h4>Add Business</h4>

                    </div>

                    <div>

                        <span>4</span>

                        <h4>Reach Customers</h4>

                    </div>

                </div>

            </section>

            {/* Audience */}

            <section className="audience-section">

                <h2>

                    Who Can Use Localio?

                </h2>

                <div className="audience-grid">

                    <div>🏪 Shops</div>
                    <div>☕ Cafes</div>
                    <div>🍽 Restaurants</div>
                    <div>🏥 Clinics</div>
                    <div>💼 Freelancers</div>
                    <div>🏋 Gyms</div>
                    <div>🏨 Hotels</div>
                    <div>🛠 Service Providers</div>

                </div>

            </section>

            {/* Tech */}

            <section className="tech-section">

                <h2>

                    Built With

                </h2>

                <div className="tech-grid">

                    <div>React</div>
                    <div>Vite</div>
                    <div>Node.js</div>
                    <div>Express.js</div>
                    <div>MongoDB Atlas</div>
                    <div>Firebase</div>
                    <div>Cloudinary</div>
                    <div>Axios</div>

                </div>

            </section>

            {/* Mission */}

            <section className="mission-section">

                <h2>

                    Our Mission

                </h2>

                <p>

                    Our mission is to empower local businesses with an
                    affordable and easy-to-use platform that helps them
                    reach more customers online.

                </p>

            </section>

            {/* FAQ */}

            <section className="faq-section">

                <h2>

                    Frequently Asked Questions

                </h2>

                <details>

                    <summary>

                        Is Localio free?

                    </summary>

                    <p>

                        Yes. Anyone can create an account and register their
                        business for free.

                    </p>

                </details>

                <details>

                    <summary>

                        Can I edit my business later?

                    </summary>

                    <p>

                        Absolutely. You can update your business information
                        anytime.

                    </p>

                </details>

                <details>

                    <summary>

                        Is my data secure?

                    </summary>

                    <p>

                        Yes. Localio uses Firebase Authentication, MongoDB Atlas
                        and Cloudinary to securely manage user data.

                    </p>

                </details>

            </section>

            {/* Developer */}

            <section className="developer-section">

                <h2>

                    Meet the Developer

                </h2>

                <h3>

                    Saket Kumar

                </h3>

                <p>

                    Full Stack Developer passionate about building scalable
                    web and mobile applications using the MERN Stack,
                    React Native and Java.

                </p>

                <div className="developer-links">

                    <a href="https://github.com/Sky121122">
                        <FaGithub />
                    </a>

                    <a href="https://www.linkedin.com/in/saket-yadav-b90a3525b">
                        <FaLinkedin />
                    </a>

                    <a href="https://saketdev.in/">
                        <FaGlobe />
                    </a>

                </div>

            </section>

        </div>

    );

}

export default About;