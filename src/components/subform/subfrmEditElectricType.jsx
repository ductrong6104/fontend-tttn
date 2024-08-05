import { Button, TextField } from "@mui/material";
import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";
import { useEffect, useState } from "react";
import { updateElectricType } from "@/modules/electric-types/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
import CloseIcon from '@mui/icons-material/Close';
export default function SubfrmEditElectricType({isOpen, onClose, frmData, reload, setReload}) {
    const [formData, setFormData] = useState(frmData);
    useEffect(() => {
        setFormData(frmData);
    }, [frmData]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        updateElectricType(formData.id, formData).then((res) => {
            if (res.status === 200) {
                notifySuccess("Cập nhật loại điện thành công")
                setReload(!reload);
                onClose();
            }
            else{
                notifyError("Tên loại điện đã được sử dụng")
                
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
                <div className="text-right mb-2 cursor-pointer">

                <CloseIcon onClick={onClose}></CloseIcon>
                </div>
                <TextField className="mb-2" label="Tên loại điện" name="name" value={formData.name} onChange={handleChange} required></TextField>
                <div className="text-right">

                    <Button type="submit">Cập nhật</Button>
                </div>
            </form>
        </Modal>
    )
}