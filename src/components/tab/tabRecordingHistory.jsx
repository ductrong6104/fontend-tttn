import { getRecordingHistoryByEmployee } from "@/modules/electric-recordings/service";
import AccountSession from "@/utils/account";
import { useEffect, useState } from "react";
import { useReloadRecordingContext } from "../context/reloadRecordingContext";

export default function TabRecordingHistory() {
  const [recordingHistory, setRecordingHistory] = useState([]);
 const {reload, setReload} = useReloadRecordingContext();
  const accountSession = AccountSession.getInstance();

  useEffect(() => {
    getRecordingHistoryByEmployee(accountSession.getEmployeeId()).then(
      (res) => {
        if (res.status === 200) {
          setRecordingHistory(res.data);
        }
      }
    );
  }, [reload]);
  return (
    <div>
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
    </div>
  );
}
