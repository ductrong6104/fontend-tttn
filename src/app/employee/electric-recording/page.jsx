

'use client'
import FrmAddElectricRecording from "@/components/form/frmAddElectricRecording";
import { useState, useEffect, useMemo } from "react";
import { formatDateForDisplay } from "@/utils/formatDate";
import { SubfrmAddBill } from "@/components/subform/subfrmAddBill";
import { getTotalAmountByElectricRecordingId } from "@/modules/bills/service";
import AccountSession from "@/utils/account";
import TableComponent from "@/components/table/tableComponent";
import { deleteElectricRecording, deleteRecordingByEmployee, getAllElectricRecordings, getAssignedElectricRecordingsByEmployeeId } from "@/modules/electric-recordings/service";
import FrmRecordingByEmployee from "@/components/form/frmRecordingByEmployee";
import SubfrmEditElectricRecording from "@/components/subform/subfrmEditElectricRecording";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { Typography } from "@mui/material";
import SubfrmRecordingByEmployee from "@/components/subform/subfrmRecordingByEmployee";

export default function PageElectricRecording(){
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    })
    const [powerMeters, setPowerMeters] = useState([]);
    const [assignedPowerMeters, setAssignedPowerMeters] = useState([]);
    const [reload, setReload] = useState(false);
    const [subfrmAddBillIsOpen, setSubfrmAddBillIsOpen] = useState(false);
    const [subfrmEditElectricRecordingIsOpen, setSubfrmEditElectricRecordingIsOpen] = useState(false);
    const [subfrmRecordingByEmployeedIsOpen, setSubfrmRecordingByEmployeedIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        "invoiceDate": new Date().toISOString().split('T')[0],
        "paymentDueDate": "",
        "totalAmount":"",
        "electricRecordingId": ""
    });

    const [formDataRecording, setFormDataRecording ] = useState({
        powerMeterId: "",
        employeeId: "",
        recordingDate: new Date().toISOString().split('T')[0],
        oldIndex: "",
        newIndex: "",
      });
    const [formDataEdit, setFormDataEdit] = useState({
        
    })
    const accountSession = AccountSession.getInstance();
    const openSubfrmAddBill = () => {
        setSubfrmAddBillIsOpen(true);
        
    }
    const closeSubfrmAddBill = () => {
        setSubfrmAddBillIsOpen(false);
    }

    const openSubfrmEditRecording = () => {
        setSubfrmEditElectricRecordingIsOpen(true);
    }
    const closeSubfrmEditRecording = () => {
        setSubfrmEditElectricRecordingIsOpen(false);
    }

    const openSubfrmRecordingByEmployee = () => {
        setSubfrmRecordingByEmployeedIsOpen(true);
    }
    const closeSubfrmRecordingByEmployee = () => {
        setSubfrmRecordingByEmployeedIsOpen(false);
    }
    useEffect(()=>{
        getAllElectricRecordings().then((res)=>{
            if(res.status === 200){
                setPowerMeters(res.data);
            }   
        })  
    }, [reload])
   
    useEffect(() => {
        getAssignedElectricRecordingsByEmployeeId(accountSession.getEmployeeId()).then((res) => {
          if (res.status === 200) {
            setAssignedPowerMeters(res.data);
          }
        })
      }, [accountSession, reload]);

    const handleClickEditRecording = (row) => {
        setFormDataRecording((prevData) => ({
            ...prevData,
            powerMeterId: row.powerMeterId,
            employeeId: accountSession.getEmployeeId(),
            recordingDate: new Date().toISOString().split('T')[0],
            oldIndex: row.oldIndex,
            newIndex: ""
        }));
        openSubfrmRecordingByEmployee();
    }
    const handleClickEdit = (row, index) => {
        console.log(`row`, row.id);
        // index =0 : chỉnh sửa ghi điện, index = 1: xuất thông báo
        if (index === 1){

            getTotalAmountByElectricRecordingId({electricRecordingId: row.id}).then((res) => {
                if (res.status === 200) {
                    const newFrmData = {
                        totalAmount: res.data.totalAmount,
                        electricRecordingId: row.id,
                        invoiceDate: new Date().toISOString().split('T')[0],
                        paymentDueDate: "",
                        invoiceCreatorId: accountSession.getEmployeeId()
                    }
                    console.log(`newFrmData`, newFrmData);
                    setFormData(newFrmData);
                    openSubfrmAddBill();
                }
                else{
                    console.error("Failed to fetch total amount:", res.data);
                }
            });
        }
        else if (index ===0){
            console.log(`row`, row);
            setFormDataEdit(row);
            return;
            openSubfrmEditRecording();
        }
       
        
    }

    const cutting = (str) => {
        const parts = str.split('-');
        console.log(`parts`, parts);
        return parts[0];
    }
    const handleEditDelete = (row) => {
        if (cutting(row.employeeIdAndFullName) === accountSession.getEmployeeId()){
            notifyError("Không thể xóa ghi điện của nhân viên khác!")
        }
        else{
        
            // invoiced == true: đã xuất thông báo thì không thể xóa
            if (window.confirm("Xác nhận xóa ghi điện?")){
                deleteRecordingByEmployee(row.id).then((res) => {
                    if (res.status === 204) {
                        notifySuccess("Xóa ghi điện thành công");
                        setReload(!reload);
                    }
                    else{
                        notifyError("Xóa ghi điện thất bại");
                    }
                })
            }
        }
            
       
    }
    
    
    return(

        <div className="">
            <div className="flex justify-center text-blue-600">
                <div className="text-2xl mb-2">Thông tin ghi chỉ số điện {formatDateForDisplay(new Date())}</div>
            </div>
            <div className="mb-2">
                
                <Typography variant="h5" sx={{textAlign: "center"}}>Danh sách đồng hồ được phân công</Typography>
                <TableComponent data={assignedPowerMeters} columns={[
                    {id: 'powerMeterId', label: 'Mã đồng hồ'},
                    {id: 'installationLocation', label: 'Vị trí lắp đặt'},
                    {id: 'oldIndex', label: 'Chỉ số cũ'},
                ]}
                onEdit={handleClickEditRecording}
                ></TableComponent>
            </div>
            <SubfrmRecordingByEmployee isOpen={subfrmRecordingByEmployeedIsOpen} onClose={closeSubfrmRecordingByEmployee} frmData={formDataRecording} reload={reload} setReload={setReload}></SubfrmRecordingByEmployee>
            <SubfrmAddBill isOpen={subfrmAddBillIsOpen} onClose={closeSubfrmAddBill} frmData={formData} reload={reload} setReload={setReload}></SubfrmAddBill>
            <SubfrmEditElectricRecording isOpen={subfrmEditElectricRecordingIsOpen} onClose={closeSubfrmEditRecording} frmData={formDataEdit} reload={reload} setReload={setReload}/>
            {/* <Table representName="electric-recording" headerNames={columnNames} data={powerMeters} setData={setPowerMeters} sortConfig={sortConfig} setSortConfig={setSortConfig} title="Ghi chỉ số điện" handleClickEdit={handleClickEdit}/> */}
            <Typography variant="h5" sx={{textAlign: "center", mt: 10}}>Danh sách đã ghi điện</Typography>
            <TableComponent data={powerMeters} columns={
                [
                    {id: 'id', label: 'Mã ghi điện'},
                    {id: 'powerMeterId', label: 'Mã đồng hồ'},
                    {id: 'recordingDate', label: 'Ngày ghi chỉ số'},
                    {id: 'oldIndex', label: 'Chỉ số cũ'},
                    {id: 'newIndex', label: 'Chỉ số mới'},
                    {id: 'employeeIdAndFullName', label: 'Mã nhân viên - họ tên'},
                    {id: "invoiced", label:"Trạng thái"},
                ]
            }
            onEdit={handleClickEdit}
            onDelete={handleEditDelete}
            presentName="bill"
            ></TableComponent>
        </div>
    )
    
}