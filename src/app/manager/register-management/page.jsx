"use client";
import { useEffect, useState } from "react";
import Table from "@/components/table/table";
import {
  getAllRegistrationForm,
  updateProcessingEmployeeOfContract,
} from "@/modules/contracts/service";

import AccountSession from "@/utils/account";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import SubfrmRejectContract from "@/components/subform/subfrmRejectContract";
import SubfrmDetailRegistration from "@/components/subform/subfrmDetailRegistration";
import { getClientById } from "@/modules/clients/service";
import { cuttingString } from "@/utils/formatDate";
/**
 *
 */
const columnNames = [
  "Mã đơn",
  "Mã-Họ tên khách hàng",
  "Ngày gửi đơn đăng ký",
  "Mã đồng hồ - Địa chỉ cấp điện",
  "Loại điện",
  "Lý do từ chối đơn đăng ký",
];
export default function PageManagedRegister() {
  const [registrationForm, setRegistrationForm] = useState([]);
  const [registrationFormSelected, setRegistrationFormSelected] = useState({});
  const [detailRegistration, setDetailRegistration] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [subfrmSelectPowerMeterIsOpen, setSubfrmSelectPowerMeterIsOpen] =
    useState(false);
  const [subfrmRejectContractIsOpen, setSubfrmRejectContractIsOpen] =
    useState(false);
    const [subfrmDetailRegistrationIsOpen, setSubfrmDetailRegistrationIsOpen] = useState(false);
  const accountSession = AccountSession.getInstance();
  const openSubfrmSelectPowerMeter = () => {
    setSubfrmSelectPowerMeterIsOpen(true);
  };
  const closeSubfrmSelectPowerMeter = () => {
    setSubfrmSelectPowerMeterIsOpen(false);
  };
  const openSubfrmRejectContract = () => {
    setSubfrmRejectContractIsOpen(true);
  };
  const closeSubfrmRejectContract = () => {
    setSubfrmRejectContractIsOpen(false);
  };
  const openSubfrmDetailRegistration = () => {
    setSubfrmDetailRegistrationIsOpen(true);
  } 
  const closeSubfrmDetailRegistration = () => {
    setSubfrmDetailRegistrationIsOpen(false);
  }
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
    // index = 0: từ chối, index = 1: xác nhận, index = 2 xem chi tiet don dang ky
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
      setRegistrationFormSelected({
          contractId: row.id,
          employeeId: accountSession.getEmployeeId()
        });
        openSubfrmRejectContract();
      
    } else if (index === 2){
      
      getClientById(cuttingString(row.idAndFullName)).then((res) => {
        if (res.status === 200) {
          setDetailRegistration({
            email: res.data.email,
            phone: res.data.phone,
            identityCard: res.data.identityCard,
            birthday: res.data.birthday,
            id: row.id,
            idAndFullName: row.idAndFullName,
            startDate: row.startDate,
            electricitySupplyAddress: row.electricitySupplyAddress,
            electricTypeName: row.electricTypeName,
            reasonForRejection: row.reasonForRejection
          });
          openSubfrmDetailRegistration();
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
      <SubfrmDetailRegistration frmData={detailRegistration} isOpen={subfrmDetailRegistrationIsOpen} onClose={closeSubfrmDetailRegistration}></SubfrmDetailRegistration>
      <SubfrmRejectContract frmData={registrationFormSelected} isOpen={subfrmRejectContractIsOpen} onClose={closeSubfrmRejectContract} reload={reload} setReload={setReload}></SubfrmRejectContract>
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
