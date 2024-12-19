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
import YesNoDialog from "../dialog/yesNoDialog";
import { useDisclosure } from "@nextui-org/modal";

export default function SubfrmAutomationAssignment({
  isOpenModal,
  onClose,
  reload,
  setReload,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    body: "",
    onYes: () => {},
  });
  const { autoAssignData, setAutoAssignData } = useAutoAssignContext();
  useEffect(() => {
    getAutomationAssignment().then((res) => {
      if (res.status === 200) {
        // Set autoAssignData based on automationDatas
        const updatedData = res.data.map((data) => ({
          ...data,
          employeeId: data.employeeId,
          powerMeters: data.powerMeters.map((meter) => ({
            ...meter,
            isChecked: true, // Add checked key with default value true
          })),
        }));
        console.log(`automation data: ${JSON.stringify(updatedData)}`);
        setAutoAssignData(updatedData);
      }
    });
  }, [reload]);
  const handleOpenDialog = (config) => {
    setDialogConfig(config); // Cập nhật cấu hình dialog
    onOpen(); // Mở dialog
  };
  const onSubmitAutomationAssign = () => {
    const transformedData = autoAssignData.map((data) => ({
      employeeId: parseInt(data.employeeId.split("-")[0]),
      powerMeterIds: data.powerMeters.map((meter) => meter.id),
    }));

    console.log(`submit automation: ${JSON.stringify(transformedData)}`);

    createAutomationAssignment(transformedData).then((res) => {
      if (res.status === 201) {
        notifySuccess("Phân công tự động thành công!");
        setReload(!reload);
        onClose();
      } else {
        notifyError("Phân công tự động thất bại");
      }
    });
  };
  return (
    <Modal
      style={customStylesAutomation}
      isOpen={isOpenModal}
      onClose={onClose}
    >
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
            <Button
              type="button"
              onClick={() => {
                handleOpenDialog({
                  title: "Phân công tự động",
                  body: `Phân công tất cả nhân viên?`,
                  onYes: () => onSubmitAutomationAssign(),
                });
              }}
            >
              Phân công tất cả
            </Button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <YesNoDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={dialogConfig.title}
        bodyText={dialogConfig.body}
        onYes={dialogConfig.onYes}
      />
    </Modal>
  );
}
