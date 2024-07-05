// pages/form.js
"use client";
import { useState } from "react";
import ButtonCustome from "../button/button";
import InputCustome from "../input/input";

export default function FrmAddEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identityCard: "",
    address: "",
    gender: "",
    birthday: "",
    phone: "",
    email:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));

    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-row justify-between">
        <div className="w-1/2 mr-4">
          <div>
            <label className="block">Họ:</label>
            <InputCustome
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className=""
              required
            ></InputCustome>
          </div>
          <div>
            <label className="block">Tên:</label>
            <InputCustome
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className=""
              required
            ></InputCustome>
          </div>
          <div>
            <label className="block">Căn cước công dân:</label>
            <InputCustome
              type="text"
              name="identityCard"
              value={formData.identityCard}
              onChange={handleChange}
              className=""
              required
            ></InputCustome>
          </div>
          <div>
            <label className="block">Địa chỉ:</label>
            <InputCustome
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className=""
              required
            ></InputCustome>
          </div>
        </div>

        <div className="w-1/2">
          <div>
            <label className="block">Giới tính:</label>
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
          <div>
            <label className="block">Ngày sinh:</label>
            <InputCustome
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className=""
              required
            ></InputCustome>
          </div>
          <div>
            <label className="block">Số điện thoại:</label>
            <InputCustome
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className=""
              required
            ></InputCustome>
          </div>
          <div>
            <label className="block">Email:</label>
            <InputCustome
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className=""
              required
            ></InputCustome>
          </div>
        </div>
      </div>

      <div>
        <ButtonCustome type="submit" className="mr-2 bg-green-400">
          Thêm
        </ButtonCustome>
        <ButtonCustome className="mr-2 bg-orange-200">Sửa</ButtonCustome>
        <ButtonCustome className="mr-2 bg-stone-300">Reset</ButtonCustome>
      </div>
    </form>
  );
}
