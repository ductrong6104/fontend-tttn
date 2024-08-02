'use client'
import FrmAddElectricRecording from "@/components/form/frmAddElectricRecording";
import FrmAssignmentRecording from "@/components/form/frmAssignmentRecording";
import TableComponent from "@/components/table/tableComponent";
import { getAssignedElectricRecordings } from "@/modules/electric-recordings/service";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function PageManagedAssignment() {
    const [assignments, setAssignments] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        getAssignedElectricRecordings().then((res) => {
            if (res.status === 200) {
                setAssignments(res.data);
            }
        })
    }, [reload])
    return (
        <div className="h-screen">
            <FrmAssignmentRecording reload={reload} setReload={setReload}></FrmAssignmentRecording>
            <Typography className="text-center" variant="h5">Danh sách phân công</Typography>
            <TableComponent data={assignments} columns={[
                {id: "powerMeterId", label: "Mã đồng hồ điện"},
                {id: "installationLocation", label: "Vị trí đồng hồ"},
                {id: "recordingDate", label: "Ngày ghi chỉ số điện"},
                {id: "employeeNameAndId", label: "Mã - Họ tên nhân viên ghi"},
            ]}></TableComponent>
        </div>
    )
}