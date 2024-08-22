import api from '@/utils/api'

export const createAccount = async (newAccount) => {
    try{
        const response = await api.post(`/accounts`, newAccount)
        return response.data;
    }
    catch (error) {
        console.error("Call API Error: ", error);
        throw error;
    }
}

export const sigin = async (account) => {
    try{
        const response = await api.post(`/accounts/sigin`, account)
        return response.data;
    }
    catch (error) {
        console.error("Call API Error: ", error);
        throw error;
    }
}


export const deleteAccount = async (id) => {
    try{
        const response = await api.delete(`/accounts/${id}`);
        return response.data;
    }
    catch (error) {
        console.error("Call API Error: ", error);
        throw error;
    }
}



export const getAccountOfEmployees = async () => {
    try{
        const response = await api.get(`/accounts/employees/fix`);
        return response.data;
    }
    catch (error) {
        console.error("Call API Error: ", error);
        throw error;
    }
}

export const updateAccount = async (id, account) => {
    try{
        const response = await api.put(`/accounts/${id}`, account);
        return response.data;
    }
    catch (error) {
        console.error("Call API Error: ", error);
        throw error;
    }
}