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
export const getAssignedElectricRecordings = async () => {
    try {
        const response = await api.get('/electric-recordings/assigned');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}
export const getAssignedElectricRecordingsByEmployeeId = async (employeeId) => {
    try {   
        const response = await api.get(`/electric-recordings/assigned/${employeeId}`);
        return response.data;           
    } catch (error) {    
        console.error('Call API Error:', error);
        throw error;
    }
}

export const updateElectricRecordingFirst = async (electricRecordingUpdateRequest) => {
    try {
        const response = await api.put(`/electric-recordings`,electricRecordingUpdateRequest);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const updateElectricRecording = async (electricRecordingId, electricRecordingUpdateRequest) => {
    try {
        const response = await api.put(`/electric-recordings/${electricRecordingId}`,electricRecordingUpdateRequest);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const deleteElectricRecording = async (electricRecordingId) => {
    try {
        const response = await api.delete(`/electric-recordings/${electricRecordingId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const updateElectricRecordingByEmployee = async (electricRecordingId, electricRecordingUpdateRequest) => {
    try {
        const response = await api.put(`/electric-recordings/${electricRecordingId}/employee`,electricRecordingUpdateRequest);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const deleteRecordingByEmployee = async (electricRecordingId) => {
    try {
        const response = await api.delete(`/electric-recordings/employee/${electricRecordingId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getShortestPath = async (employeeId, locationCurrent) => {
    try {
        const response = await api.post(`/electric-recordings/assigned/${employeeId}/shortest`, locationCurrent);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
  };
export const getRecordingHistoryByEmployee = async (employeeId) => {
    try {
        const response = await api.get(`/electric-recordings/recording-history/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
  };

  export const createAutomationAssignment = async (automationDatas) => {
    try {
        const response = await api.post(`/electric-recordings/automation-assignment`, automationDatas);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
  }

  export const createAutomationAssignmentOneEmployee = async (automationDatas) => {
    try {
        const response = await api.post(`/electric-recordings/automation-assignment-one-employee`, automationDatas);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
  }

  export const getRecordingHistoryByPowerMeter = async (powerMeterId) => {
    try {
        const response = await api.get(`/electric-recordings/recording-history/powerMeter/${powerMeterId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
  }
 