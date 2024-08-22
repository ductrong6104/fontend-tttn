'use client'
import SubfrmContractExtension from "@/components/subform/subfrmContractExtension";
import Table from "@/components/table/table"
import TableComponent from "@/components/table/tableComponent";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { getAllContracts, terminateContract } from "@/modules/contracts/service";
import { createElectricRecording } from "@/modules/electric-recordings/service";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
const columnNames = ["Mã hợp đồng", "Họ khách hàng", "Tên khách hàng", "Ngày bắt đầu hợp đồng","Ngày kết thúc hợp đồng","Mã đồng hồ - Địa chỉ cấp điện", "Loại điện","Mã - Họ tên nhân viên xử lý", "Trạng thái"]
const textConfirmChangeStatus = [
    "Xác nhận chấm dứt hợp đồng này?",
    "Xác nhận gia hạn hợp đồng này?",
    
  ]
export default function PageManagedContract(){
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    })
    const [contracts, setContracts] = useState([]);
    const [reload, setReload] = useState(false);
    const [subfrmContractExtensionIsOpen, setSubfrmContractExtensionIsOpen] = useState(false);
    const openSubfrmContractExtension = () => {
        setSubfrmContractExtensionIsOpen(true);
    }
    const closeSubfrmContractExtension = () => {
        setSubfrmContractExtensionIsOpen(false);
    }
    useEffect(()=>{
        getAllContracts().then((res)=>{
            if(res.status === 200){
                setContracts(res.data);
                console.log(res.data);
            }
        })
    }, [reload])
    const handleClickEdit = (contract, action) => {
        console.log(`contract`, contract);
        console.log(`action`, action);
        if (action === null)
            return
        if (window.confirm(`${textConfirmChangeStatus[action]}`)) {
            // action = 0: chấm dứt hợp đồng
            if (action === 0){
                console.log(`action`, contract);
                terminateContract(contract.id).then((res)=>{
                    if (res.status === 204){
                        
                        setReload(!reload);
                        if (res.data != null){
                            notifyError("Phải ghi điện trước khi kết thúc");
                            createElectricRecording(res.data).then((res)=>{
                                if (res.status === 201){
                                    notifySuccess("Thêm phân công ghi điện thành công");
                                }
                                else{
                                    notifyError("Vui lòng thông báo nhân viên ghi điện đã được phân công");
                                }
                            });
                        }
                        else {
                            notifySuccess("Kết thúc hợp đồng thành công");
                        }
                    }   
                    
                })
            }
            
        }
        else{
            console.log(`cancel`);
        }
        
       
    }
    const handleClickDelete = (row) => {
       
    }
    return(
        <div className="h-screen">
            <SubfrmContractExtension isOpen={subfrmContractExtensionIsOpen} onClose={closeSubfrmContractExtension}/>
            <Typography sx={{textAlign: "center", m: 2}} variant="h4" color="blue">DANH SÁCH HỢP ĐỒNG</Typography>
            <TableComponent data={contracts} columns={[
                {id: "id", label: "Mã hợp đồng"},
                {id: "firstName", label: "Họ khách hàng"},
                {id: "lastName", label: "Tên khách hàng"},
                {id: "startDate", label: "Ngày bắt đầu hợp đồng"},
                {id: "endDate", label: "Ngày kết thúc hợp đồng"},
                {id: "electricitySupplyAddress", label: "Mã đồng hồ-Vị trí"},
                {id: "electricTypeName", label: "Loại điện"},
                {id: "processingEmployeeIdAndName", label: "Mã - Họ tên nhân viên xử lý"},
                {id: "nameStatus", label: "Trạng thái"},
            
            ]}
            onEdit={handleClickEdit}
            onDelete={handleClickDelete}
            />
        </div>
    )
    
}