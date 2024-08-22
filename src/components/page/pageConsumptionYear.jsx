import { getConsumptionByYear } from "@/modules/statistical/page";
import BarChartComponentMonth from "../chart/barChartMonth";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ComboboxComponent from "../combobox/comboboxComponent";

export default function ConsumptionByYear() {
  const [data, setData] = useState([]);
  
  const [formData, setFormData] = useState({ year: 2024 });

  useEffect(() => {
    getConsumptionByYear(formData).then((res) => {
      if (res.status === 200) {
        setData(
          res.data.map((item) => ({
            label: item.month,
            value: item.consumption,
          }))
        );
      }
      console.log(data);
    });
  }, [formData.year]);
  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };
  const years = [
    { label: 2020, value: 2020 },
    { label: 2021, value: 2021 },
    { label: 2022, value: 2022 },
    { label: 2023, value: 2023 },
    { label: 2024, value: 2024 },
  ];
  return (
    <div className="consumption-by-customer-type">
      <Typography variant="h4">Sản lượng tiêu thụ điện trong năm {formData.year}</Typography>
      <ComboboxComponent label={"Chọn năm"} options={years} onChange={handleChange} value={formData.year} name="year"/>
      <BarChartComponentMonth
        data={data}
        label="Sản lượng tiêu thụ điện"
        prefix={"Tháng"}
      />
    </div>
  );
}
