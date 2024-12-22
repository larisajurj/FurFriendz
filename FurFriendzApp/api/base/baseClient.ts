import axios from "axios"
import Constants from "expo-constants";


const uri = "https://furfriendzapi20241119180440.azurewebsites.net";


const defaultHeaders = {
    "Content-Type" :"application/json"
};

export const BaseClient = axios.create({
    baseURL:uri + "/api/",
    headers: defaultHeaders,
});