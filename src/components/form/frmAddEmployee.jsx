// pages/form.js
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ButtonCustome from "../button/button";
import InputCustome from "../input/input";
import { createEmployee } from "@/modules/employees/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { LiaEyeSolid } from "react-icons/lia";
import { FaEyeSlash } from "react-icons/fa";
import MapAddressEmployee from "../map/MapAddressEmployee";
import { debounce } from "lodash";
const nameRegex = /^[\p{L}\s]+$/u;
const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const identityCardRegex = /^(0)([0-9]{11})$/;
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
    roleId: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [position, setPosition] = useState({
    lat: 10.8535886,
    lng: 106.7878561,
  });
  const handleChangeAddress = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["address"]: value,
    }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

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
        if (!emailRegex.test(email)) {
          setEmailError("Email không hợp lệ, ví dụ: trong@gmail.com");
          return;
        } else {
          setEmailError("");
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
        if (!phoneRegex.test(phone)) {
          setPhoneError(
            "Điện thoại chứa 10 số có đầu 03, 09; ví dụ: 0962522522"
          );
          return;
        } else {
          setPhoneError("");
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
        if (!identityCardRegex.test(identityCard)) {
          setIdentityCardError(
            "Căn cước công dân có 12 số, đầu 0, ví dụ: 052226217914"
          );
          return;
        } else {
          setIdentityCardError("");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(JSON.stringify(formData));
      setFormData((prevData) => {
        const updatedData = {
          ...prevData,
          roleId: 2,
          longitude: position.lon,
          latitude: position.lat,
        };
        createEmployee(formData).then((res) => {
          if (res.status === 201) {
            notifySuccess("Thêm nhân viên thành công");
            setReload(!reload);
          } else {
            notifyError("Thêm nhân viên thất bại");
            console.log(res.data);
          }
        });
        return updatedData;
      });
    }

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

  const validateForm = () => {
    if (!nameRegex.test(formData.firstName)) {
      alert("Họ không chứa ký tự số");
      return false;
    }
    if (!nameRegex.test(formData.lastName)) {
      alert("Tên không chứa ký tự số");
      return false;
    }
    if (!passwordAgain === formData.password) {
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
              ref={identityCardInputRef}
            ></InputCustome>
            {checkingIdentityCard && <span>Checking...</span>}
            {identityCardError && (
              <span
                className={`${
                  identityCardExists ? "text-red-500" : "text-red-500"
                }`}
              >
                {identityCardError}
              </span>
            )}
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
          <div className="">
            <MapAddressEmployee
              addresses={addresses}
              onChangeAddress={handleChangeAddress}
              onChangePosition={setPosition}
              defaultPosition={position}
            ></MapAddressEmployee>
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
              ref={phoneInputRef}
            ></InputCustome>
            {checkingPhone && <span>{checkingPhone}</span>}
            {phoneError && (
              <span
                className={`${phoneExists ? "text-red-500" : "text-red-500"}`}
              >
                {phoneError}
              </span>
            )}
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
              ref={emailInputRef}
            ></InputCustome>
            {checkingEmail && <span>Checking...</span>}
            {emailError && (
              <span
                className={`${emailExists ? "text-red-500" : "text-red-500"}`}
              >
                {emailError}
              </span>
            )}
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
              <FaEyeSlash
                className={`cursor-pointer absolute end-0 mr-20 ${
                  showPassword ? "invisible" : "visible"
                }`}
                onClick={() => setShowPassword(true)}
              ></FaEyeSlash>
              <LiaEyeSolid
                className={`cursor-pointer absolute end-0 mr-20 ${
                  showPassword ? "visible" : "invisible"
                }`}
                onClick={() => setShowPassword(false)}
              ></LiaEyeSolid>
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
                placeholder={
                  showPasswordAgain ? "Hãy nhập lại mật khẩu" : "********"
                }
                required
              ></InputCustome>
              <FaEyeSlash
                className={`cursor-pointer absolute end-0 mr-20 ${
                  showPasswordAgain ? "invisible" : "visible"
                }`}
                onClick={() => setShowPasswordAgain(true)}
              ></FaEyeSlash>
              <LiaEyeSolid
                className={`cursor-pointer absolute end-0 mr-20 ${
                  showPasswordAgain ? "visible" : "invisible"
                }`}
                onClick={() => setShowPasswordAgain(false)}
              ></LiaEyeSolid>
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
