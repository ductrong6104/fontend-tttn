'use client'
import FrmAddEmployee from "@/components/form/frmAddEmployee"
import Table from "@/components/table/table"
import { getAllEmployees } from "@/modules/employees/service"
import { useEffect, useState } from "react"
const dataTest = [
    {
      id: 1,
      firstName: 'duc',
      lastName: 'trong',
      gender: false,
      birthday: '2002-02-20T00:00:00Z',
      address: 'hcm',
      phone: '0912312312',
      email: 'trong@gmail.com',
      identityCard: '1232141209',
      resignation: false,
    },
    {
      id: 2,
      firstName: 'anh',
      lastName: 'nguyen',
      gender: true,
      birthday: '1998-05-15T00:00:00Z',
      address: 'hanoi',
      phone: '0912345678',
      email: 'anh@gmail.com',
      identityCard: '1234567890',
      resignation: false,
    },
    {
        id: 2,
        firstName: 'anh',
        lastName: 'nguyen',
        gender: true,
        birthday: '1998-05-15T00:00:00Z',
        address: 'hanoi',
        phone: '0912345678',
        email: 'anh@gmail.com',
        identityCard: '1234567890',
        resignation: false,
      },
      {
        id: 2,
        firstName: 'anh',
        lastName: 'nguyen',
        gender: true,
        birthday: '1998-05-15T00:00:00Z',
        address: 'hanoi',
        phone: '0912345678',
        email: 'anh@gmail.com',
        identityCard: '1234567890',
        resignation: false,
      },
      {
        id: 2,
        firstName: 'anh',
        lastName: 'nguyen',
        gender: true,
        birthday: '1998-05-15T00:00:00Z',
        address: 'hanoi',
        phone: '0912345678',
        email: 'anh@gmail.com',
        identityCard: '1234567890',
        resignation: false,
      },
      {
        id: 2,
        firstName: 'anh',
        lastName: 'nguyen',
        gender: true,
        birthday: '1998-05-15T00:00:00Z',
        address: 'hanoi',
        phone: '0912345678',
        email: 'anh@gmail.com',
        identityCard: '1234567890',
        resignation: false,
      },
    // Thêm các hàng dữ liệu giả khác nếu cần
  ]
const columnNames = ["Mã nhân viên", "Họ", "Tên", "Giới tính", "Ngày sinh", "Địa chỉ", "Số điện thoại", "Email", "CCCD", "Nghỉ làm"]
export default function PageManagedEmployee(){
    const [employees, setEmployees] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(()=>{
        getAllEmployees().then((res)=>{
            if (res.status === 200){
                setEmployees(dataTest)
                console.log(res.data)
            }
        })
    }, [])
    return (
        <>
            <FrmAddEmployee></FrmAddEmployee>
            <Table headerNames={columnNames} data={employees} setData={setEmployees} sortConfig={sortConfig} setSortConfig={setSortConfig}></Table>
        </>
    )
}