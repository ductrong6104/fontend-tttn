'use client'
import TableComponent from "@/components/table/tableComponent";
import { getAllPowerMeters } from "@/modules/power-meters/service";
import { useState, useEffect } from "react";

export default function PageManagedMeter(){
    
    const [powerMeters, setPowerMeters] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(()=>{
        getAllPowerMeters().then((res)=>{
            if(res.status === 200){
                setPowerMeters(res.data);
            }   
        })  
    }, [reload])
    const handleClickEdit = (row) => {

        console.log(`row`, row);
    }
    const handleClickDelete = (row) => {

    }
    return(

        <div className="h-screen">
            {/* <div className="flex justify-center text-blue-600">
                <div className="text-2xl mb-2">Thông tin đồng hồ điện</div>
            </div> */}
            {/* <div className="mb-2">
                <FrmAddPowerMeter reload={reload} setReload={setReload}/>
            </div> */}
            <TableComponent data={powerMeters} columns={[
                {id: "id", label: "Mã đồng hồ"},
                {id: "installationDate", label: "Ngày lắp đặt"},
                {id: "installationLocation", label: "Vị trí lắp đặt"},
                {id: "powerMeterStatus", label: "Trạng thái"},
            ]}
            onEdit={handleClickEdit}
            onDelete={handleClickDelete}
            />
        </div>
    )
    
}