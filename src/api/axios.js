import axios from "axios";


const URL = 'http://localhost:4040'

export default  axios.create({
    baseURL: URL,
});

export const axiosPrivate =  axios.create({
    baseURL: URL,
})