'use client'
import SubfrmContractExtension from "@/components/subform/subfrmContractExtension";
import Table from "@/components/table/table"
import { getAllContracts, terminateContract } from "@/modules/contracts/service";
import { useEffect, useState } from "react";
const columnNames = ["Mã hợp đồng", "Họ khách hàng", "Tên khách hàng", "Ngày bắt đầu hợp đồng","Ngày kết thúc hợp đồng","Mã đồng hồ - Địa chỉ cấp điện", "Loại điện","Mã - Họ tên nhân viên xử lý"]
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
            }
        })
    }, [reload])
    const handleClickEdit = (contractId, action) => {
        
       
        if (window.confirm(`${textConfirmChangeStatus[action]}`)) {
            // action = 1: gia hạn hợp đồng, action = 0: chấm dứt hợp đồng
            if (action === 0){
                console.log(`action`, contractId);
                terminateContract(contractId).then((res)=>{
                    if(res.status === 200){
                        setReload(!reload);
                    }
                   
                })
            }
            else if (action === 1){
                openSubfrmContractExtension();
            }
        }
        else{
            console.log(`cancel`);
        }
        
       
    }
    return(
        <div className="h-screen">
            <SubfrmContractExtension isOpen={subfrmContractExtensionIsOpen} onClose={closeSubfrmContractExtension}/>
            <Table representName="contract" headerNames={columnNames} data={contracts} setData={setContracts} sortConfig={sortConfig} setSortConfig={setSortConfig} title="Danh sách hợp đồng" handleClickEdit={handleClickEdit}/>
        </div>
    )
    
}