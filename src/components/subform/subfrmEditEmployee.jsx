// components/SubformModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import InputCustome from "../input/input";
import ButtonCustome from "../button/button";

import { customStyles } from "./styleSubfrm";

const SubfrmEditEmployee = ({ isOpen, onClose, formData }) => {
  

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
        <div className="flex justify-between mb-2 items-center">
          <label className="w-1/2">Giới tính:</label>
          <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  checked={formData.gender === "false"}
                  onChange={handleChange}
                  required
                />
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="true"
                  checked={formData.gender === "true"}
                  onChange={handleChange}
                  required
                />
                Nữ
              </label>
            </div>
        </div>
        <div className="flex justify-between mb-2 items-center">
          <label className="w-1/2">Ngày sinh:</label>
          <InputCustome
            type="date"
            name="birthday"
            value={formData.identityCard}
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
