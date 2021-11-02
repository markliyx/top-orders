import axios from 'axios';

const baseApiUrl = "http://localhost:3001/orders";

export const getOrders = () => {
    return axios.get(baseApiUrl).then(response => response.data);
}