'use client'
import Link from 'next/link';
import ConsumptionByElectricType from '../../../components/page/consumptionByElectricType';





export default function PageManagedStatistical (){


    return (
        <div className='flex flex-col'>
        
            <Link href='/manager/statistical/consumption'>1. Thống kê sản lượng</Link>
            <Link href='/manager/statistical/revenue'>2. Thống Kê Doanh Thu</Link>
            <Link href='/manager/statistical/client'>3. Thống Kê Khách Hàng</Link>
            <Link href='/manager/statistical/billAndPayment'>4. Thống Kê Hóa Đơn và Thanh Toán</Link>
        </div>
    );
    
}