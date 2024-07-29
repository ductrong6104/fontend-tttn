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

export default function FrmAddElectricRecording({ reload, setReload }) {
  const [formData, setFormData] = useState({
    powerMeterId: "",
    employeeId: "",
    recordingDate: new Date().toISOString().split('T')[0],
    oldIndex: "",
    newIndex: "",
  });
  
  const [powerMetersRecordable, setPowerMetersRecordable] = useState([]);
  const [powerMeterId, setPowerMeterId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [oldIndex, setOldIndex] = useState(null);
  
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
    const selectedId = parseInt(value, 10);
    const selected = powerMetersRecordable.find(pm => pm.value === selectedId);
    setOldIndex(selected.newIndex);
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
      oldIndex: oldIndex,
      recordingDate: new Date().toISOString().split('T')[0],
      newIndex: formData.newIndex
    }

    createElectricRecording(frmData).then((res) => {
      if (res.status === 201) {
        notifySuccess("Ghi điện thành công");
        setReloadPowerMeterRecordable(!reloadPowerMeterRecordable);
        setReload(!reload);
      } else {
        notifyError("Ghi điện thất bại");
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-row justify-between">
        <div className="w-1/2 mr-4">
          <div>
            <label className="block">Chọn đồng hồ chưa ghi:</label>
            <ComboBox
              options={powerMetersRecordable}
              onSelect={handleSelectPowerMeterRecordable}
              className="border-2 w-full rounded-md p-2 bg-white"
            />
          </div>
          <div>
            <label className="block">Ngày ghi chỉ số:</label>
            <InputCustome
              type="date"
              name="recordingDate"
              value={formData.recordingDate}
              onChange={handleChange}
              className=""
              placeholder="VD: 97 Man thiện, p.Hiệp Phú, quận 9, tp. Thủ Đức"
              readOnly={true}
              required
            ></InputCustome>
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

          <div>
            <label className="block">Chỉ số cũ (đơn vị: kWh):</label>
            <InputCustome
              type="number"
              name="oldIndex"
              value={oldIndex}
              onChange={handleChange}
              className=""
          
              readOnly={true}
              required
            ></InputCustome>
          </div>
          <div>
            <label className="block">Chỉ số mới (đơn vị: kWh):</label>
            <InputCustome
              type="number"
              name="newIndex"
              value={formData.newIndex}
              onChange={handleChange}
              className=""
              placeholder="VD: 100"
              required
              min={formData.oldIndex}
            ></InputCustome>
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
