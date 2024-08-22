// components/SubformModal.js
"use client";
import React, { useState } from "react";
import InputCustome from "../input/input";
import ButtonCustome from "../button/button";
import Divider from "../divider/divider";
import { FaEyeSlash } from "react-icons/fa";
import { LiaEyeSolid } from "react-icons/lia";
import { createAccount } from "@/modules/accounts/service";
import { useEffect } from "react";
import { debounce } from "lodash";
import { useCallback } from "react";
import { useRef } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { useRouter } from "next/navigation";
import {
  checkEmailExists,
  checkIdentityCardExists,
  checkPhoneExists,
  createEmployee,
} from "@/modules/employees/service";

const nameRegex = /^[\p{L}\s]+$/u;
const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const identityCardRegex = /^(0)([0-9]{11})$/;
export default function FormSigup() {
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
    roleId: "",
  });

  const router = useRouter();

  const [isCheckedSavePass, setIsCheckedSavePass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const [passwordAgain, setPasswordAgain] = useState();
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const emailInputRef = useRef(null);

  const [phoneExists, setPhoneExists] = useState(false);
  const [checkingPhone, setCheckingPhone] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const phoneInputRef = useRef(null);

  const [identityCardExists, setIdentityCardExists] = useState(false);
  const [checkingIdentityCard, setCheckingIdentityCard] = useState(false);
  const [identityCardError, setIdentityCardError] = useState("");
  const identityCardInputRef = useRef(null);
  // useCallback được sử dụng để memoize (nhớ lại) hàm callback debounce.
  // Điều này có nghĩa là khi formData.email thay đổi,
  // React sẽ không tạo ra một phiên bản mới của debouncedCheckEmailExists mà sử dụng
  // lại phiên bản đã tồn tại trước đó nếu các dependencies của useCallback không thay đổi.
  const debouncedCheckEmailExists = useCallback(
    debounce(async (email) => {
      setCheckingEmail(true);
      try {
        setEmailExists(true);
        if (!emailRegex.test(email)) {
          setEmailError("Email không hợp lệ, ví dụ: trong@gmail.com");
          return;
        }
        const UpdateEmailRequest = { email: email };
        const res = await checkEmailExists(UpdateEmailRequest);
        if (res.status === 200) {
          console.log(res.data.exists);
          setEmailExists(res.data.exists);
          setEmailError(
            res.data.exists ? "Email đã tồn tại" : "Email thích hợp"
          );
        }
      } catch (error) {
        console.error("Error checkingEmail email:", error);
      } finally {
        setCheckingEmail(false);
      }
    }, 500),
    []
  );
  const debouncedCheckPhoneExists = useCallback(
    debounce(async (phone) => {
      setCheckingPhone(true);
      try {
        setPhoneExists(true);
        if (!phoneRegex.test(phone)) {
          setPhoneError(
            "Điện thoại chứa 10 số có đầu 03, 09; ví dụ: 0962522522"
          );
          return;
        }
        const res = await checkPhoneExists(phone);
        if (res.status === 200) {
          console.log(res.data.exists);
          setPhoneExists(res.data.exists);
          setPhoneError(res.data.exists ? "SĐT đã tồn tại" : "SĐT thích hợp");
        }
      } catch (error) {
        console.error("Error checkingPhone email:", error);
      } finally {
        setCheckingPhone(false);
      }
    }, 500),
    []
  );

  const debouncedCheckIdentityCardExists = useCallback(
    debounce(async (identityCard) => {
      setCheckingIdentityCard(true);
      try {
        setIdentityCardExists(true);
        if (!identityCardRegex.test(identityCard)) {
          setIdentityCardError(
            "Căn cước công dân có 12 số, đầu 0, ví dụ: 052226217914"
          );
          return;
        }
        const res = await checkIdentityCardExists(identityCard);
        if (res.status === 200) {
          console.log(res.data.exists);
          setIdentityCardExists(res.data.exists);
          setIdentityCardError(
            res.data.exists ? "CMND đã tồn tại" : "CMND thích hợp"
          );
        }
      } catch (error) {
        console.error("Error checkingIdentityCard email:", error);
      } finally {
        setCheckingIdentityCard(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (formData.email) {
      debouncedCheckEmailExists(formData.email);
    }
  }, [formData.email, debouncedCheckEmailExists]);

  useEffect(() => {
    if (formData.phone) {
      debouncedCheckPhoneExists(formData.phone);
    }
  }, [formData.phone, debouncedCheckPhoneExists]);

  useEffect(() => {
    if (formData.identityCard) {
      debouncedCheckIdentityCardExists(formData.identityCard);
    }
  }, [formData.identityCard, debouncedCheckIdentityCardExists]);

  const handleCheckedSavePass = () => {
    setIsCheckedSavePass(!isCheckedSavePass);
  };
  const handleSubmit = (e) => {
    // Xử lý logic khi submit subform
    e.preventDefault();
    console.log(JSON.stringify(formData));
    // roleId = 1: quản lý
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        roleId: 1,
      };
      createEmployee(updatedData).then((res) => {
        if (res.status === 201) {
          notifySuccess("Quản lý đăng ký tài khoản thành công");
          router.push("/signin");
        } else {
          notifyError("Quản lý đăng ký tài khoản thất bại");
          console.log(res.data);
        }
      });
      return updatedData;
    });
  };

  // Add form submission logic here

  // onClose(); // Đóng modal sau khi submit thành công

  const validateForm = () => {
    if (!nameRegex.test(formData.firstName)) {
      alert("Họ không chứa ký tự số");
      return false;
    }
    if (!nameRegex.test(formData.lastName)) {
      alert("Tên không chứa ký tự số");
      return false;
    }
    if (!formData.passwordAgain === formData.password) {
      alert("Mật khẩu nhập lại không phù hợp! Vui lòng kiểm tra lại");
      return false;
    }
    if (emailExists) {
      alert("Email không hợp lệ!");
      emailInputRef.current.focus();
      return false;
    }
    if (phoneExists) {
      alert("Số điện thoại không hợp lệ!");
      phoneInputRef.current.focus();
      return false;
    }
    if (identityCardExists) {
      alert("Căn cước công dân không hợp lệ!");
      identityCardInputRef.current.focus();
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickLogin = () => {
    router.push("/signin");
  };

  const handleChangePasswordAgain = (e) => {
    setPasswordAgain(e.target.value);
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="border-2 rounded-md p-4 bg-blue-100"
          style={{ width: "500px" }}
        >
          {/* Các trường dữ liệu nhập */}

          <div className="mb-4">
            <div className="text-xl text-blue-600 font-bold">
              ĐĂNG KÝ TÀI KHOẢN
            </div>
          </div>
          <div className="mb-4">
            <label className="">Số điện thoại:</label>
            <InputCustome
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="ví dụ: 0962522522"
              ref={phoneInputRef}
              required
              className="w-full"
            ></InputCustome>
            {checkingPhone && <span>{checkingPhone}</span>}
            {phoneError && (
              <span
                className={`${phoneExists ? "text-red-500" : "text-green-500"}`}
              >
                {phoneError}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex justify-between mb-2 items-center mr-2">
              <label className="w-1/5 mr-2">Họ:</label>
              <InputCustome
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full"
                required
              ></InputCustome>
            </div>
            <div className="flex justify-between mb-2 items-center">
              <label className="w-1/5 mr-2">Tên:</label>
              <InputCustome
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full"
                required
              ></InputCustome>
            </div>
          </div>
          <div className="mb-4">
            <label className="">Căn cước công dân:</label>
            <InputCustome
              type="number"
              name="identityCard"
              value={formData.identityCard}
              onChange={handleChange}
              placeholder="ví dụ: 052226217914"
              ref={identityCardInputRef}
              required
              className="w-full"
            ></InputCustome>
            {checkingIdentityCard && <span>Checking...</span>}
            {identityCardError && (
              <span
                className={`${
                  identityCardExists ? "text-red-500" : "text-green-500"
                }`}
              >
                {identityCardError}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="">Email:</label>
            <InputCustome
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ví dụ: trong@gmail.com"
              ref={emailInputRef}
              required
              className="w-full"
            ></InputCustome>
            {checkingEmail && <span>Checking...</span>}
            {emailError && (
              <span
                className={`${emailExists ? "text-red-500" : "text-green-500"}`}
              >
                {emailError}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="">Tài khoản:</label>
            <InputCustome
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full"
            ></InputCustome>
          </div>
          <div className="mb-2">
            <label className="">Mật khẩu:</label>
            <div className="flex relative items-center">
              <InputCustome
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={showPassword ? "Mật khẩu" : "********"}
                required
                className="w-full"
              ></InputCustome>
              <FaEyeSlash
                className={`cursor-pointer absolute end-0 mr-2 ${
                  showPassword ? "invisible" : "visible"
                }`}
                onClick={() => setShowPassword(true)}
              ></FaEyeSlash>
              <LiaEyeSolid
                className={`cursor-pointer absolute end-0 mr-2 ${
                  showPassword ? "visible" : "invisible"
                }`}
                onClick={() => setShowPassword(false)}
              ></LiaEyeSolid>
            </div>

            <div className="">Nhập lại mật khẩu:</div>
            <div className="flex relative items-center">
              <InputCustome
                type={showPasswordAgain ? "text" : "password"}
                name="passwordAgain"
                value={formData.passwordAgain}
                onChange={handleChange}
                placeholder={
                  showPasswordAgain ? "Nhập lại mật khẩu" : "********"
                }
                required
                className="w-full"
              ></InputCustome>
              <FaEyeSlash
                className={`cursor-pointer absolute end-0 mr-2 ${
                  showPasswordAgain ? "invisible" : "visible"
                }`}
                onClick={() => setShowPasswordAgain(true)}
              ></FaEyeSlash>
              <LiaEyeSolid
                className={`cursor-pointer absolute end-0 mr-2 ${
                  showPasswordAgain ? "visible" : "invisible"
                }`}
                onClick={() => setShowPasswordAgain(false)}
              ></LiaEyeSolid>
            </div>
          </div>

          {/* Thêm các trường khác của subform */}
          <div className="flex justify-end mb-4">
            <ButtonCustome
              type="submit"
              className="bg-slate-500 w-full text-white"
            >
              Đăng ký
            </ButtonCustome>
          </div>
          <div className="flex justify-center items-center mb-2">
            <Divider width="10%" />
            <div className="ml-2 mr-2">Quản lý đã có tài khoản?</div>
            <Divider width="10%" />
          </div>
          <div className="flex justify-end mb-4">
            <ButtonCustome
              type="button"
              className="bg-white border-blue-400 w-full"
              onClick={() => handleClickLogin()}
            >
              Đăng nhập ngay
            </ButtonCustome>
          </div>
        </form>
      </div>
    </>
  );
}
