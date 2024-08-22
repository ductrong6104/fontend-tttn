import api from "@/utils/api"
export const getAllElectricTypes = async () => {
    try {
        const response = await api.get('/electric-types');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const deleteElectricType = async (id) => {
    try {
        const response = await api.delete(`/electric-types/${id}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const createElectricType = async (electricType) => {
    try {
        const response = await api.post('/electric-types', electricType);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}
export const updateElectricType = async (electricTypeId, electricType) => {
    try {
        const response = await api.put(`/electric-types/${electricTypeId}`, electricType);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}