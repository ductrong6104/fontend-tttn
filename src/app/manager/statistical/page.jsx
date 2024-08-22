'use client'
import Link from 'next/link';
import ConsumptionByElectricType from '../../../components/page/consumptionByElectricType';





export default function PageManagedStatistical (){


    return (
        <div className='flex flex-col h-screen'>
        
            <Link href='/manager/statistical/consumption' className='p-4 border-2 bg-blue-100 w-1/4'>1. Thống kê sản lượng</Link>
            <Link href='/manager/statistical/revenue' className='p-4 border-2 bg-blue-100 w-1/4'>2. Thống Kê Doanh Thu</Link>

        </div>
    );
    
}