import api from "@/utils/api"
export const getAllElectricityPrices = async () => {
    try {
        const response = await api.get('/electricity-prices');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const createElectricityPrice = async (data) => {
    try {
        const response = await api.post('/electricity-prices', data);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const deleteElectricityPrice = async (data) => {
    try {

        const response = await api.delete(`/electricity-prices`, data);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}