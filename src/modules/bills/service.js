import api from "@/utils/api"
export const getTotalAmountByElectricRecordingId = async (electricRecordingId) => {
    try {
        const response = await api.post(`/bills/calculate-total-amount`, electricRecordingId);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const createNewBill = async (newBill) => {
    try {
        const response = await api.post(`/bills`, newBill);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getAllBills = async () => {
    try {
        const response = await api.get(`/bills`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}