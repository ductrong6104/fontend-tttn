// pages/form.js
"use client";
import { useState } from "react";
import ButtonCustome from "../button/button";
import InputCustome from "../input/input";
import { createEmployee } from "@/modules/employees/service";
import { createNewPowerMeter } from "@/modules/power-meters/service";
import { notifyError, notifySuccess } from "../toastify/toastify";

export default function FrmAddPowerMeter({reload, setReload}) {
  const [formData, setFormData] = useState({
    installationDate: "",
    installationLocation: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    createNewPowerMeter(formData).then((res) => {
      
      if (res.status === 201) {
        notifySuccess("Thêm đồng hồ điện thành công");
        setReload(!reload);
      }
      else{
        notifyError("Thêm đồng hồ điện thất bại");
        console.log(res.data)
      }
    });
    // Add form submission logic here
  };
  const resetForm =() =>{
    setFormData({
        installationDate: "",
        installationLocation: "",
        status: "",
    })
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-row justify-between">
        <div className="w-1/2 mr-4">
            <div>
            <label className="block">Ngày lắp đặt:</label>
            <InputCustome
              type="date"
              name="installationDate"
              value={formData.installationDate}
              onChange={handleChange}
              className=""
              placeholder="dd-mm-yyyy" 
              required
            ></InputCustome>
          </div>
          <div>
            <label className="block">Vị trí lắp đặt:</label>
            <InputCustome
              type="text"
              name="installationLocation"
              value={formData.installationLocation}
              onChange={handleChange}
              className=""
              placeholder="VD: 97 Man thiện, p.Hiệp Phú, quận 9, tp. Thủ Đức"
              required
            ></InputCustome>
          </div>
         
        </div>

        
      </div>

      <div>
        <ButtonCustome type="submit" className="mr-2 bg-green-400">
          Thêm
        </ButtonCustome>
    
        <ButtonCustome className="mr-2 bg-stone-300" onClick={resetForm}>Reset</ButtonCustome>
      </div>
    </form>
  );
}
