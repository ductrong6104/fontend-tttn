import { use, useEffect, useState } from "react";
import ComboboxComponent from "../combobox/comboboxComponent";
import { getInforPowerMeters } from "@/modules/power-meters/service";
import { useAutoAssignContext } from "../context/autoAssignContext";

export default function FrmAutoAssignPowerMeter({ automationDatas }) {
  const [formData, setFormData] = useState({
    powerMeterIds: "",
  });

  const [autoAssignData, setAutoAssignData] = useState([]);
  const [powerMeterInfors, setPowerMeterInfors] = useState([]);
  const { setPowerMeters, setIdAndFullName } = useAutoAssignContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const selectedOption = autoAssignData.find(
      (option) => option.value === value
    );
    const selectedLabel = selectedOption ? selectedOption.label : "";
    console.log(`label id and name employee ${selectedLabel.trim() === ''}`);

  
    setIdAndFullName(selectedLabel.trim());
  
  };
  useEffect(() => {
    console.log(
      `powerMeterIds change: ${JSON.stringify(formData.powerMeterIds)}`
    );
    if (formData.powerMeterIds)
      getInforPowerMeters(formData.powerMeterIds).then((res) => {
        if (res.status === 200) {
          setPowerMeterInfors(res.data);
        }
      });
  }, [formData.powerMeterIds]);
  useEffect(() => {
    // Đặt autoAssignData dựa trên automationDatas
    const updatedData = automationDatas.map((data) => ({
      ...data,
      label: data.employeeId,
      value: data.powerMeterIds,
    }));
    setAutoAssignData(updatedData);
  }, [automationDatas]);

  useEffect(() => {
    setPowerMeters(powerMeterInfors);
  }, [powerMeterInfors])

  return (
    <div className="border-2 rounded-md p-4">
      <ComboboxComponent
        label={"Chọn nhân viên"}
        options={autoAssignData}
        onChange={handleChange}
        value={formData.powerMeterIds}
        name="powerMeterIds"
      />
      {powerMeterInfors.length > 0 &&
        powerMeterInfors.map((item) => (
          <div className="border-2 rounded-md p-4 mb-2">
            <p>Mã đồng hồ: {item.id}</p>
            <p>Vị trí lắp đặt: {item.installationLocation}</p>
            <p>Kinh độ: {item.longitude}</p>
            <p>Vĩ độ: {item.latitude}</p>
          </div>
        ))}
    </div>
  );
}
