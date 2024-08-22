import { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";
import { Button, TextField, Typography } from "@mui/material";
import { rejectContract } from "@/modules/contracts/service";
import CloseIcon from "@mui/icons-material/Close";
import { notifyError, notifySuccess } from "../toastify/toastify";
export default function SubfrmRejectContract({isOpen, onClose, frmData, reload, setReload}) {
    const [formData, setFormData] = useState(frmData);
    useEffect(() => {
        setFormData(frmData);
    }, [frmData]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
     
        rejectContract(formData.contractId, formData.employeeId, formData.reasonForRejection).then((res) => {
            if (res.status === 200) {
              notifySuccess("Đã từ chối đơn đăng ký");
              setReload(!reload);
            } else {
              notifyError("Từ chối đơn đăng ký");
              console.log(res.data);
            }
          });
        onClose();
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
            <div className="text-right mb-2 cursor-pointer">
          <CloseIcon onClick={onClose}></CloseIcon>
        </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <Typography variant="h5" sx={{mb: 2, textAlign: "center"}}>Từ chối đơn đăng ký</Typography>
                <TextField multiline rows={4} label="Lý do từ chối" name="reasonForRejection" onChange={handleChange} value={formData.reasonForRejection} variant="outlined"></TextField>
                <Button type="submit">Xác nhận từ chối</Button>
            </form>
            </Modal>
    )
}