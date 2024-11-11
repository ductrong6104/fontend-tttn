

import axios from "axios";


const baseURL = process.env.NEXT_PUBLIC_ELECTRICITY
// ? '' :"http://localhost:8080";
console.log(baseURL)
const instance = axios.create({ baseURL: baseURL, timeout: 500000, headers: { 'Content-Type': 'application/json' } });



export default instance;