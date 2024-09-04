import axios from 'axios';

const API_URL = 'https://localhost:3000/api';

export const submitResults = async (questionType, results, jwtToken) => {
  try {
    await axios.post(`${API_URL}/results`, {
      questionType,
      results,
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    console.log('Results submitted successfully');
  } catch (e) {
    console.error('Error submitting results:', e);
  }
};
export const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};
