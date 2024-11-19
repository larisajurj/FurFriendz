import axios from "axios"

const defaultHeaders = {
    "Content-Type" :"application/json"
};

export const BaseClient = axios.create({
    baseURL:"https://localhost:44340/api/",
    headers: defaultHeaders,
});