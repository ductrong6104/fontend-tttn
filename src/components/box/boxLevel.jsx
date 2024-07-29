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
import { useEffect } from "react";
import { useState } from "react";
import {
  createLevel,
  deleteLevelById,
  getAllLevels,
} from "@/modules/levels/service";
import { notifyError, notifySuccess } from "../toastify/toastify";


export default function BoxLevel() {
  const [formData, setFormData] = useState({
    firstLevel: "",
    secondLevel: "",
  }); 
  const [levels, setLevels]= useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    getAllLevels().then((res) => {
      if (res.status === 200) {
        setLevels(res.data);
      }
    });
  }, [reload]);

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
    if (
      formData.firstLevel === "" &&
      formData.secondLevel === ""
    ) {
      notifyError("Vui lòng nhập mức");
    } else if (formData.firstLevel > formData.secondLevel && formData.firstLevel != '' && formData.secondLevel != '') {
      notifyError("Mức đầu không lớn hơn mức cuối");
    } else {
      createLevel(formData).then((res) => {
        if (res.status === 201) {
          notifySuccess("Thêm bậc thành công");
          setReload(!reload);
        } else {
          notifyError("Thêm bậc thất bại! Mức này đã được sử dụng");
          console.log(res.data);
        }
      });
    }
      
    
  };
  const handleEdit = (id) => {};
  const handleDelete = (id) => {
    if (window.confirm(" có chắc muốn xóa bậc này không?")) {
      deleteLevelById(id).then((res) => {
        if (res.status === 204) {
          notifySuccess("Xóa bậc này thành công");
          setReload(!reload);
        } else {
          notifyError("Xóa bậc này thất baị");
          console.log(res.data);
        }
      });
    }
  };
  return (
    <Box>
      <h2>Thêm Bậc</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Mức đầu (kWh hoặc kV)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="firstLevel"
          value={formData.firstLevel}
          onChange={handleChange}
          type="number"
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Mức cuối (kWh hoặc kV)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="secondLevel"
          value={formData.secondLevel}
          onChange={handleChange}
          type="number"
          inputProps={{ min: 0 }}
        />
        
        <Button variant="contained" color="primary" type="submit">
          Thêm
        </Button>
      </form>
      <h3>Danh sách Bậc</h3>
      <TableComponent
        data={levels}
        columns={[
          { id: "id", label: "ID" },
          { id: "firstLevel", label: "Mức đầu (kWh hoặc kV)" },
          { id: "secondLevel", label: "Mức cuối (kWh hoặc kV)" },

        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
}
