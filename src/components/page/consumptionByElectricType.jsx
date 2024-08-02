// components/ConsumptionByCustomerType.js


import { useEffect, useState } from 'react';
import BarChartComponent from '../chart/barChart';

import { getConsumptionElectricTypes } from '@/modules/statistical/page';


const ConsumptionByElectricType = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getConsumptionElectricTypes().then((res) => {
            if (res.status === 200) {
                setData(res.data.map(item => ({ id: item.electricTypeId, value: item.consumption })));
            }
            console.log(data);
        })  
    }, [])

  return (
    <div className="consumption-by-customer-type">
      <h2>Sản lượng tiêu thụ theo loại hình khách hàng (loại điện)</h2>
      <BarChartComponent data={data} label={'Sản lượng điện tiêu thụ (kWh)'} labels={['Hộ gia đình', 'Doanh nghiệp', 'Công nghiệp', 'Nông nghiệp']}/>
    </div>
  );
};

export default ConsumptionByElectricType;
