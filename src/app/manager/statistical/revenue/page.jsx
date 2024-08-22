'use client'
import BarChartComponentMonth from "@/components/chart/barChartMonth";
import ComboboxComponent from "@/components/combobox/comboboxComponent";
import { getRevenueByYear } from "@/modules/statistical/page";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PageStatisticalRevenue() {
    const [data, setData] = useState([]);
  
  const [formData, setFormData] = useState({ year: 2024 });

  useEffect(() => {
    getRevenueByYear(formData).then((res) => {
      if (res.status === 200) {
        setData(
          res.data.map((item) => ({
            label: item.month,
            value: item.revenue,
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
      <Typography variant="h4">Doanh thu mỗi tháng trong năm {formData.year}</Typography>
      <ComboboxComponent label={"Chọn năm"} options={years} onChange={handleChange} value={formData.year} name="year"/>
      <BarChartComponentMonth
        data={data}
        label="Doanh thu"
        prefix={"Tháng"}
      />
    </div>
  );
}