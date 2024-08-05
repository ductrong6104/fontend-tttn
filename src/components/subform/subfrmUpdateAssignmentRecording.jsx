import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";

import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getRecordablePowerMeters } from "@/modules/power-meters/service";
import { getRecordableEmployees } from "@/modules/employees/service";
import ComboboxComponent from "../combobox/comboboxComponent";
import { updateElectricRecording } from "@/modules/electric-recordings/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
export function SubfrmUpdateAssignmentRecording({
  isOpen,
  onClose,
  frmData,
  reload,
  setReload,
}) {
    const [formData, setFormData] = useState(frmData);
    useEffect(() => {
      setFormData(frmData);
    }, [frmData]);
    const [powerMetersRecordable, setPowerMetersRecordable] = useState([]);
    
   
    const [employees, setEmployees] = useState([]);
    
    
    const [reloadPowerMeterRecordable, setReloadPowerMeterRecordable] = useState(false);
    useEffect(() => {
      getRecordablePowerMeters().then((res) => {
        if (res.status === 200) {
          setPowerMetersRecordable(
            res.data.map((item) => ({
              label: item.installationLocation,
              value: item.id,
            }))
          );
        }
      });
    }, [reloadPowerMeterRecordable]);
    useEffect(() => {
      getRecordableEmployees().then((res) => {
        if (res.status === 200) {
          setEmployees(
            res.data.map((item) => ({
              label: item.idAndFullName,
              value: item.id,
              
            }))
          );
        }
      });
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (formData.powerMeterId === ''){
        formData.powerMeterId = frmData.powerMeterId;
        formData.employeeId = frmData.employeeId;
      }
      console.log(`formData: ${JSON.stringify(formData)}`);
      updateElectricRecording(formData.electricRecordingId, formData).then((res) => {
          if (res.status === 200) {
              notifySuccess("Cập nhật phân công thành công");
              setReload(!reload);
              onClose();
          }
          else{
              notifyError("Không thể cập nhật thất bại");
              console.log(`error:`, res);
          }
      })
     
    }
    
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <form onSubmit={handleSubmit}>

            <Typography variant="h6">Cập nhật phân công</Typography>
        <ComboboxComponent label={"Chọn đồng hồ"} options={powerMetersRecordable} onChange={handleChange} name={"powerMeterId"} value={formData.powerMeterId}></ComboboxComponent>
        <ComboboxComponent label={"Chọn nhân viên"} options={employees} onChange={handleChange} name={"employeeId"} value={formData.employeeId}></ComboboxComponent>
        <div className="text-right">

            <Button className="justify-right" type="submit">Cập nhật</Button>
      </div>
        </form>
    </Modal>
  );
}
