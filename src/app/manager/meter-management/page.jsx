"use client";
import TableComponent from "@/components/table/tableComponent";
import { getAllPowerMeters } from "@/modules/power-meters/service";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "@/utils/api";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import SubfrmEditPowerMeter from "@/components/subform/subfrmEditPowerMeter";

export default function PageManagedMeter() {
  const [powerMeters, setPowerMeters] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [powerMeterEdit, setPowerMeterEdit] = useState({});
  const [isOpenSubfrmEditPowerMeter , setIsOpenSubfrmEditPowerMeter] = useState(
    false
  )
  const openSubfrmEditPowerMeter = () => {
    setIsOpenSubfrmEditPowerMeter(true);
  };
  const closeSubfrmEditPowerMeter = () => {
    setIsOpenSubfrmEditPowerMeter(false);
  };
  useEffect(() => {
    getAllPowerMeters().then((res) => {
      if (res.status === 200) {
        setPowerMeters(res.data);
      }
    });
  }, [reload]);
  const handleClickEdit = (row) => {
    console.log(`row`, row);
    // setLoading(true);
    // getCoordinatesFromAddress(row.id, row.installationLocation);
    openSubfrmEditPowerMeter();
    setPowerMeterEdit(row);
  };
  const handleClickDelete = (row) => {};
  async function getCoordinatesFromAddress(idPowerMeter, address) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1`;

    try {
      const response = await axios.get(url);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];

        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        // Lưu vào database tại đây
        const res = await api
          .put(`/power-meters/${idPowerMeter}/coordinates`, {
            latitude: lat,
            longitude: lon,
          })
          .then((res) => {
            if (res.status === 200) {
              notifySuccess("add new assignment success, check database");
              setReload(!reload);
            }
          });
      } else {
        notifyError("No coordinates found for the address.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="h-screen">
      {/* <div className="flex justify-center text-blue-600">
                <div className="text-2xl mb-2">Thông tin đồng hồ điện</div>
            </div> */}
      {/* <div className="mb-2">
                <FrmAddPowerMeter reload={reload} setReload={setReload}/>
            </div> */}
      {loading ? (
        <div className="loading">
          {/* Đây là phần trang loading, bạn có thể tùy chỉnh */}
          <h2>Loading...</h2>
        </div>
      ) : (
        <div>
          <SubfrmEditPowerMeter isOpen={isOpenSubfrmEditPowerMeter} onClose={closeSubfrmEditPowerMeter} frmData={powerMeterEdit} reload={reload} setReload={setReload}></SubfrmEditPowerMeter>

          <TableComponent
            data={powerMeters}
            columns={[
              { id: "id", label: "Mã đồng hồ" },
              { id: "installationDate", label: "Ngày lắp đặt" },
              { id: "installationLocation", label: "Vị trí lắp đặt" },
              { id: "powerMeterStatus", label: "Trạng thái" },
              { id: "longitude", label: "Kinh độ" },
              { id: "latitude", label: "Vĩ độ" },
            ]}
            onEdit={handleClickEdit}
            onDelete={handleClickDelete}
          />
        </div>
      )}
    </div>
  );
}
