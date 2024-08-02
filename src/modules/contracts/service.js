import api from "@/utils/api";

export const getAllRegistrationForm = async () => {
    try{
        const response = await api.get('/contracts/registrationForms');
        return response.data;
    }
    catch(error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const updatePowerMeterOfContract = async (contractId, updatePowerMeterRequest) => {
    try{
        const response = await api.put(`/contracts/${contractId}/power-meter`, updatePowerMeterRequest);
        return response.data;
    }
    catch(error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getAllContracts = async () => {
    try{
        const response = await api.get('/contracts');
        return response.data;
    }
    catch(error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const terminateContract = async (contractId) => {
    try{
        const response = await api.put(`/contracts/${contractId}/terminate`);
        return response.data;
    }
    catch(error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const updateProcessingEmployeeOfContract = async (contractId, employeeId) => {
    try{
        const response = await api.put(`/contracts/${contractId}/employee/${employeeId}`);
        return response.data;
    }
    catch(error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const rejectContract = async (contractId, employeeId) => {
    try{
        const response = await api.put(`/contracts/${contractId}/reject/${employeeId}`);
        return response.data;
    }
    catch(error){
        console.error('Call API Error:', error);
        throw error;
    }
}