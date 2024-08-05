"use client";
import { useEffect, useState } from "react";
import Table from "@/components/table/table";
import {
  getAllRegistrationForm,
  rejectContract,
  updateProcessingEmployeeOfContract,
} from "@/modules/contracts/service";

import SubfrmSelectPowerMeter from "@/components/subform/subfrmSelectPowerMeter";
import AccountSession from "@/utils/account";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
/**
 *
 */
const columnNames = [
  "Mã đơn",
  "Họ",
  "Tên",
  "Ngày bắt đầu hợp đồng",
  "Mã đồng hồ - Địa chỉ cấp điện",
  "Loại điện",
];
export default function PageManagedRegister() {
  const [registrationForm, setRegistrationForm] = useState([]);
  const [registrationFormSelected, setRegistrationFormSelected] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [subfrmSelectPowerMeterIsOpen, setSubfrmSelectPowerMeterIsOpen] =
    useState(false);
  const accountSession = AccountSession.getInstance();
  const openSubfrmSelectPowerMeter = () => {
    setSubfrmSelectPowerMeterIsOpen(true);
  };
  const closeSubfrmSelectPowerMeter = () => {
    setSubfrmSelectPowerMeterIsOpen(false);
  };
  const [reload, setReload] = useState(false);
  /**
   * Đơn đăng ký là các record hợp đồng chưa được lắp đồng hồ điện
   */
  useEffect(() => {
    getAllRegistrationForm().then((res) => {
      if (res.status === 200) {
        setRegistrationForm(res.data);
        console.log(res.data);
      }
    });
  }, [reload]);
  const handleClickEdit = (row, index) => {
    // index = 0: từ chối, index = 1: xác nhận
    console.log(typeof row.id); // Hiển thị kiểu dữ liệu của row.id
    console.log(typeof accountSession.getEmployeeId());
    if (index === 1) {
      updateProcessingEmployeeOfContract(
        row.id,
        accountSession.getEmployeeId()
      ).then((res) => {
        if (res.status === 200) {
          notifySuccess("Xác nhận đăng ký hợp đồng thành công");
          setReload(!reload);
        } else {
          notifyError("Xác nhận đăng ký hợp đồng thất bại");
          console.log(res.data);
        }
      });
    } else if (index === 0) {
      rejectContract(row.id, accountSession.getEmployeeId()).then((res) => {
        if (res.status === 200) {
          notifySuccess("Đã từ chối đơn đăng ký");
          setReload(!reload);
        } else {
          notifyError("Từ chối đơn đăng ký");
          console.log(res.data);
        }
      });
    }

    // setRegistrationFormSelected({
    //   contractId: row.id,
    //   electricitySupplyAddress: row.electricitySupplyAddress
    // });
    // openSubfrmSelectPowerMeter();
  };
  return (
    <div className="h-screen">
      <div className="flex justify-center text-blue-600">
        {/* <div className="text-2xl mb-2">Danh sách các đơn đăng ký sử dụng điện</div> */}
      </div>
      {/* <SubfrmSelectPowerMeter isOpen={subfrmSelectPowerMeterIsOpen} onClose={closeSubfrmSelectPowerMeter} registrationFormSelected={registrationFormSelected} reload={reload} setReload={setReload}/> */}
      <Table
        representName="register"
        headerNames={columnNames}
        data={registrationForm}
        setData={setRegistrationForm}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        title="Danh sách đơn đăng ký"
        handleClickEdit={handleClickEdit}
      ></Table>
    </div>
  );
}
