import { useEffect, useState } from "react";
import { customStyles } from "./styleSubfrm";
import Modal from "react-modal";
import { getRecordingHistoryByPowerMeter } from "@/modules/electric-recordings/service";
function SubfrmHistoryRecording({ isOpen, onClose, frmData }) {
  const [recordingHistory, setRecordingHistory] = useState([]);
  useEffect(() => {
    getRecordingHistoryByPowerMeter(frmData.powerMeterId).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setRecordingHistory(res.data);
      }
    });
  }, [frmData]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
      <div className="flex justify-end">
        <button type="button" onClick={onClose}>
          Đóng
        </button>
      </div>
      <div className="flex items-center mb-2">
        <div className="h-4 w-10 bg-orange-200"></div>
        <div className="">: 5 lần ghi gần nhất</div>
      </div>
      {recordingHistory.map((recordHistory, index) => (
        <div
          className={`${
            index < 5 ? "bg-orange-200" : ""
          } border-2 rounded-md p-4 mb-2`}
          key={index}
        >
          <div>Mã đồng hồ: {recordHistory.powerMeterId}</div>
          <div className="">Ngày ghi: {recordHistory.recordingDate}</div>
          <div className="flex">
            <div className="text-red-600 mr-2">
              Chỉ số cũ: {recordHistory.oldIndex}
            </div>
            <div className="text-green-400">
              Chỉ số mới: {recordHistory.newIndex}
            </div>
          </div>
        </div>
      ))}
    </Modal>
  );
}
export default SubfrmHistoryRecording;
