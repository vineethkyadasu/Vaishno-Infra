
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;
console.log('API_URL for Auth:', API_URL);

export const login = async (email, password) => {
    console.log('Attempting login to:', `${API_URL}/login`);
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const authHeader = () => {
    const user = getCurrentUser();
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
};
