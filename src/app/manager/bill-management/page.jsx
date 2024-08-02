'use client'
import TableComponent from "@/components/table/tableComponent";
import { getAllBills } from "@/modules/bills/service";
import { useEffect, useState } from "react";

export default function PageManagedBill(){
    const [bills, setBills] = useState([]);
    useEffect(()=>{
        getAllBills().then((res)=>{
            if(res.status === 200){
                setBills(res.data);
            }   
        })
    },[])
    return(
        <>
            <div className="flex justify-center text-blue-600">
                <div className="text-2xl mb-2">Danh sách hóa đơn</div>
            </div>
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
            presentName="bill"></TableComponent>
        </>
    )
}