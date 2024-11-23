import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStylesAutomation } from "./styleSubfrm";
import MapAutomation from "../map/MapAutomation";
import { getAutomationAssignment } from "@/modules/power-meters/service";
import FrmAutoAssignPowerMeter from "../form/frmAutoAssignPowerMeter";
import { useAutoAssignContext } from "../context/autoAssignContext";
import { useMap } from "react-leaflet";
import { createAutomationAssignment } from "@/modules/electric-recordings/service";
import { notifyError, notifySuccess } from "../toastify/toastify";

export default function SubfrmAutomationAssignment({
  isOpen,
  onClose,
  reload,
  setReload,
}) {
  const { autoAssignData, setAutoAssignData } = useAutoAssignContext();
  useEffect(() => {
    getAutomationAssignment().then((res) => {
      if (res.status === 200) {
        console.log(`automation data: ${JSON.stringify(res.data)}`);
        // Set autoAssignData based on automationDatas
        const updatedData = res.data.map((data) => ({
          ...data,
          employeeId: data.employeeId,
          powerMeters: data.powerMeters.map((meter) => ({
            ...meter,
            isChecked: true, // Add checked key with default value true
          })),
        }));
        setAutoAssignData(updatedData);
      }
    });
  }, [reload]);

  const onSubmitAutomationAssign = () => {
    const transformedData = autoAssignData.map((data) => ({
      employeeId: parseInt(data.employeeId.split("-")[0]),
      powerMeterIds: data.powerMeters.map((meter) => meter.id),
    }));

    console.log(`submit automation: ${JSON.stringify(transformedData)}`);
    if (window.confirm("Xác nhận phân công tự động?")) {
      createAutomationAssignment(transformedData).then((res) => {
        if (res.status === 201) {
          notifySuccess("Phân công tự động thành công!");
          setReload(!reload);
          onClose();
        } else {
          notifyError("Phân công tự động thất bại");
        }
      });
    }
  };
  return (
    <Modal style={customStylesAutomation} isOpen={isOpen} onClose={onClose}>
      {autoAssignData.length > 0 ? (
        <>
          <div className="flex justify-end">
            <Button type="button" onClick={onClose}>
              Đóng
            </Button>
          </div>
          <Typography variant="h4">Xem trước phân công tự động</Typography>

          <div className="flex">
            <div className="w-3/5 h-full">
              <MapAutomation></MapAutomation>
            </div>
            <div className="w-2/5 ml-2">
              <FrmAutoAssignPowerMeter
                automationDatas={autoAssignData}
                setAutomationDatas={setAutoAssignData}
                reloadAssignData={reload}
                setReloadAssignData={setReload}
              ></FrmAutoAssignPowerMeter>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <Button type="button" onClick={onSubmitAutomationAssign}>
              Phân công tất cả
            </Button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
}
