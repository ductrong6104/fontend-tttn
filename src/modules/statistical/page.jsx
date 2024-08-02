import api from '@/utils/api'
export const getConsumptionElectricTypes = async () => {
    try{
        const res = await api.get('/statisticals/consumption-electric-types');
        return res.data;
    }
    catch(err){
        console.error(err);
    }
}