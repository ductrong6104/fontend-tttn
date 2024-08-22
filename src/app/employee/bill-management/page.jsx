
'use client'
import TableComponent from "@/components/table/tableComponent";
import { getAllBills, getBillToGeneratePdf, getBillToGeneratePdfPayment } from "@/modules/bills/service";
import { useEffect, useState } from "react";

import { cuttingString } from "@/utils/formatDate";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { GeneratePDF, GeneratePDFBilPayment } from "@/utils/pdf";


export default function PageBillManagement(){
    const [bills, setBills] = useState([]);
  
    useEffect(()=>{
        getAllBills().then((res)=>{
            if(res.status === 200){
                setBills(res.data);
            }   
        })
    },[])

    const handleClickPayment = (row) => {
        const bill = row
         // status = true: da thanh toan cho xuat hoa don, status = false: chua thanh toan cho in thong bao tien dien
         
        if (bill.paymentStatus === true){
            console.log("xuat pdf")
            getBillToGeneratePdfPayment(bill.id, cuttingString(bill.clientIdAndFullName)).then((res)=>{
                if (res.status === 200){
                    GeneratePDFBilPayment(res.data);
                    notifySuccess("Xuất hóa đơn thành công");
                }
                else{
                    notifyError("Xuất hóa đơn thất bại");
                    console.log(res.data)
                }
            })
        }
        else{
            getBillToGeneratePdf(bill.id, cuttingString(bill.clientIdAndFullName)).then((res)=>{
                if (res.status === 200){
                    GeneratePDF(res.data);
                    notifySuccess("Xuất thông báo thành công");
                }
                else{
                    notifyError("Xuất thông báo thất bại");
                    console.log(res.data)
                }
            })
        }
    }
    return(
        <TableComponent data={bills}
        columns={[
            {id: "id", label:"Mã hóa đơn"},
            {id: "invoiceDate", label:"Ngày lập hóa đơn"},
            {id: "paymentDueDate", label:"Ngày hạn thanh toán"},
            {id: "totalAmount", label:"Tổng tiền"},
            {id: "paymentDate", label:"Ngày thanh toán"},
            {id: "paymentStatus", label:"Trạng thái"},
            {id: "clientIdAndFullName", label:"Mã - họ tên khách hàng"},
            {id: "employeeIdAndFullName", label:"Mã - họ tên nhân viên"},
            
        ]}
        presentName="bill"
        onEdit={handleClickPayment}
        ></TableComponent>
    )
}