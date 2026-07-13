import axios from "axios";
import API_URL from "../config/api";


const Api = `${API_URL}/api/upload`;

export const uploadImage = async(file)=>{
    const formData = new FormData();

    formData.append("image", file);

    const res = await axios.post(Api, formData, {
        headers:{
            "Content-Type":"multipart/form-data",
        },

    });

    return res.data.imageUrl;
};