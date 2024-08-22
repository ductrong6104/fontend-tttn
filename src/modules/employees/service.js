import api from "@/utils/api"
export const getAllEmployees = async () => {
    try {
        const response = await api.get(`/employees`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};


export const createEmployee = async (newEmployee) => {
    try {
        const response = await api.post(`/employees`, newEmployee);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
export const getRecordableEmployees = async () => {
    try {
        const response = await api.get('/employees/recordable');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

// debounce không nên được sử dụng trực tiếp trên hàm async khi export ra vì nó có thể gây ra lỗi khi sử dụng.
export const checkEmailExists = async (updateEmailRequest) => {
    try {
      const response = await api.post(`/employees/check-email`, updateEmailRequest);
      return response.data;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  } 
  
export const checkPhoneExists = async (phone) => {
    try {
      const response = await api.get(`/employees/check-phone?phone=${phone}`);
      return response.data;
    } catch (error) {
      console.error('Error checking phone:', error);
      throw error;
    }
  } 
  
export const checkIdentityCardExists = async (identityCard) => {
    try {
      const response = await api.get(`/employees/check-identityCard?identityCard=${identityCard}`);
      return response.data;
    } catch (error) {
      console.error('Error checking identityCard:', error);
      throw error;
    }
  } 

  export const updateEmployee = async (updateEmployee) => {
    try {
      const response = await api.put(`/employees/${updateEmployee.id}`, updateEmployee);
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  }