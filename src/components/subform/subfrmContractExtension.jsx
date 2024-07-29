import { customStyles } from "./styleSubfrm";
import Modal from "react-modal";
import InputCustome from "../input/input";
import { useState } from "react";
import ButtonCustome from "../button/button";
export default function SubfrmContractExtension({isOpen, onClose}) {
    const [formData, setFormData] = useState({
        endDate: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
            <div className="flex justify-end">
                <button type="button" onClick={onClose}>
                Đóng
                </button>
            </div>
            <div className="flex justify-center mb-2">
                <div className="text-xl text-blue-600">
                Gia hạn hợp đồng
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between">
                    <div className="flex justify-between mb-2 items-center mr-2">
                    <label className="w-2/3">Ngày kết thúc</label>
                    <InputCustome
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    ></InputCustome>
                    </div>
                </div>
                <div className="flex justify-end">
          <ButtonCustome ButtonCustome type="submit" className="bg-green-500">
            Lưu
          </ButtonCustome>
        </div>
            </form>
        </Modal>
    );
}