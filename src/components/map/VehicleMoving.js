import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { getDirectionFromCoordinates } from "@/modules/maps/service";
import polyline from "polyline";

const MovingVehicleMap = ({ coordinatesPath }) => {
  const map = useMap();
  useEffect(() => {
    if (map && coordinatesPath.length >= 2) {

      const startLatLng = L.latLng(coordinatesPath[0][0], coordinatesPath[0][1]);
      const endLatLng = L.latLng(coordinatesPath[1][0], coordinatesPath[1][1]);

      const routeControl = L.Routing.control({
        waypoints: [startLatLng, endLatLng], // Điểm bắt đầu và điểm kết thúc của lộ trình.
        routeWhileDragging: true, // Tắt tính năng kéo thả và tính toán lại lộ trình trong khi kéo waypoint.
        show: false, // Không hiển thị giao diện điều khiển lộ trình mặc định (panel chứa chỉ dẫn đường đi).
        createMarker: function (i, waypoint, n) {
          let markerIcon;

          // Kiểm tra nếu là điểm bắt đầu
          if (i === 0) {
            markerIcon = L.icon({
              iconUrl: "/start-point.svg", // Đường dẫn đến icon bắt đầu
              iconSize: [32, 32], // Kích thước icon
              iconAnchor: [16, 16], // Vị trí neo của icon
            });
          }
          // Kiểm tra nếu là điểm kết thúc
          else if (i === n - 1) {
            markerIcon = L.icon({
              iconUrl: "/end-point.svg", // Đường dẫn đến icon kết thúc
              iconSize: [32, 32], // Kích thước icon
              iconAnchor: [16, 16], // Vị trí neo của icon
            });
          }

          // Tạo marker với icon tương ứng cho waypoint
          return L.marker(waypoint.latLng, { icon: markerIcon }).bindPopup(
            `Waypoint ${i + 1}`
          );
        },
      }).addTo(map); // Thêm routeControl vào bản đồ

      routeControl.on("routesfound", function (e) {
        const route = e.routes[0]; // Lấy lộ trình đầu tiên từ danh sách các lộ trình tìm thấy.
        const coordinates = route.coordinates; // Lấy danh sách các tọa độ (đường đi) trong lộ trình.

        let currentIndex = 0; // Biến để theo dõi vị trí hiện tại của marker.

        const vehicleIcon = L.icon({
          iconUrl: "/motorbike.svg", // URL của biểu tượng xe di chuyển.
          iconSize: [32, 32], // Kích thước biểu tượng.
          iconAnchor: [16, 16], // Điểm neo của biểu tượng (giữa tâm của biểu tượng).
        });

        const marker = L.marker(coordinates[0], { icon: vehicleIcon }).addTo(
          map
        ); // Tạo marker tại vị trí đầu tiên của lộ trình.

        const moveVehicle = () => {
          if (currentIndex < coordinates.length) {
            marker.setLatLng(coordinates[currentIndex]);
            // Kiểm tra xem điểm hiện tại có khác điểm trước đó không
            
            setTimeout(moveVehicle, 100);
            currentIndex++;
          }
        };

        moveVehicle();
      });
    }
  }, [map, coordinatesPath]);

  return null; // Không render bất kỳ UI nào, chỉ xử lý logic
};

export default MovingVehicleMap;
