"use client";
import SubfrmEditAccount from "@/components/subform/subfrmEditAccount";
import TableComponent from "@/components/table/tableComponent";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import {
  deleteAccount,
  getAccountOfEmployees,
} from "@/modules/accounts/service";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";


export default function PageManagedEmployee() {
  const [accounts, setAccounts] = useState([]);
  const [reload, setReload] = useState(false);
  const [subfrmEditAccountIsOpen, setSubfrmEditAccountIsOpen] = useState(false);
  const openSubfrmEditAccount = () => setSubfrmEditAccountIsOpen(true);
  const closeSubfrmEditAccount = () => setSubfrmEditAccountIsOpen(false);
  const [formData, setFormData] = useState({
  })
  
  useEffect(() => {
    getAccountOfEmployees().then((res) => {
      console.log(`res`, res);
      if (res.status === 200) {
        console.log(`res.data`, res.data);
        
        setAccounts(res.data);
      }
    });
  }, [reload]);
  const handleDelete = (row) => {
    console.log(`id`, row);
    
    if (row.employeeIdAndName === null) {
        if (window.confirm("Bạn có chắc muốn xóa tài khoản này không?")){
            deleteAccount(row.username).then((res) => {
                if (res.status === 204) {
                  notifySuccess("Xóa tài khoản thành công");
                  setReload(!reload);
                } else {
                  notifyError("Xóa tài khoản thất bại");
                  console.log(res.data);
                }
              });
        }
    } else {
      notifyError("Không thể xóa tài khoản đã cấp cho nhân viên");
    }
  };

  const handleEdit = (row) => {
    setFormData(row);
    console.log(`formData`, formData);
    openSubfrmEditAccount();
  };
  return (
    <div className="h-screen">
      <SubfrmEditAccount frmData={formData} isOpen={subfrmEditAccountIsOpen} onClose={closeSubfrmEditAccount} reload={reload} setReload={setReload}/>
      <Typography className="text-center" variant="h5">Danh sách tài khoản của nhân viên</Typography>
      <TableComponent
        data={accounts}
        columns={[
          { id: "id", label: "Mã" },
          { id: "username", label: "Tài khoản" },
          { id: "password", label: "Mật khẩu" },
          { id: "disabled", label: "Trạng thái" },
          { id: "employeeIdAndName", label: "Mã - họ tên nhân viên" },
        ]}
        onDelete={handleDelete}
        onEdit={handleEdit}
      ></TableComponent>
    </div>
  );
}
