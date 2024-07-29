import api from "@/utils/api";
export const getAllElectricRecordings = async () => {
    try {   
        const response = await api.get('/electric-recordings');
        return response.data;
    } catch (error) {    
        console.error('Call API Error:', error);
        throw error;
    }
}

export const createElectricRecording = async (newElectricRecordingRequest) => {
    try {
        const response = await api.post('/electric-recordings', newElectricRecordingRequest);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}