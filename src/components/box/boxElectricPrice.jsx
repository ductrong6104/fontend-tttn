import {
  Box,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import TableComponent from "../table/tableComponent";
import { useEffect, useState } from "react";
import { createElectricityPrice, deleteElectricityPrice, getAllElectricityPrices } from "@/modules/electricity-prices/service";
import { getAllElectricTypes } from "@/modules/electric-types/service";
import { getLevelNotUseByElectricTypeId } from "@/modules/levels/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
export default function BoxElectricPrice() {
  const [formData, setFormData] = useState({
    electricTypeId: "",
    levelId: "",
    price: "",
  });
  const [electricityPrices, setElectricityPrices] = useState([]);
  const [levels, setLevels] = useState([]);
  const [electricTypes, setElectricTypes] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    getAllElectricityPrices().then((res) => {
      if (res.status === 200) {
        setElectricityPrices(res.data);
      }
    });
  }, [reload]);
  useEffect(() => {
    getAllElectricTypes().then((res) => {
      if (res.status === 200) {
        setElectricTypes(res.data.map((e) => ({ value: e.id, label: e.name })));
      }
    });
  }, [reload]);

  useEffect(() => {
    getLevelNotUseByElectricTypeId(formData.electricTypeId).then((res) => {
      if (res.status === 200) {
        
        setLevels(res.data.map((e) => ({ 

            value: e.id, 
            label: (e.firstLevel ? (e.secondLevel ? 'Từ ' + e.firstLevel + ' kWh đến, ': 'Từ ' + e.firstLevel + 'kW trở lên, ') : '') 
            + (e.secondLevel ? (e.firstLevel ? e.secondLevel + ' kWh, ' : 'Dưới ' + e.secondLevel + ' kWh, '): '') 
            + (e.timeline ? e.timeline : '')
            }))
        );
      }
    });
  }, [formData.electricTypeId, reload]);
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
    createElectricityPrice(formData).then((res) => {
      if (res.status === 201) { 
        notifySuccess("Thêm giá thành công");
        setReload(!reload);
      }
      else {
        notifyError("Thêm giá thất bại");
      } 
          
    })
  }
  const handleDelete = (electricTypeId, levelId) => {
    // console.log(`electricTypeId: ${electricTypeId}, levelId: ${levelId}`);
    const frm = { electricTypeId, levelId };
    console.log(JSON.stringify(frm));
    if (window.confirm(" có chắc muốn xóa giá không?")) {
      deleteElectricityPrice(electricTypeId, levelId).then((res) => {
        if (res.status === 204) {
          notifySuccess("Xóa giá thành công");
          setReload(!reload);
        }
        else {
          notifyError("Xóa giá thất baị");
          console.log(res.data)
          }
      })
  }
  }
  const handleEdit = (row) => {
    
  }
  return (
    <Box>
      <h2>Thêm Giá</h2>
      <form onSubmit={handleSubmit}>
       
        <FormControl fullWidth margin="normal">
          <InputLabel>Chọn loại điện</InputLabel>
          <Select
            name="electricTypeId"
            value={formData.electricTypeId}
            onChange={handleChange}
            label="Chọn loại điện"
            required
          >
            {electricTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Chọn bậc</InputLabel>
          <Select
            name="levelId"
            value={formData.levelId}
            onChange={handleChange}
            label="Chọn bậc"
            required
          >
           
            {levels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Đơn giá (đồng)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          inputProps={{
            min: 0,
          }}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Thêm
        </Button>
      </form>
      <h3>Danh sách Giá</h3>
      <TableComponent
        data={electricityPrices}
        columns={[
          { id: "electricTypeName", label: "Tên loại điện" },
          { id: "firstLevel", label: "Mức đầu" },
          { id: "secondLevel", label: "Mức cuối" },
          { id: "price", label: "Đơn giá" },
        ]}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Box>
  );
}
