import axios from "axios";
import API_URL from "../config/api";


const API = `${API_URL}/users`;


export const saveUser = async (userData) =>{
    const res = await axios.post(API, userData);
    return await res.data;
};


export const getUserProfile = async (firebaseUID) => {
    const res = await axios.get(`${API}/${firebaseUID}`);
    return res.data;
};

export const updateUserProfile = async (firebaseUID, data) => {
    const res = await axios.put(`${API}/${firebaseUID}`, data);
    return res.data;
};