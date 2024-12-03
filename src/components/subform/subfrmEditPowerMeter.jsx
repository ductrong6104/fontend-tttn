import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";
import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getCoordinatesFromAddress } from "@/modules/maps/service";
import { updateCoordinates } from "@/modules/power-meters/service";
import { notifyError, notifySuccess } from "../toastify/toastify";
function SubfrmEditPowerMeter({ isOpen, onClose, frmData, reload, setReload }) {
  const [formData, setFormData] = useState(frmData);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setFormData(frmData);
  }, [frmData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Form submitted: ${JSON.stringify(formData)}`);
    updateCoordinates(formData.id, formData).then((res) => {
      if (res.status === 200) {
        notifySuccess("Cập nhật đồng hồ thành công");
        setReload(!reload);
        onClose();
      } else {
        notifyError("Cập nhật đồng hồ thất bại");
        console.log(res.data);
      }
    });
  };

  const generateNewCoordinates = async () => {
    console.log(`formData: ${JSON.stringify(formData)}`);
    setIsLoading(true);
    try {
        const res = await getCoordinatesFromAddress(formData.installationLocation);
        if (res.length > 0)
          setFormData((prevData) => ({
            ...prevData,
            longitude: res[0].lon,
            latitude: res[0].lat,
          }));
          else {
            notifyError("Địa chỉ không hợp lệ! Không thể xuất tọa độ");
          }
      } catch (error) {
        console.error("Failed to get coordinates", error);
      } finally {
        setIsLoading(false);
      }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="text-right mb-2 cursor-pointer">
            <CloseIcon onClick={onClose}></CloseIcon>
          </div>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Cập nhật đồng hồ
          </Typography>
          <TextField
            sx={{ mb: 2 }}
            label="Vị trí lắp đặt"
            name="installationLocation"
            value={formData.installationLocation}
            onChange={handleChange}
            required
            type="text"
          ></TextField>
          <TextField
            sx={{ mb: 2 }}
            label="Kinh độ"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            type="text"
          ></TextField>
          <TextField
            sx={{ mb: 2 }}
            label="Vĩ độ"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            type="text"
          ></TextField>
          <div className="text-right">
            <Button
              type="button"
              sx={{ color: "green" }}
              onClick={generateNewCoordinates}
            >
              Xuất tọa độ
            </Button>
            <Button type="submit">Cập nhật</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
export default SubfrmEditPowerMeter;
