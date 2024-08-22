'use client'
import FrmAddElectricRecording from "@/components/form/frmAddElectricRecording";
import FrmAssignmentRecording from "@/components/form/frmAssignmentRecording";
import { SubfrmUpdateAssignmentRecording } from "@/components/subform/subfrmUpdateAssignmentRecording";
import TableComponent from "@/components/table/tableComponent";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { deleteElectricRecording, getAssignedElectricRecordings } from "@/modules/electric-recordings/service";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function PageManagedAssignment() {
    const [assignments, setAssignments] = useState([]);
    const [reload, setReload] = useState(false);
    const [subfrmUpdateAssignmentIsOpen, setSubfrmUpdateAssignmentIsOpen] = useState(false);
    const [assignment, setAssignment] = useState({});
    const onOpenSubfrmUpdate = () => {
        setSubfrmUpdateAssignmentIsOpen(true);
    }
    const onCloseSubfrmUpdate = () => {
        setSubfrmUpdateAssignmentIsOpen(false);
    }
    useEffect(() => {
        getAssignedElectricRecordings().then((res) => {
            if (res.status === 200) {
                setAssignments(res.data);
            }
        })
    }, [reload])
    const cutting = (str) => {
        const parts = str.split('-');
        console.log(`parts`, parts);
        return parts[0];
    }
    const handleClickEdit = (row) => {
        console.log(`row`, row);
        // Chia chuỗi bằng dấu gạch nối và lấy phần sau dấu gạch nối
        if (row.recordingDate)
            notifyError("Đã ghi điện! Không thể cập nhật!")
        else{

            setAssignment({
                electricRecordingId: row.id,
                powerMeterId: row.powerMeterId,
                employeeId: cutting(row.employeeNameAndId),
            });
            onOpenSubfrmUpdate();
            console.log(`assignment`, assignment);
        }
    }
    const handleClickDelete = (row) => {
        if (row.recordingDate)
            notifyError("Đã ghi điện! Không thể xóa!")
        else{
            if (window.confirm("Xác nhận xóa phân công này?")){

                deleteElectricRecording(row.id).then((res) => {
                    if (res.status === 204) {
                        notifySuccess("Xóa phân công thành công");
                        setReload(!reload);
                    }
                    else {
                        notifyError("Xóa phân công thất bại");
             
                    }
                })
            }
        } 
    }
    return (
        <div className="h-screen">
            <FrmAssignmentRecording reload={reload} setReload={setReload}></FrmAssignmentRecording>
            <Typography className="text-center" variant="h5">Danh sách phân công</Typography>
            <SubfrmUpdateAssignmentRecording isOpen={subfrmUpdateAssignmentIsOpen} onClose={onCloseSubfrmUpdate} frmData={assignment} reload={reload} setReload={setReload}></SubfrmUpdateAssignmentRecording>
            <TableComponent data={assignments} columns={[
                {id: "id", label: "Mã ghi điện"},
                {id: "powerMeterId", label: "Mã đồng hồ điện"},
                {id: "installationLocation", label: "Vị trí đồng hồ"},
                {id: "recordingDate", label: "Ngày ghi chỉ số điện"},
                {id: "employeeNameAndId", label: "Mã - Họ tên nhân viên ghi"},
            ]}
            onEdit={handleClickEdit}
            onDelete={handleClickDelete}
            ></TableComponent>
        </div>
    )
}