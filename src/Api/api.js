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
export const register = async (userData) => {
   try {
    console.log("Sending login request...");
    
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log("Response received:", response);

    if (response.status === 201 ) {
      return { success: true};
    } else {
      return { success: false, error: 'Something went wrong' };
    }
  } catch (error) {
    console.error('Error during register:', error.response ? error.response.data : error.message);
    return { success: false, error: error.response ? error.response.data.error : error.message };
  }
};




export const login = async (userData) => {
  try {
    console.log("Sending login request...");
    
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log("Response received:", response);
    console.log(response.status,response.data.token)
    if (response.status==202 && response.data.token){
      localStorage.setItem('Token', `Bearer ${response.data.token}`);
      return {success:"selectrole"}
    }
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
export const Role = async (userData) => {
  try {
    console.log("Sending role request...", userData.role);

    const jwtToken = localStorage.getItem("Token");
    console.log("JWT Token:", jwtToken);

    const response = await axios.post(
      `${API_URL}/selectrole`,
      { role: userData.role }, 
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    );

    console.log("Response received:", response);

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: 'Something went wrong' };
    }
  } catch (error) {
    console.error(
      'Error during role selection:',
      error.response ? error.response.data : error.message
    );

    return {
      success: false,
      error: error.response ? error.response.data.error : error.message,
    };
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