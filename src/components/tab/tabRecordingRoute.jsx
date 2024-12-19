import { getShortestPath } from "@/modules/electric-recordings/service";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { Button, CircularProgress } from "@mui/material";
import AccountSession from "@/utils/account";

export default function TabRecordingRoute() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [shortestPath, setShortestPath] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State cho trạng thái loading
  const accountSession = AccountSession.getInstance();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cachedLocation = sessionStorage.getItem("currentLocation");
      const cachedPath = sessionStorage.getItem("shortestPath");
      if (cachedLocation) {
        setCurrentLocation(JSON.parse(cachedLocation));
      }
      if (cachedPath) {
        setShortestPath(JSON.parse(cachedPath));
      }
    }
  }, []);

  useEffect(() => {
    if (currentLocation.latitude != null && currentLocation.longitude != null) {
      setIsLoading(true); // Bắt đầu loading
      getShortestPath(accountSession.getEmployeeId(), currentLocation)
        .then((res) => {
          if (res.status === 200) {
            notifySuccess("Tạo lộ trình thành công");
            setShortestPath(res.data);
            sessionStorage.setItem("shortestPath", JSON.stringify(res.data));
          } else {
            notifyError("Tạo lộ trình thất bại");
          }
        })
        .catch((error) => {
          console.error("Error fetching shortest path:", error);
          notifyError("Lỗi khi tạo lộ trình");
        })
        .finally(() => {
          setIsLoading(false); // Kết thúc loading
        });
    }
    sessionStorage.setItem("currentLocation", JSON.stringify(currentLocation));
  }, [currentLocation]);

  const handleCreateShortestPath = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
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
      <Button type="button" onClick={handleCreateShortestPath} disabled={isLoading}>
        Tạo lộ trình
      </Button>
      {isLoading ? (
        <div className="flex justify-center items-center mt-4">
          <div>Loading...</div>
        </div>
      ) : shortestPath.length === 0 ? (
        <div className="mt-4">Chưa có lộ trình.</div>
      ) : (
        <div className="flex">
          {shortestPath.map((point, index) => (
            <div key={index} className="flex flex-col">
              <div className="">{point.powerMeterId}</div>
              <div className="flex items-center mt-2">
                <div className="rounded-full bg-blue-600 w-4 h-4"></div>
                {index < shortestPath.length - 1 && (
                  <div className="w-10 h-0.5 bg-gray-400 mx-2"></div>
                )}
              </div>
              <div className="mt-2">{point.distance.toFixed(2)} km</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
