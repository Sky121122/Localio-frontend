import "./AddBusiness.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";
import toast from "react-hot-toast";
import { addBusiness, getBusinessById, updateBusiness } from "../../Services/businessService";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImage } from "../../Services/uploadService";
import { Helmet } from "react-helmet-async";
import { ClipLoader } from "react-spinners";


function AddBusiness() {

 const [formData, setFormData] = useState({
    businessName: "",
    businessTagline: "",
    ownerName: "",
    category: "",
    businessType: "",

    phone: "",
    whatsapp: "",
    email: "",
    website: "",

    gstNumber: "",

    address: "",
    city: "",
    state: "",
    pincode: "",

    openingTime: "",
    closingTime: "",

    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",

    description: "",

    logo: null,
    banner: null,
});

    const [loading, setLoading] = useState(false);

const [logoFile, setLogoFile] = useState(null);
const [bannerFile, setBannerFile] = useState(null);

const { id } = useParams();
const {user} = useContext(AuthContext);
const navigate = useNavigate();

useEffect(() => {
    if (id) {
        loadBusiness();
    }
}, [id]);

const loadBusiness = async () => {
    try {
        const res = await getBusinessById(id);
        setFormData(res.business);
    } catch (error) {
        toast.error("Unable to load business");
    }
};

// --------- handle change button ----------- 

    const handleChange = (e) => {

            setFormData({
                ...formData,
                  [e.target.name]: e.target.value
            });

        };

// ------- handle submit button --------- 

  const handleSubmit = async (e) => {

    e.preventDefault();

    let logo = formData.logo;
    let banner = formData.banner;

   
    // Basic Validation
    if (!formData.businessName.trim())
        return toast.error("Business Name is required.");

    if (!formData.ownerName.trim())
        return toast.error("Owner Name is required.");

    if (!formData.category)
        return toast.error("Please select a category.");

    if (!formData.phone.trim())
        return toast.error("Phone Number is required.");

    if (!formData.email.trim())
        return toast.error("Email is required.");

    if (!formData.address.trim())
        return toast.error("Address is required.");

    if (!formData.city.trim())
        return toast.error("City is required.");

    if (!formData.state.trim())
        return toast.error("State is required.");

    if (!formData.pincode.trim())
        return toast.error("Pincode is required.");

    if (!formData.description.trim())
        return toast.error("Description is required.");

         setLoading(true);

         if (logoFile) {
            toast.loading("Uploading Logo...", { id: "upload" });
            logo = await uploadImage(logoFile);
            toast.success("Logo Uploaded", { id: "upload" });
        }
        if (bannerFile) {
            toast.loading("Uploading Banner...", { id: "banner" });
            banner = await uploadImage(bannerFile);
            toast.success("Banner Uploaded", { id: "banner" });
        }



    try {

        const businessData = {
            ownerId: user.uid,
            ...formData,
            logo,
            banner
        };

    if (id) {

    console.log("Business Data:", businessData);

    await updateBusiness(id, businessData);

    toast.success("Business Updated Successfully");

} else {

    console.log("Business Data:", businessData);

    await addBusiness(businessData);

    toast.success("Business Added Successfully");

}

        navigate("/dashboard");


        setFormData({

            businessName: "",
            businessTagline: "",
            ownerName: "",
            category: "",
            businessType: "",

            phone: "",
            whatsapp: "",
            email: "",
            website: "",

            gstNumber: "",

            address: "",
            city: "",
            state: "",
            pincode: "",

            openingTime: "",
            closingTime: "",

            facebook: "",
            instagram: "",
            linkedin: "",
            youtube: "",

            description: "",

            logo: null,
            banner: null

        });

    } catch (error) {

        toast.error(error.response?.data?.message || "Something went wrong.");

    }finally{
        setLoading(false);
    }

};

    return (
<>
        <Helmet>
            <title>Add Business | Localio</title>t
        </Helmet>
        
        <div className="add-business">

            <div className="page-header">

                <h1>{id ? "Edit Business" : "Add Business"}</h1>

                <p>
                    Register your business and reach thousands of customers.
                </p>

            </div>

            <form
                className="business-form"
                onSubmit={handleSubmit}
            >
            <h3 className="section-title full-width">
                Business Information
            </h3>

                <div className="form-grid">

                    <div className="form-group">

                        <label>Business Name</label>

                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            placeholder="Your Business Name"
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Owner Name</label>

                        <input
                            type="text"
                            name="ownerName"
                            value={formData.ownerName}
                            placeholder="Your Name"
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                            <label>Business Tagline</label>

                            <input
                                type="text"
                                name="businessTagline"
                                value={formData.businessTagline}
                                onChange={handleChange}
                                placeholder="Example : Best Restaurant in Lucknow"
                            />

                        </div>

                        <div className="form-group">

                            <label>GST Number</label>

                            <input
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleChange}
                                placeholder="Optional"
                            />

                        </div>

                        <div className="form-group">

                        <label>Opening Time</label>

                        <input
                            type="time"
                            name="openingTime"
                            value={formData.openingTime}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Closing Time</label>

                        <input
                            type="time"
                            name="closingTime"
                            value={formData.closingTime}
                            onChange={handleChange}
                        />

                    </div>
{/* ============= business catogery ==============  */}
                    <div className="form-group">

                        <label>Category</label>

                        <select
                         name="category"
                         value={formData.category}
                         onChange={handleChange}
                        >

             <option value="">Select Category</option>

                    {/* Food & Dining */}
                    <optgroup label="🍴 Food & Dining----------">
                        <option>Bakery</option>
                        <option>Cafe</option>
                        <option>Fruit & Vegetable Shop</option>
                        <option>Grocery Store</option>
                        <option>Hotel</option>
                        <option>Restaurant</option>
                        <option>Supermarket</option>
                        <option>Sweet Shop</option>
                    </optgroup>

                    {/* Healthcare */}
                    <optgroup label="🏥 Healthcare----------">
                        <option>Clinic</option>
                        <option>Diagnostic Center</option>
                        <option>Hospital</option>
                        <option>Medical Store</option>
                        <option>Veterinary Clinic</option>
                    </optgroup>

                    {/* Beauty & Fitness */}
                    <optgroup label="💇 Beauty & Fitness----------">
                        <option>Beauty Parlour</option>
                        <option>Gym</option>
                        <option>Salon</option>
                        <option>Spa</option>
                        <option>Yoga Center</option>
                    </optgroup>

                    {/* Education */}
                    <optgroup label="🎓 Education----------">
                        <option>Coaching Institute</option>
                        <option>College</option>
                        <option>Library</option>
                        <option>School</option>
                    </optgroup>

                    {/* Automotive */}
                    <optgroup label="🚗 Automotive----------">
                        <option>Automobile Service</option>
                        <option>Bike Service Center</option>
                        <option>Car Rental</option>
                        <option>Car Service Center</option>
                    </optgroup>

                    {/* Repair & Maintenance */}
                    <optgroup label="🛠 Repair & Maintenance----------">
                        <option>Electronics Repair</option>
                        <option>Laptop Repair</option>
                        <option>Mobile Repair</option>
                        <option>Repair Shop</option>
                    </optgroup>

                    {/* Shopping */}
                    <optgroup label="🛍 Shopping----------">
                        <option>Book Store</option>
                        <option>Clothing Store</option>
                        <option>Electrical Shop</option>
                        <option>Footwear Store</option>
                        <option>Furniture Store</option>
                        <option>Gift Shop</option>
                        <option>Hardware Store</option>
                        <option>Jewellery Shop</option>
                        <option>Paint Store</option>
                    </optgroup>

                    {/* Home & Property */}
                    <optgroup label="🏠 Home & Property----------">
                        <option>Construction</option>
                        <option>Home Cleaning</option>
                        <option>Interior Designer</option>
                        <option>Pest Control</option>
                        <option>Real Estate</option>
                    </optgroup>

                    {/* Travel & Transport */}
                    <optgroup label="✈️ Travel & Transport----------">
                        <option>Taxi Service</option>
                        <option>Tour Operator</option>
                        <option>Travel Agency</option>
                    </optgroup>

                    {/* Business & Finance */}
                    <optgroup label="💼 Business & Finance----------">
                        <option>ATM</option>
                        <option>Bank</option>
                        <option>Chartered Accountant</option>
                        <option>Consultant</option>
                        <option>Courier Service</option>
                        <option>Insurance Agency</option>
                        <option>Lawyer</option>
                        <option>Printing Press</option>
                    </optgroup>

                    {/* Events & Media */}
                    <optgroup label="🎉 Events & Media----------">
                        <option>Event Planner</option>
                        <option>Photography</option>
                        <option>Wedding Planner</option>
                    </optgroup>

                    {/* Others */}
                    <optgroup label="🐾 Others----------">
                        <option>Laundry</option>
                        <option>Pet Shop</option>
                        <option>Other</option>
                    </optgroup>

                     </select>

                    </div>


                     <div className="form-group">

                         <label>Business Type</label>

                        <select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                        >

                            <option value="">Select Type</option>

                            <option>Proprietorship</option>
                            <option>Partnership</option>
                            <option>Private Limited</option>
                            <option>Public Limited</option>
                            <option>LLP</option>
                            <option>Startup</option>
                            <option>Freelancer</option>

                        </select>

                    </div>

                    <h3 className="section-title full-width">
                            Contact Information
                        </h3>
              <div className="form-group">

      
                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            placeholder="Your Mobile No."
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>WhatsApp</label>

                        <input
                            type="text"
                            name="whatsapp"
                            value={formData.whatsapp}
                            placeholder="Your Whatsapp No."
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Your Email"
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Website</label>

                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            placeholder="Your Website Url"
                            onChange={handleChange}
                        />

                    </div>

                    <h3 className="section-title full-width ">
                            Address Details
                        </h3>

                    <div className="form-group full-width">

                        <label>Address</label>

                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            placeholder="Your Shop Address"
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>City</label>

                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            placeholder="Your City Name"
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>State</label>

                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            placeholder="Your State"
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Pincode</label>

                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            placeholder="Your Address Pincode"
                            onChange={handleChange}
                        />

                    </div>
                    <h3 className="section-title full-width">
                        Business Description
                    </h3>
                    <div className="form-group full-width">

                        <label>Description</label>

                        <textarea
                            rows="5"
                            name="description"
                            value={formData.description}
                            placeholder="About Your Business"
                            onChange={handleChange}
                        />

                    </div>


            <div className="full-width">

                <h3 className="section-title">

                    Social Media Links

                </h3>

            </div>
            <div className="form-group">

                <label>Facebook</label>

                <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
                />

            </div>

                <div className="form-group">

                    <label>Instagram</label>

                    <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="https://instagram.com/..."
                    />

                </div>

                <div className="form-group">

                    <label>LinkedIn</label>

                    <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/..."
                    />

                </div>

                <div className="form-group">

                    <label>YouTube</label>

                    <input
                        type="text"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleChange}
                        placeholder="https://youtube.com/..."
                    />

                </div>


                    <div className="form-group">
                                        <label>Business Logo</label>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setLogoFile(e.target.files[0])}
                                        />

                                        {logoFile && (
                                            <img
                                                src={URL.createObjectURL(logoFile)}
                                                alt="Logo Preview"
                                                className="image-preview"
                                            />
                                        )}
                                    </div>

                    <div className="form-group">
                        <label>Business Banner</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setBannerFile(e.target.files[0])}
                        />

                        {bannerFile && (
                            <img
                                src={URL.createObjectURL(bannerFile)}
                                alt="Banner Preview"
                                className="banner-preview"
                            />
                        )}
                    </div>

                </div>

                <button
                    className="save-btn"
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading ? (
                            <>
                                <ClipLoader 
                                    size={18}
                                    color="#fff"
                                />
                                <span>Saving...</span>
                            </>
                        ):( id ? "Update Business" : "Save Business")
                    }
                   
                </button>

            </form>

        </div>
</>
    );

}

export default AddBusiness;