'use client'
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import InputCustome from "../input/input";
import { LiaEyeSolid } from "react-icons/lia";
import Divider from "../divider/divider";
import ButtonCustome from "../button/button";
import { FaEyeSlash } from "react-icons/fa";
import { sigin } from "@/modules/accounts/service";
import { notifyError, notifySuccess } from "../toastify/toastify";

export default function FrmSigin() {
    const [formData, setFormData] = useState({
        "username": "",
        "password": "",
        "roleId": "1",
    })
  
    const [isCheckedSavePass, setIsCheckedSavePass] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {login} = useAuth();
    const router = useRouter();
    const [isManager, setIsManager] = useState(true);
    const handleCheckedSavePass = () => {
      setIsCheckedSavePass(!isCheckedSavePass);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      // Xử lý logic khi submit subform
      console.log("Form submitted:", formData);
      if (isManager)
        formData.roleId = 1;
      else 
        formData.roleId = 2;
      sigin(formData).then((res) => {
        if (res.status === 200) {
          login(res.data.username, res.data.accountId, res.data.clientId);
          if (isManager) {
            router.push("/manager/home");
          }
          else {
            router.push("/employee/home");
          }
          notifySuccess('Đăng nhập thành công');
          
          
          
        }
        else if (res.status === 701){
          notifyError("Tài khoản chưa được đăng ký");
        }
        else if (res.status === 702){
          notifyError("Mật khẩu sai");
        }
        else if (res.status === 704){
          notifyError("Tài khoản này không dành cho quản lý");
        }
        else if (res.status === 705){
          notifyError("Tài khoản này không dành cho nhân viên");
        }
        else if (res.status == 706){
          notifyError("Tài khoản này đã bị vô hiệu hóa! Vui lòng liên hệ quản lý");
          console.log('a');
        }
      });
      
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleClickRegis = () => {
      router.push("/signup");
    }
    return (
      <div className="flex justify-center items-center">
     
        
  
        <form onSubmit={handleSubmit}  style={{width: '500px',
        height: '100vh',
    
      }}>
          {/* Các trường dữ liệu nhập */}
          
          <div className="mb-4">
          <div className="text-xl text-blue-600 font-bold">
            ĐĂNG NHẬP TÀI KHOẢN
          </div>
        </div>
          <div className="mb-4">
            <label className="">Tài khoản:</label>
            <InputCustome
              type="text"
              name="username"
              value={formData.username}
              className="w-full"
              onChange={handleChange}
              required
            ></InputCustome>
          </div>
          <div className="mb-2">
            <label className="">Mật khẩu:</label>
            <div className="flex items-center relative">
  
              <InputCustome
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full"
                  placeholder={showPassword ? "Mật khẩu" : "********"}
                  required
              ></InputCustome>
              <FaEyeSlash className={`cursor-pointer absolute right-4 ${showPassword ? "invisible" : "visible"}`} onClick={() => setShowPassword(true)}></FaEyeSlash>
              <LiaEyeSolid className={`cursor-pointer absolute right-4 ${showPassword ? "visible" : "invisible"}`} onClick={() => setShowPassword(false)}></LiaEyeSolid>
            </div>
          </div>
          {/* <div className="flex justify-between mb-6">
              <label htmlFor="checkbox">
                  <input type="checkbox" checked={isCheckedSavePass} onChange={handleCheckedSavePass} />
                  Lưu mật khẩu
              </label>
              <div className="text-blue-600 cursor-pointer">Quên mật khẩu</div>
          </div> */}
          <div className="flex justify-between mb-6">
              <label htmlFor="checkbox">
                  <input type="checkbox" checked={isManager} onChange={() => setIsManager(!isManager)} />
                  Quản lý
              </label>
           
          </div>

          
          {/* Thêm các trường khác của subform */}
          <div className="flex justify-end mb-4">
            <ButtonCustome type="submit" className="bg-slate-500 w-full text-white">
              Đăng nhập
            </ButtonCustome>
          </div>
          <div className="flex justify-center items-center mb-2">
            <Divider width="10%"/>
            <div className="ml-2 mr-2">Chưa có tài khoản?</div>
            <Divider width="10%"/>
          </div>
          <div className="flex justify-end mb-4">
            {isManager && (<ButtonCustome className="bg-white border-blue-400 w-full" onClick={() => handleClickRegis()}>
              Đăng ký ngay
            </ButtonCustome>)}
            
          </div>
        
          
        </form>

       
      
      </div>
    );
  };