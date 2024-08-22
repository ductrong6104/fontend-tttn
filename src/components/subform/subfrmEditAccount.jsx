import { Button, TextField, Typography } from "@mui/material";
import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";
import { useEffect, useState } from "react";

import { notifyError, notifySuccess } from "../toastify/toastify";
import CloseIcon from "@mui/icons-material/Close";
import {updateLevel} from "@/modules/levels/service";
import InputCustome from "../input/input";
import { FaEyeSlash } from "react-icons/fa";
import { LiaEyeSolid } from "react-icons/lia";
import ComboboxComponent from "../combobox/comboboxComponent";
import { updateAccount } from "@/modules/accounts/service";
const disableds = [
    {value: false, label: "Hoạt động"},
    {value: true, label: "Ngừng hoạt động"},
]
export default function SubfrmEditAccount({
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
    if (formData.disabled === '')
        formData.disabled = frmData.disabled
    // Chuyển đổi chuỗi thành double (số thực)
    updateAccount(formData.id, formData).then((res) => {
        if (res.status === 200) {
          notifySuccess("Cập nhật trạng thái tài khoản thành công");
          setReload(!reload);
          onClose();
        } else {
          notifyError("Cập nhật trạng thái tài khoản thất bại");
          console.log(res.data);
        }
      });
}

  
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
        
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="text-right mb-2 cursor-pointer">
          <CloseIcon onClick={onClose}></CloseIcon>
        </div>
        <Typography variant="h5" sx={{mb: 2}}>Cập nhật bậc</Typography>
        <ComboboxComponent options={disableds} label={"Thay đổi trạng thái"} name="disabled" value={formData.disabled} onChange={handleChange}/>
        <div className="text-right">
          <Button type="submit">Cập nhật</Button>
        </div>
      </form>
    </Modal>
  );
}
