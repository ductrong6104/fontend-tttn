// components/SubformModal.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import InputCustome from "../input/input";
import ButtonCustome from "../button/button";

import { customStyles } from "./styleSubfrm";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { max } from "date-fns";

import { notifyError, notifySuccess } from "../toastify/toastify";
import {
  checkEmailExists,
  checkIdentityCardExists,
  checkPhoneExists,
  updateEmployee,
} from "@/modules/employees/service";
import { debounce } from "lodash";
import { getCoordinatesFromAddress } from "@/modules/maps/service";

const resignations = [
  { value: true, label: "Đã nghỉ việc" },
  { value: false, label: "Làm việc bình thường" },
];
const nameRegex = /^[\p{L}\s]+$/u;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
const identityCardRegex = /^(0)([0-9]{11})$/;
const SubfrmEditEmployee = ({
  isOpen,
  onClose,
  frmData,
  reload,
  setReload,
}) => {
  const [formData, setFormData] = useState(frmData);
  useEffect(() => {
    setFormData(frmData);
  }, [frmData]);
  const [isLoading, setIsLoading] = useState(false);
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
  // const debouncedCheckEmailExists = useCallback(
  //   debounce(async (email) => {
  //     setCheckingEmail(true);
  //     try {
  //       if (!emailRegex.test(email)) {
  //         setEmailError("Email không hợp lệ, ví dụ: trong@gmail.com");
  //         setEmailExists(true);
  //         return;
  //       }
  //       const res = await checkEmailExists({ email });
  //       if (res.status === 200) {
  //         const statusExist = res.data.exists;
  //         if (frmData.email === email) {
  //           setEmailExists(false);
  //           setEmailError("");
  //         } else {
  //           setEmailExists(statusExist);
  //           setEmailError(
  //             statusExist === true ? "Email đã tồn tại" : "Email thích hợp"
  //           );
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error checking email:", error);
  //     } finally {
  //       setCheckingEmail(false);
  //     }
  //   }, 500),
  //   []
  // );

  // const debouncedCheckPhoneExists = useCallback(
  //   debounce(async (phone) => {
  //     setCheckingPhone(true);
  //     try {
  //       if (!phoneRegex.test(phone)) {
  //         setPhoneError(
  //           "Điện thoại chứa 10 số có đầu 03, 09; ví dụ: 0962522522"
  //         );
  //         setPhoneExists(true);
  //         return;
  //       }
  //       const res = await checkPhoneExists(phone);
  //       if (res.status === 200) {
  //         const statusExist = res.data.exists;
  //         console.log(`statusExist: ${statusExist}`);
  //         if (frmData.phone === phone) {
  //           setPhoneExists(false);
  //           setPhoneError("");
  //         } else {
  //           setPhoneExists(statusExist);
  //           setPhoneError(
  //             statusExist === true ? "SĐT đã tồn tại" : "SĐT thích hợp"
  //           );
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error checking phone:", error);
  //     } finally {
  //       setCheckingPhone(false);
  //     }
  //   }, 500),
  //   []
  // );

  // const debouncedCheckIdentityCardExists = useCallback(
  //   debounce(async (identityCard) => {
  //     setCheckingIdentityCard(true);
  //     try {
  //       if (!identityCardRegex.test(identityCard)) {
  //         setIdentityCardError(
  //           "Căn cước công dân có 12 số, đầu 0, ví dụ: 052226217914"
  //         );
  //         setIdentityCardExists(true);
  //         return;
  //       }
  //       const res = await checkIdentityCardExists(identityCard);
  //       if (res.status === 200) {
  //         const statusExist = res.data.exists;
  //         if (frmData.identityCard === identityCard) {
  //           setIdentityCardExists(false);
  //           setIdentityCardError("");
  //         } else {
  //           setIdentityCardExists(statusExist);
  //           setIdentityCardError(
  //             statusExist === true ? "CMND đã tồn tại" : "CMND thích hợp"
  //           );
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error checking identity card:", error);
  //     } finally {
  //       setCheckingIdentityCard(false);
  //     }
  //   }, 500),
  //   []
  // );
  // useEffect(() => {
  //   if (formData.email) {
  //     debouncedCheckEmailExists(formData.email);
  //   }
  // }, [formData.email, debouncedCheckEmailExists]);

  // useEffect(() => {
  //   if (formData.phone) {
  //     debouncedCheckPhoneExists(formData.phone);
  //   }
  // }, [formData.phone, debouncedCheckPhoneExists]);

  // useEffect(() => {
  //   if (formData.identityCard) {
  //     debouncedCheckIdentityCardExists(formData.identityCard);
  //   }
  // }, [formData.identityCard, debouncedCheckIdentityCardExists]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic khi submit subform
    if (validateForm()) {
      console.log("Form submitted:", JSON.stringify(formData));
      updateEmployee(formData).then((res) => {
        if (res.status === 200) {
          notifySuccess("Cập nhật nhân viên thành công.");
          setReload(!reload);
          onClose();
        } else {
          notifyError("Cập nhật nhân viên thất bại");
          console.log(`Error: ${res.data}`);
        }
      });
    }

    // onClose(); // Đóng modal sau khi submit thành công
  };
  const validateForm = () => {
    if (!nameRegex.test(formData.firstName)) {
      notifyError("Họ không chứa ký tự số");
      return false;
    }
    if (!nameRegex.test(formData.lastName)) {
      notifyError("Tên không chứa ký tự số");
      return false;
    }
    // if (emailExists){
    //   notifyError('Email không hợp lệ!')
    //   emailInputRef.current.focus();
    //   return false;
    // }
    // if (phoneExists){
    //   notifyError('Số điện thoại không hợp lệ!')
    //   phoneInputRef.current.focus();
    //   return false;
    // }
    // if (identityCardExists){
    //   notifyError('Căn cước công dân không hợp lệ!')
    //   identityCardInputRef.current.focus();
    //   return false;
    // }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const generateNewCoordinates = async () => {
    console.log(`formData: ${JSON.stringify(formData)}`);
    setIsLoading(true);
    try {
      const res = await getCoordinatesFromAddress(formData.address);
      if (res.length > 0)
        setFormData((prevData) => ({
          ...prevData,
          longitude: res[0].lon,
          latitude: res[0].lat,
        }));
      else {
        notifyError("No coordinates found for the address");
      }
    } catch (error) {
      console.error("Failed to get coordinates", error);
    } finally {
      setIsLoading(false);
    }
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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

          <div className="mb-2">
            <label className="w-1/2">Căn cước công dân:</label>
            <InputCustome
              type="text"
              name="identityCard"
              value={formData.identityCard}
              onChange={handleChange}
              ref={identityCardInputRef}
            ></InputCustome>
            {checkingIdentityCard === true && <span>Checking...</span>}
            {identityCardError && (
              <span
                className={`${
                  identityCardExists === true
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {identityCardError}
              </span>
            )}
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
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <FormLabel component="legend">Giới tính:</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <Box display="flex" flexDirection="row">
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Nữ"
                  />
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
          <div className=" mb-2 ">
            <label className="w-1/2">Số điện thoại:</label>
            <InputCustome
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              ref={phoneInputRef}
            ></InputCustome>
            {checkingPhone === true && <span>{checkingPhone}</span>}
            {phoneError && (
              <span
                className={`${
                  phoneExists === true ? "text-red-500" : "text-green-500"
                }`}
              >
                {phoneError}
              </span>
            )}
          </div>
          <div className="mb-2">
            <label className="w-1/2">Email:</label>
            <InputCustome
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              ref={emailInputRef}
            ></InputCustome>
            {checkingEmail === true && <span>Checking...</span>}
            {emailError && (
              <span
                className={`${
                  emailExists === true ? "text-red-500" : "text-green-500"
                }`}
              >
                {emailError}
              </span>
            )}
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
          <TextField
            sx={{ mb: 2 }}
            label="Kinh độ"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            type="text"
          ></TextField>
          <TextField
            sx={{ mb: 2 }}
            label="Vĩ độ"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            type="text"
          ></TextField>

          {/* Thêm các trường khác của subform */}
          <div className="flex justify-end">
            <Button
              type="button"
              sx={{ color: "green" }}
              onClick={generateNewCoordinates}
            >
              Xuất tọa độ
            </Button>
            <ButtonCustome ButtonCustome type="submit" className="bg-green-500">
              Lưu
            </ButtonCustome>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default SubfrmEditEmployee;
