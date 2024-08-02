import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";
import InputCustome from "../input/input";
import { useState, useEffect } from "react";
import ButtonCustome from "../button/button";
import { createNewBill } from "@/modules/bills/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
export function SubfrmAddBill({ isOpen, onClose, reload, setReload, frmData }) {
  const [formData, setFormData] = useState(frmData);

  const getPaymentDueDate = (invoiceDateStr) => {
    // Chuyển đổi invoiceDate thành đối tượng ngày
    const invoiceDate = new Date(invoiceDateStr);
  
    // Tạo đối tượng ngày cho ngày 5 của tháng hiện tại
    const currentYear = invoiceDate.getFullYear();
    const currentMonth = invoiceDate.getMonth();
    const fifthOfCurrentMonth = new Date(currentYear, currentMonth, 6);
  
  
    let paymentDueDate;
  
   if (invoiceDate > fifthOfCurrentMonth) {
      // Nếu invoiceDate lớn hơn ngày 5 của tháng hiện tại nhưng không vượt quá ngày 5 của tháng kế tiếp
      paymentDueDate = new Date(fifthOfCurrentMonth);
      paymentDueDate.setDate(fifthOfNextMonth.getDate() + 5); // Cộng thêm 5 ngày
    } else {
      // Nếu invoiceDate nhỏ hơn hoặc bằng ngày 5 của tháng hiện tại
      paymentDueDate = new Date(fifthOfCurrentMonth);
    }
  
    // Chuyển đổi đối tượng ngày thành chuỗi theo định dạng YYYY-MM-DD
    return paymentDueDate.toISOString().split('T')[0];
  };
  // cập nhật formDate khi frmData thay đổi từ form cha
  useEffect(() => {
    console.log(`frmData`, frmData);
    frmData.paymentDueDate = getPaymentDueDate(frmData.invoiceDate);
    setFormData(frmData);
}, [frmData]); 
  const handleSubmit = (e) => {
    // Xu ly logic khi submit subform
    e.preventDefault();
    console.log("Form submitted:", JSON.stringify(formData));
    createNewBill(formData).then((res) => {
      if (res.status === 201) {
        notifySuccess("Xuất hóa đơn mới thanh cong");
        setReload(!reload);
        onClose();
      } else {
        notifyError("Xuất hóa đơn thất bại");
        console.log(res.data);
      }
    })
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
      <div className="flex justify-end">
        <button type="button" onClick={onClose}>
          Đóng
        </button>
      </div>
      <div className="flex justify-center mb-2">
        <div className="text-xl text-blue-600">
          Xuất hóa đơn
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Các trường dữ liệu nhập */}
        
        
        
        <div className="flex justify-between mb-2 items-center">
          <label className="w-1/2">Ngày lập hóa đơn: </label>
          <InputCustome
            type="date"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleChange}
            readOnly={true}
          ></InputCustome>
        </div>
        <div className="flex justify-between mb-2 items-center">
          <label className="w-1/2">Ngày hạn thanh toán:</label>
          <InputCustome
            type="date"
            name="paymentDueDate"
            value={formData.paymentDueDate}
            onChange={handleChange}
            required={true}
            min={formData.invoiceDate}
          ></InputCustome>
        </div>
       
        <div className="flex justify-between mb-2 items-center">
          <label className="w-1/2">Tổng tiền:</label>
          <InputCustome
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            readOnly={true}
          ></InputCustome>
        </div>

        {/* Thêm các trường khác của subform */}
        <div className="flex justify-end">
          <ButtonCustome ButtonCustome type="submit" className="bg-green-500">
            Xuất hóa đơn
          </ButtonCustome>
        </div>
      </form>
    </Modal>
  );
}
