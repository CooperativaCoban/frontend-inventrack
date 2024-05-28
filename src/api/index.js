import axios from "axios";

const apiURL = 'http://localhost:8080'
export const apiSystem = axios.create({
    baseURL: `${apiURL}/api`
})