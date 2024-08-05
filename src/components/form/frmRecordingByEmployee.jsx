// pages/form.js
"use client";
import { useEffect, useState } from "react";
import ButtonCustome from "../button/button";
import InputCustome from "../input/input";

import { notifyError, notifySuccess } from "../toastify/toastify";

import {  getAssignedElectricRecordingsByEmployeeId, updateElectricRecordingFirst } from "@/modules/electric-recordings/service";
import AccountSession from "@/utils/account";

export default function FrmRecordingByEmployee({ reload, setReload }) {
  const accountSession = AccountSession.getInstance();
  const [formData, setFormData] = useState({
    powerMeterId: "",
    employeeId: "",
    recordingDate: new Date().toISOString().split('T')[0],
    oldIndex: "",
    newIndex: "",
  });
  

  const [powerMeterId, setPowerMeterId] = useState(null);
  const [oldIndex, setOldIndex] = useState(null);
  const [installationLocation, setInstallationLocation] = useState(null);
  const [reloadPowerMeterRecordable, setReloadPowerMeterRecordable] = useState(false);
  useEffect(() => {
    getAssignedElectricRecordingsByEmployeeId(accountSession.getEmployeeId()).then((res) => {
      if (res.status === 200) {
        if (res.data){
          setOldIndex(res.data.oldIndex);
          setInstallationLocation(res.data.installationLocation)
          setPowerMeterId(res.data.powerMeterId);
        }
          
        else 
        {
          setOldIndex(null);
          setInstallationLocation(null);
          setPowerMeterId(null);
        }
          
      }
    })
  }, [accountSession, reloadPowerMeterRecordable]);
 
  
 
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
      employeeId: accountSession.getEmployeeId(),
      oldIndex: oldIndex,
      recordingDate: new Date().toISOString().split('T')[0],
      newIndex: formData.newIndex
    }
    console.log(frmData);
    updateElectricRecordingFirst(frmData).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
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
    powerMeterId ? (
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-row justify-between">
        <div className="w-1/2 mr-4">
          <div>
            <label className="block">Vị trí đồng hồ:</label>
            <div className="bg-white rounded-md border-2 p-2">{powerMeterId}-{installationLocation}</div>
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
              min={oldIndex}
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
    ) : (
      <div>Không có đồng hồ nào cần ghi lúc này</div>
    )
    
  );
}
