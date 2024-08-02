"use client";
import TableComponent from "@/components/table/tableComponent";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import {
  deleteAccount,
  getAccountOfEmployees,
} from "@/modules/accounts/service";
import { useEffect, useState } from "react";

export default function PageManagedEmployee() {
  const [accounts, setAccounts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    getAccountOfEmployees().then((res) => {
      if (res.status === 200) {
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
  return (
    <div className="h-screen">
      <TableComponent
        data={accounts}
        columns={[
          { id: "username", label: "Tài khoản" },
          { id: "password", label: "Mật khẩu" },
          { id: "disabled", label: "Trạng thái" },
          { id: "employeeIdAndName", label: "Mã - họ tên nhân viên" },
        ]}
        onDelete={handleDelete}
      ></TableComponent>
    </div>
  );
}
