import { Button, TextField, Typography } from "@mui/material";
import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";
import { useEffect, useState } from "react";

import { notifyError, notifySuccess } from "../toastify/toastify";
import CloseIcon from "@mui/icons-material/Close";
import {updateLevel} from "@/modules/levels/service";
export default function SubfrmEditLevel({
  isOpen,
  onClose,
  frmData,
  reload,
  setReload,
}) {
  const [formData, setFormData] = useState(frmData);
  useEffect(() => {
    setFormData(frmData);
  }, [frmData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Chuyển đổi chuỗi thành double (số thực)
    const firstLevelDouble = parseFloat(formData.firstLevel);
    const secondLevelDouble = parseFloat(formData.secondLevel);

    if (formData.firstLevel === "" && formData.secondLevel === "") {
      notifyError("Vui lòng nhập mức");
    } else if (
      firstLevelDouble > secondLevelDouble &&
      formData.firstLevel != "" &&
      formData.secondLevel != ""
    ) {
      notifyError("Mức đầu không lớn hơn mức cuối");
    } else {
      const id = formData.id;
     
        updateLevel(id, formData).then((res) => {
          if (res.status === 200) {
            notifySuccess("Cập nhật bậc thành công");
            setReload(!reload);
            onClose();
          } else {
            notifyError("Cặp mức đầu - mức cuối này đã được sử dụng");
            console.log(res.data);
          }
        });
      }
      
      
    }
  

  
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
        
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="text-right mb-2 cursor-pointer">
          <CloseIcon onClick={onClose}></CloseIcon>
        </div>
        <Typography variant="h5" sx={{mb: 2}}>Cập nhật bậc</Typography>
        <TextField
          sx={{ mb: 2 }}
          label="Mức đầu"
          name="firstLevel"
          value={formData.firstLevel}
          onChange={handleChange}
          required
          inputProps={{ min : 0 }}
          type="number"
        ></TextField>
        <TextField
          className="mb-2"
          label="Mức cuối"
          name="secondLevel"
          value={formData.secondLevel}
          onChange={handleChange}
          required
          inputProps={{ min : 0 }}
           type="number"
        ></TextField>
        <div className="text-right">
          <Button type="submit">Cập nhật</Button>
        </div>
      </form>
    </Modal>
  );
}
