import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

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




export const login = async (userData) => {
  try {
    console.log("Sending login request...");
    
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log("Response received:", response);

    if (response.status === 200 && response.data.token) {
      localStorage.setItem('Token', `Bearer ${response.data.token}`);
      console.log('Login successful');
      return { success: true, token: response.data.token };
    } else {
      console.log('No token received or invalid status');
      return { success: false, error: 'No token received or invalid status' };
    }
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    return { success: false, error: error.response ? error.response.data.error : error.message };
  }
};

// export const CheckAuth=async()=>{
//   try {
//     const response=await axios.get(`${API_URL}/checkauth`)
   
//     if(response.status!==200&&response.data && response.data.Message==="Token is valid"){
//       return true
//     }
//     return false
//   } catch (error) {
//     console.error('Error during authentication check:', error);
//     return false;
//   }
// }