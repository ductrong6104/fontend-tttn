import api from "@/utils/api"
export const getAllLevels = async () => {
    try {
        const response = await api.get('/levels');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const createLevel = async (level) => {
    try {
        const response = await api.post('/levels', level);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }

}
export const deleteLevelById = async (id) => {
    try {
        const response = await api.delete(`/levels/${id}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}
export const getLevelNotUseByElectricTypeId = async (electricTypeId) => {
    try {
        const response = await api.get(`/levels/not-use/electric-type/${electricTypeId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const updateLevel = async (levelId, level) => {
    try{
        const response = await api.put(`/levels/${levelId}`, level);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }

}