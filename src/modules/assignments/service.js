import api from "@/utils/api";

/**
 * L y danh s ch ghi  n i n l i gi n cho nh n vi n
 * @returns {Promise<Array<ElectricRecording>>}
 */

export const getAssignments = async () => {
    try {
        const response = await api.get('/assignments/assigned');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const createAssignment = async (newAssignment) => {
    try {
        const response = await api.post('/assignments', newAssignment);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const updateAssignment = async (assignmentId, updateAssignment) => {
    try {
        const response = await api.put(`/assignments/${assignmentId}`, updateAssignment);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}