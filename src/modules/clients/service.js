import api from '@/utils/api'
export const getAllClient = async () => {
    try {
        const response = await api.get('/clients');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}