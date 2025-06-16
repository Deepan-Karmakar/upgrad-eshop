import axios from 'axios';

// IMPORTANT: You will get this token from Postman later and paste it here.
const TOKEN = "YOUR_COPIED_TOKEN_HERE";

const apiClient = axios.create({
  baseURL: 'https://dev-project-ecommerce.upgrad.dev/api', // Sets the base URL for all requests
});

// This part automatically adds your token to every API request (except login/signup)
apiClient.interceptors.request.use(
  config => {
    // Do not attach token to login or signup requests
    if (config.url !== '/auth/signin' && config.url !== '/auth/signup') {
      config.headers['x-auth-token'] = TOKEN;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;