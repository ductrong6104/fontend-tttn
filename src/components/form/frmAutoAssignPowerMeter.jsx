import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { createAutomationAssignmentOneEmployee } from "@/modules/electric-recordings/service";
import yesno from "yesno-dialog";
import { notifyError, notifySuccess } from "../toastify/toastify";
import ComboboxComponentAutomation from "../combobox/comboboxComponentAutomation";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/modal";
import YesNoDialog from "../dialog/yesnodialog";
export default function FrmAutoAssignPowerMeter({
  automationDatas,
  setAutomationDatas,
  reloadAssignData,
  setReloadAssignData,
}) {
  const [formData, setFormData] = useState({
    powerMeters: [], // Initialize powerMeters as an array
  });
  const [selectedLabel, setSelectedLabel] = useState(""); // Store the selected label
  const [autoAssignData, setAutoAssignData] = useState([]);
  const [selectedPowerMeter, setSelectedPowerMeter] = useState(null); // Track the selected power meter for transfer
  const [showTransferDropdown, setShowTransferDropdown] = useState(false); // Show or hide the dropdown
  const [autoSuccessIcon, setAutoSuccessIcon] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    body: "",
    onYes: () => {},
  });

  /**
   * Handles the change event for input fields or comboboxes.
   * Updates the `formData` state with the new value based on the input's `name`.
   * If the change is related to a combobox, it updates the `selectedLabel`
   * state with the label of the selected option from `autoAssignData`.
   *
   * @param {Object} e - The event object containing details of the change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const selectedOption = autoAssignData.find(
      (option) => option.value === value
    );
    if (selectedOption) {
      setSelectedLabel(selectedOption.label); // Update label when combobox option is selected
    }
  };
  useEffect(() => {
    console.log("Initial powerMeters:", formData.powerMeters);
    // chua fix doan nay
    // const updatedAutomationDatas = formData.powerMeters.map((powerMeter) => ({
    //   employeeId: selectedLabel,
    //   powerMeters: powerMeter,
    // }));
    // setAutomationDatas(updatedAutomationDatas);
  }, [formData.powerMeters]);
  useEffect(() => {
    console.log(`selectedLabel change: ${selectedLabel}`);
  }, [selectedLabel]);

  useEffect(() => {
    const updatedData = [
      {
        label: "Tất cả",
        value: automationDatas.flatMap((data) => data.powerMeters), // Gộp tất cả powerMeters
      },
      ...automationDatas.map((data) => ({
        label: data.employeeId,
        value: data.powerMeters,
      })),
    ];
    console.log(
      `automationdata change chekcbox: ${JSON.stringify(updatedData)}`
    );
    setAutoAssignData(updatedData);
  }, [automationDatas]);

  const handleCheckboxChange = (e, index) => {
    const updatedPowerMeters = formData.powerMeters.map((item, i) =>
      i === index ? { ...item, isChecked: e.target.checked } : item
    );
    console.log(`updatedPowerMeters: ${JSON.stringify(updatedPowerMeters)}`);
    setFormData({ ...formData, powerMeters: updatedPowerMeters });
    // const updatedAutoAssignData = autoAssignData.map((data) => {
    //   if (data.label === selectedLabel) {
    //     return {
    //       ...data,
    //       value: updatedPowerMeters,
    //     };
    //   }
    //   return data;
    // });

    // console.log(`updatedData: ${JSON.stringify(updatedAutoAssignData)}`);
    // setAutoAssignData(updatedAutoAssignData);

    // const changePowerMeters = [...updatedPowerMeters];
    // if (!e.target.checked) {
    //   // Remove powerMeter from updatedPowerMeters
    //   changePowerMeters.splice(index, 1);
    // }

    const updatedAutomationDatas = automationDatas.map((data) => {
      if (data.employeeId === selectedLabel) {
        return {
          ...data,
          powerMeters: updatedPowerMeters,
        };
      }
      return data;
    });

    // setAutomationDatas(updatedAutomationDatas); // Update automationDatas
  };

  const handleTransferClick = (powerMeter) => {
    setSelectedPowerMeter(powerMeter); // Set the power meter to be transferred
    setShowTransferDropdown(true); // Show the dropdown to select a new employee
  };

  const handleTransferSelect = (newEmployeeId) => {
    console.log(`newEmployeeId: ${newEmployeeId}`);
    console.log(`selectedPowerMeter: ${JSON.stringify(selectedPowerMeter)}`);
    // Find the selected power meter in the automation data
    const updatedAutomationDatas = automationDatas.map((data) => {
      if (data.employeeId === selectedLabel) {
        const updatedPowerMeters = data.powerMeters.filter(
          (meter) => meter.id !== selectedPowerMeter.id // Remove power meter from current employee
        );
        return {
          ...data,
          powerMeters: updatedPowerMeters,
        };
      }
      return data;
    });
    console.log(
      `updatedAutomationDatas: ${JSON.stringify(updatedAutomationDatas)}`
    );
    // Add the power meter to the new employee
    const updatedAutoAssignData = updatedAutomationDatas.map((data) => {
      if (data.employeeId === newEmployeeId) {
        console.log(`data: ${JSON.stringify(data)}`);
        return {
          ...data,
          powerMeters: [
            ...data.powerMeters,
            { ...selectedPowerMeter, isChecked: true }, // Add power meter to new employee
          ],
        };
      }
      return data;
    });
    // Đồng bộ lại formData.powerMeters dựa trên nhân viên mới
    // const newEmployeeData = updatedAutoAssignData.find(
    //   (data) => data.employeeId === newEmployeeId
    // );
    // setFormData({ powerMeters: newEmployeeData?.powerMeters || [] });
    console.log(
      `updatedAutoAssignData: ${JSON.stringify(updatedAutoAssignData)}`
    );
    setAutomationDatas(updatedAutoAssignData); // Update automationDatas
    setShowTransferDropdown(false); // Hide the dropdown after transfer
    setSelectedPowerMeter(null); // Reset the selected power meter
  };

  const assignOneEmployeeClick = async () => {
    console.log(`${JSON.stringify(formData)}, ${selectedLabel}`);

    const transformedData = {
      employeeId: parseInt(selectedLabel.split("-")[0]),
      powerMeterIds: formData.powerMeters.map((meter) => meter.id),
    };
    console.log(`submit automation: ${JSON.stringify(transformedData)}`);
    if (transformedData.powerMeterIds.length === 0) {
      notifyError(`Không có đồng hồ nào phân cho nhân viên ${selectedLabel}`);
    } else {
      createAutomationAssignmentOneEmployee(transformedData).then((res) => {
        if (res.status === 201) {
          notifySuccess(
            `Phân công tự động nhân viên ${selectedLabel} thành công！`
          );
          // dong bo bang danh sach phan cong ghi dien
          setReloadAssignData(!reloadAssignData);
          setAutoSuccessIcon(true);
        } else {
          notifyError(
            `Phân công tự động nhân viên ${selectedLabel} thất bại！`
          );
        }
      });
    }
  };
  const handleOpenDialog = (config) => {
    setDialogConfig(config); // Cập nhật cấu hình dialog
    onOpen(); // Mở dialog
  };

  return (
    <div
      className="border-2 rounded-md p-4 overflow-auto"
      style={{ height: "500px" }}
    >
      <ComboboxComponentAutomation
        label={"Chọn nhân viên"}
        options={autoAssignData}
        onChange={handleChange}
        value={formData.powerMeters}
        name="powerMeters"
      />
      {autoSuccessIcon ? (
        <div className="flex justify-center items-center">
          <Image
            width={40}
            height={40}
            src="/accept-tick.svg"
            alt="success"
          ></Image>
        </div>
      ) : (
        <div>
          <div
          // style={{
          //   border: `1px solid ${
          //     selectedLabel !== undefined && colors[selectedLabel % colors.length]
          //       ? colors[selectedLabel % colors.length]
          //       : "default"
          //   }`,
          // }}
          >
            {Array.isArray(formData.powerMeters) &&
              formData.powerMeters.length > 0 &&
              formData.powerMeters.map((item, index) => (
                <div
                  className="border-2 rounded-md p-4 mb-2"
                  key={item.id || index}
                  style={{ position: "relative" }}
                >
                  <div className="flex justify-between">
                    <div>
                      <b>Mã đồng hồ: </b>
                      {item.id}
                      <br />
                      <b>Vị trí lắp đặt:</b> {item.installationLocation}
                      <br />
                    </div>
                    <div className="flex ">
                      <input
                        type="checkbox"
                        checked={item.isChecked || false}
                        onChange={(e) => handleCheckboxChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      onClick={() => handleTransferClick(item)}
                      sx={{ backgroundColor: "yellow" }}
                    >
                      Đổi nhân viên
                    </Button>
                  </div>
                  {/* Hiển thị dropdown chuyển đồng hồ tại đây */}
                  {showTransferDropdown &&
                    selectedPowerMeter?.id === item.id && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          backgroundColor: "yellow",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          padding: "8px",
                          zIndex: 10,
                          width: "320px",
                        }}
                      >
                        <label>
                          Phân công đồng hồ {selectedPowerMeter?.id} cho nhân
                          viên:
                        </label>
                        <ComboboxComponentAutomation
                          label="Chọn nhân viên"
                          options={autoAssignData.map((data) => ({
                            label: data.label,
                            value: data.label,
                          }))}
                          onChange={(e) => handleTransferSelect(e.target.value)}
                          value={selectedLabel}
                          name="newEmployee"
                        />
                      </div>
                    )}
                </div>
              ))}
          </div>

          <Button
            onClick={() =>
              handleOpenDialog({
                title: "Phân công tự động",
                body: `Chỉ phân công cho nhân viên ${selectedLabel}?`,
                onYes: () => assignOneEmployeeClick(),
              })
            }
          >
            Phân công nhân viên này
          </Button>
        </div>
      )}
      <YesNoDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={dialogConfig.title}
        bodyText={dialogConfig.body}
        onYes={dialogConfig.onYes}
      />
    </div>
  );
}
