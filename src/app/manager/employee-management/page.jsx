"use client";
import FrmAddEmployee from "@/components/form/frmAddEmployee";
import SubfrmEditEmployee from "@/components/subform/subfrmEditEmployee";
import Table from "@/components/table/table";
import { getAllEmployees } from "@/modules/employees/service";
import { useEffect, useState } from "react";


/**
 * PageManagedEmployee is a component that manages the employee data and provides
 * a user interface for viewing, adding, and editing employee details.
 *
 * The component includes:
 * - `FrmAddEmployee`: A form component for adding a new employee.
 * - `SubformModal`: A modal component for editing employee details.
 * - `Table`: A table component for displaying the list of employees.
 *
 * The component fetches employee data from an API using `getAllEmployees` and
 * manages the state for employee data, sorting configuration, modal visibility,
 * and form data.
 *
 * @returns {JSX.Element} - The rendered component.
 */

const columnNames = [
  "Mã nhân viên",
  "Họ",
  "Tên",
  "Giới tính",
  "Ngày sinh",
  "Địa chỉ",
  "Số điện thoại",
  "Email",
  "CCCD",
  "Nghỉ làm",
];
export default function PageManagedEmployee() {
  const [employees, setEmployees] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identityCard: "",
    address: "",
    gender: "",
    birthday: "",
    phone: "",
    email: "",
  });
  const [reload, setReload] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    getAllEmployees().then((res) => {
      if (res.status === 200) {
        setEmployees(res.data);
        console.log(res.data);
      }
    });
  }, [reload]);

  const handleClickEdit = (row) => {
    // Lấy đường dẫn hiện tại
    console.log(`row`, row);
    setFormData(row);
    openModal();
  }
  return (
    <div className="h-screen">
      <div className="flex justify-center text-blue-600">
        <div className="text-2xl mb-2">Thông tin nhân viên</div>
      </div>
      <div className="mb-2">
        <FrmAddEmployee reload={reload} setReload={setReload}></FrmAddEmployee>
      </div>
      <SubfrmEditEmployee
        isOpen={modalIsOpen}
        onClose={closeModal}
        formData={formData}
      />
      <Table
        headerNames={columnNames}
        data={employees}
        setData={setEmployees}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        title="Danh sách nhân viên"
        handleClickEdit={handleClickEdit}
        representName="employee"
      ></Table>
    </div>
  );
}
