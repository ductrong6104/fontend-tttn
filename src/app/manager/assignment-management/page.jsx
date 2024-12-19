"use client";
import FrmAddElectricRecording from "@/components/form/frmAddElectricRecording";
import FrmAssignmentRecording from "@/components/form/frmAssignmentRecording";
import FrmAutoAssignPowerMeter from "@/components/form/frmAutoAssignPowerMeter";
import Map from "@/components/map/Map";
import MapAutomation from "@/components/map/MapAutomation";
import SubfrmAutomationAssignment from "@/components/subform/subfrmAutomationAssignment";
import SubfrmHistoryRecording from "@/components/subform/subfrmHistoryRecording";
import { SubfrmUpdateAssignmentRecording } from "@/components/subform/subfrmUpdateAssignmentRecording";
import TableComponent from "@/components/table/tableComponent";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { getAssignments } from "@/modules/assignments/service";
import {
  deleteElectricRecording,
  getAssignedElectricRecordings,
} from "@/modules/electric-recordings/service";
import { getAutomationAssignment } from "@/modules/power-meters/service";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function PageManagedAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [reload, setReload] = useState(false);
  const [subfrmUpdateAssignmentIsOpen, setSubfrmUpdateAssignmentIsOpen] =
    useState(false);
  const [assignment, setAssignment] = useState({});
  const [
    subfrmAutomationAssignmentIsOpen,
    setSubfrmAutomationAssignmentIsOpen,
  ] = useState(false);
  const [subfrmHistoryRecordingIsOpen, setSubfrmHistoryRecordingIsOpen] =
    useState(false);
  const openSubfrmHistoryRecording = () => {
    setSubfrmHistoryRecordingIsOpen(true);
  };
  const closeSubfrmHistoryRecording = () => {
    setSubfrmHistoryRecordingIsOpen(false);
  };
  const [frmDataHistory, setFrmDataHistory] = useState({
    powerMeterId: "",
  });
  // const [automationDatas, setAutomationDatas] = useState([]);

  // useEffect(() => {
  //   getAutomationAssignment().then((res) => {
  //     if (res.status === 200) {
  //       setAutomationDatas(res.data);
  //       console.log(JSON.stringify(res.data));
  //     }
  //   });
  // }, []);

  const onOpenSubfrmAutomation = () => {
    setSubfrmAutomationAssignmentIsOpen(true);
  };
  const onCloseSubfrmAutomation = () => {
    setSubfrmAutomationAssignmentIsOpen(false);
  };
  const onOpenSubfrmUpdate = () => {
    setSubfrmUpdateAssignmentIsOpen(true);
  };
  const onCloseSubfrmUpdate = () => {
    setSubfrmUpdateAssignmentIsOpen(false);
  };
  useEffect(() => {
    getAssignments().then((res) => {
      if (res.status === 200) {
        setAssignments(res.data);
      }
    });
  }, [reload]);
  const cutting = (str) => {
    const parts = str.split("-");
    console.log(`parts`, parts);
    return parts[0];
  };
  const handleClickEdit = (row) => {
    console.log(`row`, row);
    // Chia chuỗi bằng dấu gạch nối và lấy phần sau dấu gạch nối

    setAssignment({
      assignmentId: row.id,
      powerMeterId: row.powerMeterId,
      installationLocation: row.installationLocation,
      employeeId: cutting(row.employeeIdAndFullName),
    });
    onOpenSubfrmUpdate();
    console.log(`assignment`, assignment);
  };
  const handleClickDelete = (row) => {
    // if (row.recordingDate) notifyError("Đã ghi điện! Không thể xóa!");
    // else {
    //   if (window.confirm("Xác nhận xóa phân công này?")) {
    //     deleteElectricRecording(row.id).then((res) => {
    //       if (res.status === 204) {
    //         notifySuccess("Xóa phân công thành công");
    //         setReload(!reload);
    //       } else {
    //         notifyError("Xóa phân công thất bại");
    //       }
    //     });
    //   }
    // }
    setFrmDataHistory({ powerMeterId: row.powerMeterId });
    openSubfrmHistoryRecording();
  };
  return (
    <div className="h-screen">
      <FrmAssignmentRecording
        reload={reload}
        setReload={setReload}
      ></FrmAssignmentRecording>

      <Button
        sx={{
          border: "1px solid #1976d2",
          color: "#1976d2",
          marginTop: "20px",
        }}
        onClick={onOpenSubfrmAutomation}
      >
        Phân công tự động
      </Button>
      <Typography className="text-center" variant="h5">
        Danh sách phân công
      </Typography>
      <SubfrmUpdateAssignmentRecording
        isOpen={subfrmUpdateAssignmentIsOpen}
        onClose={onCloseSubfrmUpdate}
        frmData={assignment}
        reload={reload}
        setReload={setReload}
      ></SubfrmUpdateAssignmentRecording>
      <SubfrmAutomationAssignment
        isOpenModal={subfrmAutomationAssignmentIsOpen}
        onClose={onCloseSubfrmAutomation}
        reload={reload}
        setReload={setReload}
      ></SubfrmAutomationAssignment>
      <TableComponent
        data={assignments}
        columns={[
          { id: "id", label: "Mã phân công" },
          { id: "powerMeterId", label: "Mã đồng hồ điện" },
          { id: "installationLocation", label: "Vị trí đồng hồ" },
          {
            id: "employeeIdAndFullName",
            label: "Mã - Họ tên nhân viên được phân",
          },
          // { id: "assignmentDate", label: "Ngày phân công" },
        ]}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
        presentName="Phân công"
      ></TableComponent>
      <SubfrmHistoryRecording
        onClose={closeSubfrmHistoryRecording}
        isOpen={subfrmHistoryRecordingIsOpen}
        frmData={frmDataHistory}
      ></SubfrmHistoryRecording>
      {/* <MapAutomation></MapAutomation> */}
    </div>
  );
}
