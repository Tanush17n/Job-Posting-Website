import axios from 'axios';

const BASE_URL = 'https://intershipbackend-vok7.onrender.com/api';

// Create an axios instance with default config
const api = axios.create({
    baseURL: BASE_URL
});

// Add a request interceptor to add the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Applications
export const getUserApplications = async () => {
    try {
        const response = await api.get('/application');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching applications' };
    }
};

// Jobs
export const getJobs = async () => {
    try {
        const response = await api.get('/job');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching jobs' };
    }
};

// Internships
export const getInternships = async () => {
    try {
        const response = await api.get('/internship');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching internships' };
    }
};

export default api;
