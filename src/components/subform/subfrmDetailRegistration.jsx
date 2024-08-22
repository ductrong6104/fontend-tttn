import { useEffect, useState } from "react";
import { customStyles } from "./styleSubfrm";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Typography } from "@mui/material";
import { getClientById } from "@/modules/clients/service";
import { cuttingString } from "@/utils/formatDate";
export default function SubfrmDetailRegistration({
  isOpen,
  onClose,
  frmData,
  reload,
  setReload,
}) {
  const [formData, setFormData] = useState(frmData);

  useEffect(() => {
    setFormData(frmData);

    console.log(`formData: ${JSON.stringify(formData)}`);
  }, [frmData]);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
      <div className="text-right mb-4 cursor-pointer">
        <CloseIcon onClick={onClose}></CloseIcon>
      </div>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>Chi tiết đơn đăng ký</Typography>
      <form>
        <div className="flex mb-4">
          <TextField
            label="Mã đơn đăng ký"
            name="id"
            value={formData.id}
            type="text"
            inputProps={{ readOnly: true }}
            sx={{ mr: 2, width: "50%" }}
          ></TextField>
          <TextField
            label="Mã-Họ tên khách hàng"
             type="text"
            name="idAndFullName"
            value={formData.idAndFullName}
            inputProps={{ readOnly: true }}
          ></TextField>
        </div>
        <div className="flex mb-4">
          <TextField
            label="Ngày gửi đơn đăng ký"
             type="date"
            name="startDate"
            value={formData.startDate}
            inputProps={{ readOnly: true }}
            sx={{ mr: 2, width: "50%" }}
          ></TextField>
          <TextField
            label="Địa chỉ cung cấp điện"
            name="electricitySupplyAddress"
             type="text"
            value={formData.electricitySupplyAddress}
            inputProps={{ readOnly: true }}
           
          ></TextField>
        </div>
        <div className="flex mb-4">
          <TextField
            label="Loại điện"
             type="text"
            name="electricTypeName"
            value={formData.electricTypeName}
            inputProps={{ readOnly: true }}
            sx={{ mr: 2, width: "50%" }}
          ></TextField>
          <TextField hidden></TextField>
        </div>
        <TextField
          label="Lý do từ chối"
           type="text"
          multiline
          rows={3}
          name="reasonForRejection"
          value={formData.reasonForRejection}
          inputProps={{ readOnly: true }}
            sx={{ width: "100%", mb: 2 }}
          fullWidth
        ></TextField>
        <div className="flex mb-4">
          <TextField
            label="Số điện thoại"
            name="phone"
            value={formData.phone}
            inputProps={{ readOnly: true }}
            sx={{ mr: 2, width: "50%" }}
             type="text"
               variant="outlined"
          ></TextField>
          <TextField
            label="Căn cước công dân"
            name="identityCard"
            value={formData.identityCard}
            inputProps={{ readOnly: true }}
             type="text"
             variant="outlined"
          ></TextField>
        </div>
        <div className="flex mb-4">
          <TextField
            label="Ngày sinh"
            name="birthday"
            value={formData.birthday}
            type="date"
            inputProps={{ readOnly: true}}
            sx={{ mr: 2, width: "50%" }}
              variant="outlined"
          ></TextField>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            inputProps={{ readOnly: true }}
             type="text"
               variant="outlined"
          ></TextField>
        </div>
      </form>
    </Modal>
  );
}
