import { getShortestPath } from "@/modules/electric-recordings/service";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { Button } from "@mui/material";
import AccountSession from "@/utils/account";

export default function TabRecordingRoute() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [shortestPath, setShortestPath] = useState([]);
  const accountSession = AccountSession.getInstance();
  useEffect(() => {
    // Kiểm tra sessionStorage có chứa dữ liệu không
    const cachedLocation = sessionStorage.getItem("currentLocation");
    const cachedPath = sessionStorage.getItem("shortestPath");

    if (cachedLocation) {
      setCurrentLocation(JSON.parse(cachedLocation));
    }
    if (cachedPath) {
      setShortestPath(JSON.parse(cachedPath));
    }
  }, []);

  useEffect(() => {
    // Gọi API với tọa độ hiện tại
    console.log("Tọa độ hiện tại:", currentLocation);
    if (currentLocation.latitude != null && currentLocation.longitude != null) {
      getShortestPath(accountSession.getEmployeeId(), currentLocation).then(
        (res) => {
          if (res.status === 200) {
            notifySuccess("Tạo lộ trình thành công");
            console.log(res.data);
            setShortestPath(res.data);
            // Lưu kết quả vào sessionStorage
            sessionStorage.setItem("shortestPath", JSON.stringify(res.data));
          } else {
            notifyError("Tạo lộ trình thất bại");
          }
        }
      );
    }
    // Lưu currentLocation vào sessionStorage
    sessionStorage.setItem("currentLocation", JSON.stringify(currentLocation));
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
  return (
    <div>
      <Button type="button" onClick={handleCreateShortestPath}>
        Tạo lộ trình
      </Button>
      {/* {shortestPath == null ? (
            <div>Chưa tạo đường đi</div>
          ) : (
            <div>Đã có đường đi</div>
          )} */}
      <div className="flex">
        {shortestPath != null &&
          shortestPath.map((point, index) => (
            <div key={index} className="flex flex-col">
              <div className="">{point.powerMeterId}</div>

              <div className="flex items-center mt-2">
                {/* Hình tròn */}
                <div className="rounded-full bg-blue-600 w-4 h-4"></div>

                {/* Đường thẳng ngang nối giữa các hình tròn, trừ hình tròn cuối cùng */}
                {index < shortestPath.length - 1 && (
                  <div className="w-10 h-0.5 bg-gray-400 mx-2"></div>
                )}
              </div>
              {/* Thông tin bên dưới hình tròn */}

              <div className="mt-2">{point.distance.toFixed(2)} km</div>
            </div>
          ))}
      </div>
    </div>
  );
}
