'use client'
import FrmAddElectricRecording from "@/components/form/frmAddElectricRecording";
import FrmAddPowerMeter from "@/components/form/frmAddPowerMeter";
import Table from "@/components/table/table";
import { getAllElectricRecordings } from "@/modules/electric-recordings/service";
import { getAllPowerMeters } from "@/modules/power-meters/service";
import { useState, useEffect, useMemo } from "react";

const columnNames = ["Mã ghi điện", "Mã đồng hồ", "Ngày ghi chỉ số", "Chỉ số cũ", "Chỉ số mới", "Mã nhân viên - họ tên"]
import { formatDateForDisplay } from "@/utils/formatDate";
import { SubfrmAddBill } from "@/components/subform/subfrmAddBill";
import { getTotalAmountByElectricRecordingId } from "@/modules/bills/service";
import AccountSession from "@/utils/account";
import TableComponent from "@/components/table/tableComponent";
export default function PageManagedAssignment(){
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    })
    const [powerMeters, setPowerMeters] = useState([]);
    const [reload, setReload] = useState(false);
    const [subfrmAddBillIsOpen, setSubfrmAddBillIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        "invoiceDate": new Date().toISOString().split('T')[0],
        "paymentDueDate": "",
        "totalAmount":"",
        "electricRecordingId": ""
    });
    const accountSession = AccountSession.getInstance();
    const openSubfrmAddBill = () => {
        setSubfrmAddBillIsOpen(true);
        
    }
    const closeSubfrmAddBill = () => {
        setSubfrmAddBillIsOpen(false);
    }
    useEffect(()=>{
        getAllElectricRecordings().then((res)=>{
            if(res.status === 200){
                setPowerMeters(res.data);
            }   
        })  
    }, [reload])
    
    const handleClickEdit = (row) => {
        console.log(`row`, row.id);
        getTotalAmountByElectricRecordingId({electricRecordingId: row.id}).then((res) => {
            if (res.status === 200) {
                const newFrmData = {
                    totalAmount: res.data.totalAmount,
                    electricRecordingId: row.id,
                    invoiceDate: new Date().toISOString().split('T')[0],
                    paymentDueDate: "",
                    invoiceCreatorId: accountSession.getEmployeeId()
                }
                setFormData(newFrmData);
                openSubfrmAddBill();
            }
            else{
                console.error("Failed to fetch total amount:", res.data);
            }
        });
       
        
    }
    
    return(

        <div className="">
            <div className="flex justify-center text-blue-600">
                <div className="text-2xl mb-2">Thông tin ghi chỉ số điện {formatDateForDisplay(new Date())}</div>
            </div>
            <div className="mb-2">
                <FrmAddElectricRecording reload={reload} setReload={setReload}/>
            </div>
            <SubfrmAddBill isOpen={subfrmAddBillIsOpen} onClose={closeSubfrmAddBill} frmData={formData} reload={reload} setReload={setReload}></SubfrmAddBill>
            {/* <Table representName="electric-recording" headerNames={columnNames} data={powerMeters} setData={setPowerMeters} sortConfig={sortConfig} setSortConfig={setSortConfig} title="Ghi chỉ số điện" handleClickEdit={handleClickEdit}/> */}
            <TableComponent data={powerMeters} columns={
                [
                    {id: 'id', label: 'Mã ghi điện'},
                    {id: 'powerMeterId', label: 'Mã đồng hồ'},
                    {id: 'recordingDate', label: 'Ngày ghi chỉ số'},
                    {id: 'oldIndex', label: 'Chỉ số cũ'},
                    {id: 'newIndex', label: 'Chỉ số mới'},
                    {id: 'employeeIdAndFullName', label: 'Mã nhân viên - họ tên'}
                ]
            }
            onEdit={handleClickEdit}></TableComponent>
        </div>
    )
    
}