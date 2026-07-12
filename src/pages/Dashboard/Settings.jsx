import "./Settings.css";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {AuthContext} from "../../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../../Services/userService";
import { uploadImage } from "../../Services/uploadService";
import { sendContactMessage } from "../../Services/contactService";
import { changePassword } from "../../Services/authService";
import { ClipLoader } from "react-spinners";
import {Helmet} from "react-helmet-async"

export default function Settings() {

  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    bio: "",
    photo: "",
});
    const [loading, setLoading] = useState(false);
    const [msgLoading, setMsgLoading] = useState(false);

const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
});

const [photoFile, setPhotoFile] = useState(null);

const [contactData, setContactData] = useState({
    name: formData.name,
    email: formData.email,
    requestType: "General Query",
    subject: "",
    message: "",
});

useEffect(() => {

    if (user?.uid) {

        loadProfile();

    }

}, [user]);


const loadProfile = async () => {

    try {

        const res = await getUserProfile(user.uid);

        setFormData({
            name: res.user.name || "",
            email: res.user.email || "",
            mobile: res.user.mobile || "",
            location: res.user.location || "",
            bio: res.user.bio || "",
            photo: res.user.photo || "",
        });

    } catch (error) {

        toast.error("Unable to load profile.");

    }

};

useEffect(() => {

    setContactData(prev => ({
        ...prev,
        name: formData.name,
        email: formData.email,
    }));

}, [formData.name, formData.email]);

const handleContactChange = (e) => {

    setContactData({

        ...contactData,

        [e.target.name]: e.target.value,

    });

};

const handleContactSubmit = async () => {

    if (!contactData.subject.trim())
        return toast.error("Subject is required.");

    if (!contactData.message.trim())
        return toast.error("Message is required.");

    setMsgLoading(true);
    const toastId = toast.loading("Sending your message...");

    try {

        await sendContactMessage({

                userId: user.uid,

                ...contactData,

            });

        toast.success("Message sent successfully.", {
            id: toastId,
        });

        setContactData(prev => ({
            ...prev,
            subject: "",
            message: "",
            requestType: "General Query",
        }));

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Unable to send message.",
            {
                id: toastId,
            }
        );

    }finally{setMsgLoading(false)}

};

const handlePasswordChange = (e) => {

    setPasswordData({

        ...passwordData,

        [e.target.name]: e.target.value,

    });

};

const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));

};


const handleSubmit = async () => {


        let photo = formData.photo;

        if (photoFile) {

            toast.loading("Uploading Photo...", { id: "photo" });

            photo = await uploadImage(photoFile);

            toast.success("Photo Uploaded", { id: "photo" });

        }



    try {
       await updateUserProfile(user.uid, {

          name: formData.name,

          mobile: formData.mobile,

          location: formData.location,

          bio: formData.bio,

          photo,

      });

        toast.success("Profile Updated Successfully");

    } catch (error) {

        toast.error(error.response?.data?.message || "Update Failed");

    }

};

const handleUpdatePassword = async () => {

    if (!passwordData.currentPassword)
        return toast.error("Enter current password");

    if (!passwordData.newPassword)
        return toast.error("Enter new password");

    if (passwordData.newPassword.length < 6)
        return toast.error("Password must be at least 6 characters");

    if (
        passwordData.newPassword !==
        passwordData.confirmPassword
    )
        return toast.error("Passwords do not match");

        setLoading(true);

    try {

        await changePassword(
            passwordData.currentPassword,
            passwordData.newPassword
        );

        toast.success("Password Updated Successfully");

        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

    } catch (error) {

        toast.error(error.message);

    }finally{
        setLoading(false);
    }

};

    return (
<>
        <Helmet>
            <title>Settings | Localio</title>
        </Helmet>

        <div className="settings-page">

            <div className="settings-container">

                <h2>Account Settings</h2>
                <p className="settings-subtitle">
                    Manage your profile and account settings.
                </p>

                {/* Profile Section */}

                <div className="settings-card">

                    <h3>Profile Information</h3>

                    <div className="profile-image-section">

                      <img
                            src={
                                photoFile
                                    ? URL.createObjectURL(photoFile)
                                    : formData.photo || "https://placehold.co/120x120"
                            }
                            alt="Profile"
                            className="profile-image"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            id="profilePhoto"
                            hidden
                            onChange={(e) => setPhotoFile(e.target.files[0])}
                        />

                        <label
                            htmlFor="profilePhoto"
                            className="upload-btn"
                        >
                            Change Photo
                        </label>

                    </div>

                    <div className="form-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            disabled
                            value={formData.email}
                        />

                    </div>

                    <div className="form-group">

                        <label>Mobile Number</label>

                        <input
                            type="text"
                            name="mobile"
                            placeholder="Enter mobile number"
                            value={formData.mobile}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            placeholder="City, State"
                            value={formData.location}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Bio</label>

                        <textarea
                            rows="4"
                            name="bio"
                            placeholder="Tell something about yourself..."
                            value={FormData.bio}
                            onChange={handleChange}
                        ></textarea>

                    </div>

                    <button className="save-btn" onClick={handleSubmit}>

                        Save Changes

                    </button>

                </div>

                {/* Security */}

               <div className="settings-card">

    <h3>Security</h3>

    <div className="form-group">

        <label>Current Password</label>

        <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
        />

    </div>

    <div className="form-group">

        <label>New Password</label>

        <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
        />

    </div>

    <div className="form-group">

        <label>Confirm Password</label>

        <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
        />

    </div>

    <button
        className="password-btn"
        onClick={handleUpdatePassword}
        disabled={loading}
    >
        {
            loading ? (
                <>
                    <ClipLoader
                        size={18}
                        color="#fff"
                    />
                    <span>Please wait...</span>
                </>
            ) : ("Update Password")
        }
        

    </button>

</div>

            <div className="settings-card contact-card">

                <div className="card-header">

                    <h3>📩 Help & Support</h3>

                    <p>
                        Need assistance? Send us your query and we'll get back to you.
                    </p>

                </div>

                <div className="contact-grid">

                    <div className="form-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            value={contactData.name}
                            onChange={handleContactChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={contactData.email}
                            onChange={handleContactChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Request Type</label>

                        <select
                            name="requestType"
                            value={contactData.requestType}
                            onChange={handleContactChange}
                        >

                            <option>General Query</option>
                            <option>Feature Request</option>
                            <option>Bug Report</option>
                            <option>Business Verification</option>
                            <option>Delete Account</option>
                            <option>Report Business</option>
                            <option>Other</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Subject</label>

                        <input
                            type="text"
                            name="subject"
                            value={contactData.subject}
                            onChange={handleContactChange}
                            placeholder="Enter subject"
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label>Message</label>

                    <textarea
                        rows="5"
                        name="message"
                        value={contactData.message}
                        onChange={handleContactChange}
                        placeholder="Describe your issue..."
                    />

                </div>

                <div className="contact-footer">

                    <button
                        className="save-btn"
                        onClick={handleContactSubmit}
                        disabled={msgLoading}
                    >
                        {
                            msgLoading ? (
                                <>
                                    <ClipLoader
                                        size={18}
                                        color="#fff"
                                    />
                                    <span>Sending...</span>
                                </>
                            ) : ("Send Message")
                        }
                        
                    </button>

                </div>

            </div>

            </div>

        </div>
</>
    );

}