import axios from "axios";

export const useAxios = () => {
    const instance = axios.create({
        timeout : 5000
    });
    return instance;
}