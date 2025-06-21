import axios from "axios";
import { API_HOST_URL } from "../_constants/apiHost";

export const useAxios = () => {
    const instance = axios.create({
        baseURL : API_HOST_URL,
        timeout : 5000
    });
    return instance;
}