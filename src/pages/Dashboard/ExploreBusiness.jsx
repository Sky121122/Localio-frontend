import "./ExploreBusiness.css";
import { useEffect, useState } from "react";
import { getAllBusinesses, searchBusinesses } from "../../Services/businessService";
import { Link } from "react-router-dom";
import appLogo from "../../assets/images/hero1.png";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

function ExploreBusiness() {

    const [businesses, setBusinesses] = useState([]);

    const [filteredBusinesses, setFilteredBusinesses] = useState([]);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {

        loadBusinesses();

    }, []);



    const loadBusinesses = async () => {
        try {
            const res = await getAllBusinesses();
            setBusinesses(res.businesses);
            setFilteredBusinesses(res.businesses);

        } catch (error) {
            toast.error("Unable to load businesses.");
        }
    };


 const handleSearch = async (
    value = search,
    selectedCategory = category,
    selectedCity = city
) => {

    setSearch(value);

    try {

        const res = await searchBusinesses(
            value,
            selectedCategory,
            selectedCity
        );

        setFilteredBusinesses(res.businesses);

    } catch (error) {

        toast.error("Search failed");

    }

};
 
    return (
        <>
            <Helmet>
                <title>Explore Business | Localio</title>
            </Helmet>
        <div className="explore-page">

            <h1>

                Explore Businesses

            </h1>

            <input

                type="text"

                placeholder="Search Business..."

                value={search}

                onChange={(e) => handleSearch(e.target.value)}

                className="search-box"

            />
        

            <div className="filter-row">

                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        handleSearch(search, e.target.value, city);
                    }}
                >
                    <option value="">All Categories</option>
                    <option>Restaurant</option>
                    <option>Cafe</option>
                    <option>Hotel</option>
                    <option>Hospital</option>
                    <option>Clinic</option>
                    <option>Salon</option>
                    <option>Gym</option>
                    <option>School</option>
                    <option>Coaching Institute</option>
                    <option>Medical Store</option>
                    <option>Grocery Store</option>
                    <option>Clothing Store</option>
                    <option>Real Estate</option>
                    <option>Travel Agency</option>
                    <option>Other</option>
                </select>

                <input
                    type="text"
                    placeholder="Filter by City"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        handleSearch(search, category, e.target.value);
                    }}
                />

            </div>


            <div className="business-grid">

                {

                    filteredBusinesses.map((business) => (

                        <div

                            className="business-item"

                            key={business._id}

                        >

                            <img

                                src={business.logo || appLogo}

                                onError={(e) => e.target.src = appLogo}

                                alt="logo"

                            />

                            <div>

                                <h3>

                                    {business.businessName}

                                </h3>

                                <p>

                                    {business.category}

                                </p>

                                <small>

                                    {business.city}, {business.state}

                                </small>

                            </div>

                            <Link

                                to={`/business/${business._id}`}

                                className="view-btn"

                            >

                                View

                            </Link>

                        </div>

                    ))

                }

            </div>

        </div>
</>
    );

}

export default ExploreBusiness;