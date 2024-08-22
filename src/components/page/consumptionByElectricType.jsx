// components/ConsumptionByCustomerType.js


import { useEffect, useState } from 'react';


import { getConsumptionElectricTypes } from '@/modules/statistical/page';
import BarChartComponentMonth from '../chart/barChartMonth';


const ConsumptionByElectricType = () => {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        getConsumptionElectricTypes().then((res) => {
          
            if (res.status === 200) {
              console.log(res.data);
                setData(res.data.map(item => ({ label: item.electricTypeName, value: item.consumption })));
            }
            console.log(data);
        })  
    }, [reload])

  return (
    <div className="consumption-by-customer-type">
      <h2>Sản lượng tiêu thụ theo loại hình khách hàng (loại điện)</h2>
      <BarChartComponentMonth data={data} label={'Sản lượng điện tiêu thụ (kWh)'}/>
    </div>
  );
};

export default ConsumptionByElectricType;
