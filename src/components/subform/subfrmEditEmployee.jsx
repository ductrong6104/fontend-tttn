// components/SubformModal.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import InputCustome from "../input/input";
import ButtonCustome from "../button/button";

import { customStyles } from "./styleSubfrm";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { max } from "date-fns";

const resignations = [
  { value: true, label: "Đã nghỉ việc" },
  { value: false, label: "Làm việc bình thường" },
];
const SubfrmEditEmployee = ({ isOpen, onClose, frmData }) => {
  const [formData, setFormData] = useState(frmData);
  useEffect(() => {
    setFormData(frmData);
  }, [frmData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic khi submit subform
    console.log("Form submitted:", formData);
    onClose(); // Đóng modal sau khi submit thành công
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Subform Modal"
    >
      <div className="flex justify-end">
        <button type="button" onClick={onClose}>
          Đóng
        </button>
      </div>
      <div className="flex justify-center mb-2">
        <div className="text-xl text-blue-600">
          Chỉnh sửa thông tin nhân viên
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Các trường dữ liệu nhập */}
        <div className="flex justify-between">
          <div className="flex justify-between mb-2 items-center mr-2">
            <label className="w-1/5">Họ:</label>
            <InputCustome
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            ></InputCustome>
          </div>
          <div className="flex justify-between mb-2 items-center">
            <label className="w-1/5">Tên:</label>
            <InputCustome
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            ></InputCustome>
          </div>
        </div>

        <div className="flex justify-between mb-2 items-center">
          <label className="w-1/2">Căn cước công dân:</label>
          <InputCustome
            type="text"
            name="identityCard"
            value={formData.identityCard}
            onChange={handleChange}
          ></InputCustome>
        </div>
        <div className="flex justify-between mb-2 items-center">
          <label className="w-1/2">Địa chỉ:</label>
          <InputCustome
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></InputCustome>
        </div>
        
        <FormControl component="fieldset" fullWidth>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">

            <FormLabel component="legend">Giới tính:</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
  
            >
              <Box display="flex" flexDirection="row">

                <FormControlLabel value="false" control={<Radio />} label="Nam" />
                <FormControlLabel value="true" control={<Radio />} label="Nữ" />
              </Box>
         
            </RadioGroup>
            </Box>
        </FormControl>
        <div className="flex justify-between mb-2 items-center">
          <label className="w-1/2">Ngày sinh:</label>
          <InputCustome
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          ></InputCustome>
        </div>
        <div className="flex justify-between mb-2 items-center">
          <label className="w-1/2">Số điện thoại:</label>
          <InputCustome
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          ></InputCustome>
        </div>
        <div className="flex justify-between mb-2 items-center">
          <label className="w-1/2">Email:</label>
          <InputCustome
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></InputCustome>
        </div>
        <FormControl fullWidth margin="normal">
          <InputLabel>Tình trạng:</InputLabel>
          <Select
            value={formData.resignation}
            onChange={handleChange}
            name="resignation"
            required
            label="Tình trạng"
          >
            {resignations.map((resignation) => (
              <MenuItem key={resignation.value} value={resignation.value}>
                {resignation.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Thêm các trường khác của subform */}
        <div className="flex justify-end">
          <ButtonCustome ButtonCustome type="submit" className="bg-green-500">
            Lưu
          </ButtonCustome>
        </div>
      </form>
    </Modal>
  );
};

export default SubfrmEditEmployee;
