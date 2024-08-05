import { Box, TextField, Button } from "@mui/material";
import TableComponent from "../table/tableComponent";
import { useEffect, useState } from "react";
import { createElectricType, deleteElectricType, getAllElectricTypes } from "@/modules/electric-types/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
import SubfrmEditElectricType from "../subform/subfrmEditElectricType";
export default function BoxElectricType() {
  const [formData, setFormData] = useState({});
  // Dữ liệu giả cho các bảng
  const [electricTypes, setElectricTypes] = useState([]);
  const [reload, setReload] = useState(false);
  const [subfrmUpdateElectricTypeIsOpen, setSubfrmUpdateElectricTypeIsOpen] = useState(false);
  const openSubfrmUpdateElectricType = () => {
    setSubfrmUpdateElectricTypeIsOpen(true);
  }
  const closeSubfrmUpdateElectricType = () => {
    setSubfrmUpdateElectricTypeIsOpen(false);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllElectricTypes().then((res) => {
        if (res.status === 200){

            setElectricTypes(res.data);
        }
    })
  }, [reload]);

  const handleEdit = (row) => {
   console.log(`row`, row);
    setFormData(row);
    openSubfrmUpdateElectricType();
  }

  const handleDelete = (row) => {
    if (window.confirm("Bạn có chắc muốn xóa loại điện này không?")) {
        deleteElectricType(row.id).then((res) => {
            if (res.status === 204){
                notifySuccess("Xóa loại điện thành công")
                setReload(!reload)
            }
            else {
                notifyError("Lỗi điện đã được phân giá! Không thể xóa")
                console.log(res.data)
            }
        })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    createElectricType(formData).then((res) => {

        if (res.status === 201) {
            notifySuccess("Thêm loại điện thanh cong");
            setReload(!reload)
        }
        else if (res.status === 400) {
            notifyError("Tên loại điện đã sử dụng! Vui lòng chọn tên khác");
        }
        else {
            notifyError("Thêm loại điện that bai");
        }
    })
  }
    // Add form submission logic here
  return (
    <Box>
      <h2>Thông tin loại điện</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên loại điện"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Thêm
        </Button>
      </form>
      <h3>Danh sách Loại điện</h3>
      <SubfrmEditElectricType frmData={formData} isOpen={subfrmUpdateElectricTypeIsOpen} onClose={closeSubfrmUpdateElectricType} reload={reload} setReload={setReload}/>
      <TableComponent
        data={electricTypes}
        columns={[
          { id: "id", label: "ID" },
          { id: "name", label: "Tên loại điện" },

        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
}
