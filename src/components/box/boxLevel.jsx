import {
  Box,
  TextField,
  Button,

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
import SubfrmEditLevel from "../subform/subfrmEditLevel";


export default function BoxLevel() {
  const [formData, setFormData] = useState({
  }); 
  const [levels, setLevels]= useState([]);
  const [reload, setReload] = useState(false);
  const [subfrmEditLevelIsOpen, setSubfrmEditLevelIsOpen] = useState(false);
  const openSubfrmEditLevel = () => {
    setSubfrmEditLevelIsOpen(true);
  }
  const closeSubfrmEditLevel = () => {
    setSubfrmEditLevelIsOpen(false);
  }
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
    // Chuyển đổi chuỗi thành double (số thực)
    const firstLevelDouble = parseFloat(formData.firstLevel);
    const secondLevelDouble = parseFloat(formData.secondLevel);

    if (
      formData.firstLevel === "" &&
      formData.secondLevel === ""
    ) {
      notifyError("Vui lòng nhập mức");
    } else if (firstLevelDouble > secondLevelDouble && formData.firstLevel != '' && formData.secondLevel != '') {
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
  const handleEdit = (row) => {
    setFormData(row);
    console.log(`row`, row);
    openSubfrmEditLevel();
  };
  const handleDelete = (row) => {
    if (window.confirm(" có chắc muốn xóa bậc này không?")) {
      deleteLevelById(row.id).then((res) => {
        if (res.status === 204) {
          notifySuccess("Xóa bậc này thành công");
          setReload(!reload);
        } else {
          notifyError("Bậc này đã được phân giá! Không thể xóa");
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
      <SubfrmEditLevel frmData={formData} isOpen={subfrmEditLevelIsOpen} onClose={closeSubfrmEditLevel} reload={reload} setReload={setReload}/>
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
