'use client'
import ConsumptionByElectricType from "@/components/page/consumptionByElectricType";
import { Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function PageStatisticalConsumption() {
    const [selectTypeStatistical, setSelectTypeStatistical] = useState(1);
  return (
    <div className="flex flex-col">
        <Link className="font-bold text-blue-500 " href="/manager/statistical">Thống kê</Link>
        <div className="flex">

            <Button onClick={() => setSelectTypeStatistical(0)}>Thống kê tiêu thụ theo loại hình khách hàng</Button>
            <Button sx={{color:"red"}} onClick={() => setSelectTypeStatistical(1)}>Thống kê tiêu thụ theo thời gian</Button>
        </div>
        {selectTypeStatistical === 0 && <ConsumptionByElectricType/>}
    </div>
  ) 
}
