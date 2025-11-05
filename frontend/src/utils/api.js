import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
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

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Activity APIs
export const activityAPI = {
  addActivity: (activityData) => api.post('/activities', activityData),
  getActivities: () => api.get('/activities'),
  getActivitiesByRange: (startDate, endDate) => 
    api.get(`/activities/range?startDate=${startDate}&endDate=${endDate}`),
  getDailySummary: () => api.get('/activities/daily'),
  getWeeklySummary: () => api.get('/activities/weekly'),
  deleteActivity: (id) => api.delete(`/activities/${id}`),
};

// Challenge APIs
export const challengeAPI = {
  getChallenges: () => api.get('/challenges'),
  startChallenge: (challengeId) => api.post('/challenges/start', { challengeId }),
  getUserChallenges: () => api.get('/challenges/user'),
  getCompletedChallenges: () => api.get('/challenges/completed'),
  updateProgress: (id, progress) => api.put(`/challenges/${id}/progress`, { progress }),
  completeChallenge: (id) => api.put(`/challenges/${id}/complete`),
};

export default api;