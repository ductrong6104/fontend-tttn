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