import api from "@/utils/api";
export const getAvailablePowerMeters = async () => {
    try {
        const response = await api.get('/power-meters/available');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const updateStatusPowerMeter = async (powerMeterId, updateStatusRequest) => {
    try {
        const response = await api.put(`/power-meters/${powerMeterId}/status`, updateStatusRequest);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getAllPowerMeters = async () => {
    try {
        const response = await api.get('/power-meters');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const createNewPowerMeter = async (newPowerMeterRequest) => {
    try {
        const response = await api.post('/power-meters', newPowerMeterRequest);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}
export const getRecordablePowerMeters = async () => {
    try {
        const response = await api.get('/power-meters/recordable');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}