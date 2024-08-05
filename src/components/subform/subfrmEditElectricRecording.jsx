

import { Button, TextField, Typography } from "@mui/material";
import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";
import { useEffect, useState } from "react";
import { updateElectricType } from "@/modules/electric-types/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
import CloseIcon from '@mui/icons-material/Close';
import { updateElectricRecording } from "@/modules/electric-recordings/service";
export default function SubfrmEditElectricRecording({isOpen, onClose, frmData, reload, setReload}) {
    const [formData, setFormData] = useState(frmData);
    useEffect(() => {
        setFormData(frmData);
    }, [frmData]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", JSON.stringify(formData) );
        updateElectricRecording(formData.id, formData).then((res) => {
            if (res.status === 200) {
                notifySuccess("Cập nhật ghi điện thành công")
                setReload(!reload);
                onClose();
            }
            else{
                notifyError("Cập nhật ghi điện thất bại")
                console.log(`error:`, res.data)
            }
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="text-right mb-2 ">
                    <CloseIcon className="cursor-pointer" onClick={onClose}></CloseIcon>
                </div>
                <Typography variant="h5" sx={{mb: 2}}>Cập nhật ghi điện</Typography>
                <TextField sx={{mb: 2}} label="Mã ghi điện" name="id" value={formData.id} onChange={handleChange} InputProps={{readOnly: true}}></TextField>
                <TextField sx={{mb: 2}} label="Ngày ghi chỉ số điện" name="recordingDate" value={formData.recordingDate} onChange={handleChange} type="date"></TextField>
                <TextField sx={{mb: 2}} label="Chỉ số cũ" name="oldIndex" value={formData.oldIndex} onChange={handleChange} InputProps={{readOnly: true}}></TextField>
                <TextField sx={{mb: 2}} label="Chỉ số mới" name="newIndex" value={formData.newIndex} onChange={handleChange} InputProps={{min: formData.oldIndex}}></TextField>
                <div className="text-right">

                    <Button type="submit">Cập nhật</Button>
                </div>
            </form>
        </Modal>
    )
}