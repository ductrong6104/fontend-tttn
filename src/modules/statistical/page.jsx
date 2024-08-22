import api from '@/utils/api'
export const getConsumptionElectricTypes = async () => {
    try{
        const res = await api.get('/statisticals/consumption-electric-types/fix');
        return res.data;
    }
    catch(err){
        console.error(err);
    }
}

export const getConsumptionByYear = async (consumptionByYear) => {
    try{
        const res = await api.post('/statisticals/consumption-by-year', consumptionByYear);
        return res.data;
    }
    catch(err){
        console.error(err);
    }
}

export const getRevenueByYear = async (revenueByYear) => {
    try{
        const res = await api.post('/statisticals/revenue-by-year', revenueByYear);
        return res.data;
    }
    catch(err){
        console.error(err);
    }
}