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
    console.log("Sending role request...", userData.roles);

    const jwtToken = localStorage.getItem("Token");
    console.log("JWT Token:", jwtToken);

    const response = await axios.post(
      `${API_URL}/selectrole`,
      { role: userData.roles }, 
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

export const createClass = async (classData) => {
  try {
    const token = localStorage.getItem("Token");
    console.log(classData)
      const response = await axios.post(`${API_URL}/class/create`, {Name:classData.name}, {
          headers: {
              Authorization: `${token}`
          }
      });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.error || 'An error occurred while creating the class');
  }
};
export const GetClasses = async () => {
  try {
    const token = localStorage.getItem("Token");
      const response = await axios.get(`${API_URL}/class/get`,{
          headers: {
              Authorization: `${token}`
          }
      });
      console.log("response",response)
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.error || 'An error occurred while getting the class');
  }
};
export const fetchParticularClass = async (classID) => {
  try {
    const response = await axios.get(`${API_URL}/class/${classID}`, {
      headers: {
        Authorization: `${localStorage.getItem('Token')}`, 
      },
    });

    if (response.status!=200) {
      throw new Error('Failed to fetch class data');
    }

    const data = response
    return data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'An error occurred while getting the class');

  }
};
export const JoinClassApi = async (classID) => {
  try {
    if (!classID) {
      throw new Error('Class ID is required to join a class.');
    }
    let token=localStorage.getItem('Token')
    const response = await axios.post(`${API_URL}/class/join`, {Token:classID}, {
      headers: {
        Authorization: `${token}`
      }
  });

    if (response.status !== 200) {
      throw new Error('Failed to join class');
    }

    return true
  }catch (error) {
    const errorMessage = error.response?.data?.error || "An error occurred while joining the class. Please try again.";
    console.log(errorMessage);
    return errorMessage;
}
};
export const CreateExamApi = async (Data) => {
  try {
    if (!Data.Title || !Data.Description || !Data.ClassID || !Data.EndOfTheStart || !Data.DurationOfExam) {
      throw new Error('All fields are required to create an exam.');
    }

    let token = localStorage.getItem('Token');
    Data.ClassID *= 1; 
    Data.DurationOfExam*=1
    console.log(Data);

    const response = await axios.post(`${API_URL}/exam/create`, Data, {
      headers: {
        Authorization: `${token}`
      }
    });
    console.log(response)

    if (response.status !== 200) {
      throw new Error('Failed to create exam');
    }

    return true; 
  } catch (error) {
    console.log(error)
    const errorMessage = error.response?.data?.error || "An error occurred while creating the exam. Please try again.";
    return errorMessage;
  }
};
export const FetchAllExamsApi = async () => {
  try {
    const token = localStorage.getItem('Token');
    
    const response = await axios.get(`${API_URL}/exam/getAll`, {
      headers: {
        Authorization: `${token}`
      }
    });
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch exams');
    }
    
    return response.data;
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.error || "An error occurred while fetching exams. Please try again.";
    return { error: errorMessage };
  }
};
export const fetchProblems = async () => {
  try {
    const token = localStorage.getItem('Token');
    
    const response = await axios.get(`${API_URL}/problems/get`, {
      headers: {
        Authorization: `${token}`
      }
    });    return response.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error; 
  }
};

export const getProblems = async (examID) => {
  const token = localStorage.getItem('Token');
  try {
    const response = await axios.get(`${API_URL}/problems/get?examID=${examID}`, {
      headers: {
        Authorization: `${token}`
      }
    });    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editProblemInExam = async (examID, problemID, action) => {
  const token = localStorage.getItem('Token');
  try {
    const response = await axios.post(`${API_URL}/problems/edit`, {
      examID,
      problemID,
      action,    
    }, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const MyExamsApi = async () => {
  const token = localStorage.getItem('Token');
  try {
    const response = await axios.get(`${API_URL}/exam/get`, {
      headers: {
        Authorization: `${token}`
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
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