import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";
import CloseIcon from "@mui/icons-material/Close";
import { updateElectricRecordingFirst } from "@/modules/electric-recordings/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
export default function SubfrmRecordingByEmployee({isOpen, onClose, frmData, reload, setReload}) {
    const [formData, setFormData] = useState(frmData);
    useEffect(()=>{
        setFormData(frmData);
    }, [frmData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        updateElectricRecordingFirst(formData).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              notifySuccess("Ghi điện thành công");
              setReload(!reload);
            } else {
              notifyError("Ghi điện thất bại");
              console.log(res.data);
            }
          });
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
            <form onSubmit={handleSubmit}>

                <div className="text-right mb-2 cursor-pointer">
                    <CloseIcon onClick={onClose}></CloseIcon>
                </div>  
                <Typography sx={{mb: 2}}>Ngày ghi chỉ số điện: {new Date().toISOString().split('T')[0]}</Typography>
                <TextField sx={{mb: 2}} label="Mã đồng hồ" name="powerMeterId" value={`${formData.powerMeterId}`} onChange={handleChange} inputProps={{readOnly: true}}></TextField>
                <TextField sx={{mb: 2}} label="Chỉ số cũ" name="oldIndex" value={formData.oldIndex} onChange={handleChange} inputProps={{readOnly: true}} type="number"></TextField>
                <TextField sx={{mb: 2}} label="Chỉ số mới" name="newIndex" value={formData.newIndex} onChange={handleChange} type="number" inputProps={{min: formData.oldIndex}}></TextField>
                <Button type="submit">Lưu ghi điện</Button>
            </form>
        </Modal>
    )
}