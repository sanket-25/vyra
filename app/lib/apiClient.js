import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://volt-backend.vercel.app', // Set your Flask API base URL in .env
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendOTP = (contact) => apiClient.post('/api/send-otp', { contact });
export const resendOTP = (contact) => apiClient.post('/api/resend-otp', { contact });
export const verifyOTP = (contact, otp) => apiClient.post('/api/verify-otp', { contact, otp });
export const registerUser = (data) => apiClient.post('/api/register', data);
export const checkUsername = (username) => apiClient.get(`/api/check-username?username=${username}`);

export default apiClient;
