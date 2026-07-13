import axios  from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/api/businesses`;

export const addBusiness = async (businessData) => {
    const res = await axios.post(API, businessData);
    return res.data;
};

export const getMyBusinesses = async (ownerID) =>{
        const res = await axios.get(`${API}/my/${ownerID}`);
        return res.data;
};

export const getAllBusinesses  = async () =>{
    const res = await axios.get(API);
    return res.data; 
};

export const getBusinessById = async (id) => {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
};


export const updateBusiness = async (id, data) => {
    const response = await axios.put(`${API}/${id}`, data);
    return response.data;
};


export const deleteBusiness = async (id) => {
    const response = await axios.delete(`${API}/${id}`);
    return response.data;
};

export const searchBusinesses = async (q, category = "", city = "") => {

    const res = await axios.get(
        `${API}/search?q=${q}&category=${category}&city=${city}`
    );

    return res.data;
};