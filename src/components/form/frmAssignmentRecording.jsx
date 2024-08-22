// pages/form.js
"use client";
import { useEffect, useState } from "react";
import ButtonCustome from "../button/button";
import InputCustome from "../input/input";
import { createEmployee, getRecordableEmployees } from "@/modules/employees/service";
import {
  createNewPowerMeter,
  getRecordablePowerMeters,
} from "@/modules/power-meters/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
import ComboBox from "../combobox/combobox";
import { createElectricRecording } from "@/modules/electric-recordings/service";
import { Typography } from "@mui/material";
import { formatDateForDisplay } from "@/utils/formatDate";

export default function FrmAssignmentRecording({ reload, setReload }) {
  const [formData, setFormData] = useState({
    powerMeterId: "",
    employeeId: "",
  });
  
  const [powerMetersRecordable, setPowerMetersRecordable] = useState([]);
  const [powerMeterId, setPowerMeterId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  
  
  const [reloadPowerMeterRecordable, setReloadPowerMeterRecordable] = useState(false);
  useEffect(() => {
    getRecordablePowerMeters().then((res) => {
      if (res.status === 200) {
        setPowerMetersRecordable(
          res.data.map((item) => ({
            label: item.installationLocation,
            value: item.id,
            newIndex: item.newIndex
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
  const handleSelectPowerMeterRecordable = (value) => {
    setPowerMeterId(value);
    // const selectedId = parseInt(value, 10);
    // const selected = powerMetersRecordable.find(pm => pm.value === selectedId);
    // setOldIndex(selected.newIndex);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    /**
     * Hàm này sử dụng hàm callback để đảm bảo rằng nó luôn sử dụng giá trị mới nhất của state.
     * prevData là giá trị mới nhất của state formData vào thời điểm hàm callback được gọi.
     * Sử dụng hàm callback trong setState là cách an toàn hơn để cập nhật state khi bạn
     * dựa vào giá trị hiện tại của state đó,
     * đặc biệt khi bạn có nhiều lần cập nhật state liên tiếp trong cùng một lần render.
     */
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //   setFormData là một hàm bất đồng bộ và dữ liệu được ghi vào formData sẽ không cập nhật ngay lập tức. Vì vậy, khi bạn console.log(formData) ngay sau setFormData, bạn vẫn sẽ thấy dữ liệu cũ.
    
    // Để khắc phục vấn đề này, bạn có thể sử dụng một hàm callback trong setFormData để đảm bảo rằng bạn ghi log dữ liệu sau khi nó đã được cập nhật
    const frmData = {
      powerMeterId: powerMeterId,
      employeeId: employeeId,
    }

    createElectricRecording(frmData).then((res) => {
      if (res.status === 201) {
        notifySuccess("Phân công nhân viên thành công");
        setReloadPowerMeterRecordable(!reloadPowerMeterRecordable);
        setReload(!reload);
      } else {
        notifyError("Phân công nhân viên thất bại");
        console.log(res.data);
      }
    });
    // Add form submission logic here
  };
  const resetForm = () => {
    setFormData({
        newIndex: "",
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div className="flex justify-center">
        <Typography variant="h4" className="text-blue-400">Phân công nhân viên ghi chỉ số điện {formatDateForDisplay(new Date())}</Typography>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-1/2 mr-4">
          <div>
            <label className="block">Chọn đồng hồ chưa phân công:</label>
            <ComboBox
              options={powerMetersRecordable}
              onSelect={handleSelectPowerMeterRecordable}
              className="border-2 w-full rounded-md p-2 bg-white"
            />
          </div>
        </div>
        <div className="w-1/2 mr-4">
          <div>
            <label className="block">Chọn nhân viên ghi:</label>
            <ComboBox
              options={employees}
              onSelect={setEmployeeId}
              className="border-2 w-full rounded-md p-2 bg-white"
            />
          </div>
        </div>
      </div>

      <div>
        <ButtonCustome type="submit" className="mr-2 bg-green-400">
          Thêm
        </ButtonCustome>

        <ButtonCustome className="mr-2 bg-stone-300" onClick={resetForm}>
          Reset
        </ButtonCustome>
      </div>
    </form>
  );
}
