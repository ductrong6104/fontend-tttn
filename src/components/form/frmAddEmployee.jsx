// pages/form.js
"use client";
import { useState } from "react";
import ButtonCustome from "../button/button";
import InputCustome from "../input/input";
import { createEmployee } from "@/modules/employees/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { LiaEyeSolid } from "react-icons/lia";
import { FaEyeSlash } from "react-icons/fa";

export default function FrmAddEmployee({ reload, setReload }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identityCard: "",
    address: "",
    gender: "",
    birthday: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    passwordAgain: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    createEmployee(formData).then((res) => {
      if (res.status === 201) {
        notifySuccess("Thêm nhan viên thanh cong");
        setReload(!reload);
      } else {
        notifyError("Thêm nhan viên that bai");
        console.log(res.data);
      }
    });
    // Add form submission logic here
  };
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      identityCard: "",
      address: "",
      gender: "",
      birthday: "",
      phone: "",
      email: "",
      username: "",
      password: "",
      passwordAgain: "",
    });
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
              placeholder="Nhập số căn cước 12 số (vd: 052202123125)"
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
          <div>
            <label className="block">Tài khoản:</label>
            <InputCustome
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className=""
              required
            ></InputCustome>
          </div>
        </div>

        <div className="w-1/2">
          <div>
            <label className="block">Giới tính:</label>
            <div
              className="space-x-4 p-2 border-2 "
              style={{ borderColor: "#DCE0E1" }}
            >
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
              placeholder="Nhập số điện thoại 10 số (vd: 0123456789)"
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
              placeholder="Nhập địa chỉ email"
              required
            ></InputCustome>
          </div>
          <div>
            <label className="block">Mật khẩu:</label>
            <div className="flex items-center">

              <InputCustome
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className=""
                placeholder={showPassword ? "Hãy nhập mật khẩu" : "********"}
                required
              ></InputCustome>
              <FaEyeSlash className={`cursor-pointer absolute end-0 mr-20 ${showPassword ? "invisible" : "visible"}`} onClick={() => setShowPassword(true)}></FaEyeSlash>
              <LiaEyeSolid className={`cursor-pointer absolute end-0 mr-20 ${showPassword ? "visible" : "invisible"}`} onClick={() => setShowPassword(false)}></LiaEyeSolid>
            </div>
            
            
            
          </div>
          <div>
            <label className="block">Nhập lại mật khẩu:</label>
            <div className="flex items-center">
            <InputCustome
              type={showPasswordAgain ? "text" : "password"}
              name="passwordAgain"
              value={formData.passwordAgain}
              onChange={handleChange}
              className=""
              placeholder={showPasswordAgain ? "Hãy nhập lại mật khẩu" : "********"}
              required
            ></InputCustome>
            <FaEyeSlash className={`cursor-pointer absolute end-0 mr-20 ${showPasswordAgain ? "invisible" : "visible"}`} onClick={() => setShowPasswordAgain(true)}></FaEyeSlash>
            <LiaEyeSolid className={`cursor-pointer absolute end-0 mr-20 ${showPasswordAgain ? "visible" : "invisible"}`} onClick={() => setShowPasswordAgain(false)}></LiaEyeSolid>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ButtonCustome type="submit" className="mr-2 bg-green-400">
          Thêm
        </ButtonCustome>

        <ButtonCustome className="mr-2 bg-stone-300" onClick={resetForm}>
          Reset
        </ButtonCustome>
      </div>
    </form>
  );
}
