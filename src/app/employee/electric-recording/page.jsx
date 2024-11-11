"use client";
import { useState, useEffect, useMemo } from "react";
import { formatDateForDisplay } from "@/utils/formatDate";
import { SubfrmAddBill } from "@/components/subform/subfrmAddBill";
import { getTotalAmountByElectricRecordingId } from "@/modules/bills/service";
import AccountSession from "@/utils/account";
import TableComponent from "@/components/table/tableComponent";
import {
  deleteRecordingByEmployee,
  getAllElectricRecordings,
  getAssignedElectricRecordingsByEmployeeId,
  getShortestPath,
} from "@/modules/electric-recordings/service";
import SubfrmEditElectricRecording from "@/components/subform/subfrmEditElectricRecording";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { Button, Typography } from "@mui/material";
import SubfrmRecordingByEmployee from "@/components/subform/subfrmRecordingByEmployee";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PageElectricRecording() {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [powerMeters, setPowerMeters] = useState([]);
  const [assignedPowerMeters, setAssignedPowerMeters] = useState([]);
  const [reload, setReload] = useState(false);
  const [subfrmAddBillIsOpen, setSubfrmAddBillIsOpen] = useState(false);
  const [
    subfrmEditElectricRecordingIsOpen,
    setSubfrmEditElectricRecordingIsOpen,
  ] = useState(false);
  const [
    subfrmRecordingByEmployeedIsOpen,
    setSubfrmRecordingByEmployeedIsOpen,
  ] = useState(false);
  const [formData, setFormData] = useState({
    invoiceDate: new Date().toISOString().split("T")[0],
    paymentDueDate: "",
    totalAmount: "",
    electricRecordingId: "",
  });

  const [formDataRecording, setFormDataRecording] = useState({
    powerMeterId: "",
    employeeId: "",
    recordingDate: new Date().toISOString().split("T")[0],
    oldIndex: "",
    newIndex: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({});
  const accountSession = AccountSession.getInstance();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [shortestPath, setShortestPath] = useState(null);
  const openSubfrmAddBill = () => {
    setSubfrmAddBillIsOpen(true);
  };
  const closeSubfrmAddBill = () => {
    setSubfrmAddBillIsOpen(false);
  };

  const openSubfrmEditRecording = () => {
    setSubfrmEditElectricRecordingIsOpen(true);
  };
  const closeSubfrmEditRecording = () => {
    setSubfrmEditElectricRecordingIsOpen(false);
  };

  const openSubfrmRecordingByEmployee = () => {
    setSubfrmRecordingByEmployeedIsOpen(true);
  };
  const closeSubfrmRecordingByEmployee = () => {
    setSubfrmRecordingByEmployeedIsOpen(false);
  };
  useEffect(() => {
    getAllElectricRecordings().then((res) => {
      if (res.status === 200) {
        setPowerMeters(res.data);
      }
    });
  }, [reload]);

  useEffect(() => {
    getAssignedElectricRecordingsByEmployeeId(
      accountSession.getEmployeeId()
    ).then((res) => {
      if (res.status === 200) {
        setAssignedPowerMeters(res.data);
      }
    });
  }, [accountSession, reload]);

  const handleClickEditRecording = (row) => {
    setFormDataRecording((prevData) => ({
      ...prevData,
      powerMeterId: row.powerMeterId,
      employeeId: accountSession.getEmployeeId(),
      recordingDate: new Date().toISOString().split("T")[0],
      oldIndex: row.oldIndex,
      newIndex: "",
    }));
    openSubfrmRecordingByEmployee();
  };
  const handleClickEdit = (row, index) => {
    console.log(`row`, row.id);
    // index =0 : chỉnh sửa ghi điện, index = 1: xuất thông báo
    if (index === 1) {
      getTotalAmountByElectricRecordingId({ electricRecordingId: row.id }).then(
        (res) => {
          if (res.status === 200) {
            const newFrmData = {
              totalAmount: res.data.totalAmount,
              electricRecordingId: row.id,
              invoiceDate: new Date().toISOString().split("T")[0],
              paymentDueDate: "",
              invoiceCreatorId: accountSession.getEmployeeId(),
            };
            console.log(`newFrmData`, newFrmData);
            setFormData(newFrmData);
            openSubfrmAddBill();
          } else {
            console.error("Failed to fetch total amount:", res.data);
          }
        }
      );
    } else if (index === 0) {
      console.log(`row`, row);
      setFormDataEdit(row);
      return;
      openSubfrmEditRecording();
    }
  };

  const cutting = (str) => {
    const parts = str.split("-");
    console.log(`parts`, parts);
    return parts[0];
  };
  const handleEditDelete = (row) => {
    if (cutting(row.employeeIdAndFullName) === accountSession.getEmployeeId()) {
      notifyError("Không thể xóa ghi điện của nhân viên khác!");
    } else {
      // invoiced == true: đã xuất thông báo thì không thể xóa
      if (window.confirm("Xác nhận xóa ghi điện?")) {
        deleteRecordingByEmployee(row.id).then((res) => {
          if (res.status === 204) {
            notifySuccess("Xóa ghi điện thành công");
            setReload(!reload);
          } else {
            notifyError("Xóa ghi điện thất bại");
          }
        });
      }
    }
  };

  useEffect(() => {
    // Gọi API với tọa độ hiện tại
    console.log("Tọa độ hiện tại:", currentLocation);
    if (currentLocation.latitude != null && currentLocation.longitude != null) {
      getShortestPath(accountSession.getEmployeeId(), currentLocation).then(
        (res) => {
          if (res.status === 200) {
            notifySuccess("Tạo đường đi ngắn nhất thành công");
            console.log(res.data);
            setShortestPath(res.data);
          } else {
            notifyError("Tạo đường đi ngắn nhất thất bại");
          }
        }
      );
    }
  }, [currentLocation]);
  const handleCreateShortestPath = () => {
    // Kiểm tra nếu trình duyệt hỗ trợ Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude: latitude, longitude: longitude });
        },
        (error) => {
          console.error("Lỗi khi lấy tọa độ:", error.message);
          alert("Không thể lấy được vị trí hiện tại.");
        }
      );
    } else {
      alert("Trình duyệt không hỗ trợ Geolocation API.");
    }
  };
  const router = useRouter();
  const handleClickShowDirection = () => {
    if (shortestPath != null) {
      router.push("/employee/map-recording");
    }
  }
  return (
    <div className="">
      <div className="flex justify-center text-blue-600">
        <div className="text-2xl mb-2">
          Thông tin ghi chỉ số điện {formatDateForDisplay(new Date())}
        </div>
      </div>

      <div className="mb-2">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Danh sách đồng hồ được phân công
        </Typography>
        <div className="flex mb-2">
          <Button type="button" onClick={handleCreateShortestPath}>
            Tạo đường đi ngắn nhất
          </Button>
          {/* {shortestPath == null ? (
            <div>Chưa tạo đường đi</div>
          ) : (
            <div>Đã có đường đi</div>
          )} */}
          <div></div>
          {shortestPath != null &&
            shortestPath.map((point, index) => (
              <div key={index} className="flex flex-col">
                <div className="">{point.powerMeterId}</div>

                <div className="flex items-center mt-2">
                  {/* Hình tròn */}
                  <div className="rounded-full bg-blue-600 w-4 h-4"></div>

                  {/* Đường thẳng ngang nối giữa các hình tròn, trừ hình tròn cuối cùng */}
                  {index < shortestPath.length - 1 && (
                    <div className="w-20 h-0.5 bg-gray-400 mx-2"></div>
                  )}
                </div>
                {/* Thông tin bên dưới hình tròn */}

                <div className="mt-2">{point.distance.toFixed(2)} km</div>
              </div>
            ))}
          {shortestPath != null && (
            <div className="ml-4 flex flex-col justify-center">
              <Image
                src="/logo-direct.svg"
                alt="logo direction"
                width={50}
                height={50}
                className="cursor-pointer hover:bg-blue-300 hover:border-2 hover:rounded-md px-2"
                onClick={handleClickShowDirection}
              ></Image>
              <span>Đường đi</span>
            </div>
          )}
        </div>

        <TableComponent
          data={assignedPowerMeters}
          columns={[
            { id: "powerMeterId", label: "Mã đồng hồ" },
            { id: "installationLocation", label: "Vị trí lắp đặt" },
            { id: "oldIndex", label: "Chỉ số cũ" },
          ]}
          onEdit={handleClickEditRecording}
        ></TableComponent>
      </div>

      <SubfrmRecordingByEmployee
        isOpen={subfrmRecordingByEmployeedIsOpen}
        onClose={closeSubfrmRecordingByEmployee}
        frmData={formDataRecording}
        reload={reload}
        setReload={setReload}
      ></SubfrmRecordingByEmployee>
      <SubfrmAddBill
        isOpen={subfrmAddBillIsOpen}
        onClose={closeSubfrmAddBill}
        frmData={formData}
        reload={reload}
        setReload={setReload}
      ></SubfrmAddBill>
      <SubfrmEditElectricRecording
        isOpen={subfrmEditElectricRecordingIsOpen}
        onClose={closeSubfrmEditRecording}
        frmData={formDataEdit}
        reload={reload}
        setReload={setReload}
      />
      {/* <Table representName="electric-recording" headerNames={columnNames} data={powerMeters} setData={setPowerMeters} sortConfig={sortConfig} setSortConfig={setSortConfig} title="Ghi chỉ số điện" handleClickEdit={handleClickEdit}/> */}
      <Typography variant="h5" sx={{ textAlign: "center", mt: 10 }}>
        Danh sách đã ghi điện
      </Typography>
      <TableComponent
        data={powerMeters}
        columns={[
          { id: "id", label: "Mã ghi điện" },
          { id: "powerMeterId", label: "Mã đồng hồ" },
          { id: "recordingDate", label: "Ngày ghi chỉ số" },
          { id: "oldIndex", label: "Chỉ số cũ" },
          { id: "newIndex", label: "Chỉ số mới" },
          { id: "employeeIdAndFullName", label: "Mã nhân viên - họ tên" },
          { id: "invoiced", label: "Trạng thái" },
        ]}
        onEdit={handleClickEdit}
        onDelete={handleEditDelete}
        presentName="bill"
      ></TableComponent>
    </div>
  );
}
