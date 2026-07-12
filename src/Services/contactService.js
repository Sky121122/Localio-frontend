import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/contact`

export const sendContactMessage = async (data) => {

    const res = await axios.post(API, data);

    return res.data;

};