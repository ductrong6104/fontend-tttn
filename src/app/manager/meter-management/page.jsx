'use client'
import FrmAddPowerMeter from "@/components/form/frmAddPowerMeter";
import Table from "@/components/table/table";
import { getAllPowerMeters } from "@/modules/power-meters/service";
import { useState, useEffect } from "react";
const columnNames = ["Mã đồng hồ", "Ngày lắp đặt", "Vị trí lắp đặt", "Trạng thái"]
export default function PageManagedMeter(){
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    })
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
    return(

        <div className="h-screen">
            {/* <div className="flex justify-center text-blue-600">
                <div className="text-2xl mb-2">Thông tin đồng hồ điện</div>
            </div> */}
            {/* <div className="mb-2">
                <FrmAddPowerMeter reload={reload} setReload={setReload}/>
            </div> */}
            
            <Table representName="meter" headerNames={columnNames} data={powerMeters} setData={setPowerMeters} sortConfig={sortConfig} setSortConfig={setSortConfig} title="Danh sách đồng hồ điện" handleClickEdit={handleClickEdit}/>
        </div>
    )
    
}