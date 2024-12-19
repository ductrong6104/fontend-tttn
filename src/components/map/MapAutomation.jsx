"use client"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// Tải các thành phần của react-leaflet động, chỉ trên client
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then(mod => mod.GeoJSON), { ssr: false });
import "leaflet/dist/leaflet.css";
import polyline from "polyline";
import { useAutoAssignContext } from "../context/autoAssignContext";
import { getEmployeeById } from "@/modules/employees/service";
import { getDirectionFromCoordinates } from "@/modules/maps/service";

// function FitMap() {
//   const map = useMap();
//   useEffect(() => {
//     setTimeout(() => {
//       map.invalidateSize();
//     }, 250);
//   }, [map]);
// }

export default function MapAutomation() {
  const defaultPosition = [10.8535886, 106.7878561];
  const { autoAssignData } = useAutoAssignContext();
  const [geoJsonData, setGeoJsonData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [isMarkersLoaded, setIsMarkersLoaded] = useState(false);
  const colors = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFA500", // Orange
    "#800080", // Purple
    "#00FFFF", // Cyan
  ];

  const employeeIcon = L.icon({
    iconUrl: "/position-man.svg", // Thay bằng icon của nhân viên
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const powerMeterIcon = L.icon({
    iconUrl: "/position-svgrepo-com.svg", // Thay bằng icon của đồng hồ điện
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    const fetchGeoJSON = async () => {
      const allGeoJSON = [];
      const allMarkers = [];
      if (geoJsonData.length > 0) {
        setGeoJsonData([]); // Xóa dữ liệu GeoJSON hiện tại
        setIsMarkersLoaded(false); // Đặt lại trạng thái loading
      }
      for (let i = 0; i < autoAssignData.length; i++) {
        const employee = autoAssignData[i];

        const color = colors[i % colors.length]; // Lặp lại màu nếu vượt quá danh sách

        // Lấy thông tin vị trí của nhân viên
        const employeeId = employee.employeeId.split("-")[0];
        const employeeData = await getEmployeeById(employeeId);

        if (employeeData?.data) {
          

          // Thêm marker cho nhân viên
          allMarkers.push({
            id: `employee-${employee.employeeId}`,
            position: [employeeData.data.latitude, employeeData.data.longitude],
            icon: employeeIcon,
            popup: (
              <>
                <b>Nhân viên:</b> {employee.employeeId}
                <br />
                <b>Vị trí:</b> ({employeeData.data.address})
              </>
            ),
          });
        }
        
        if (employee.powerMeters.length === 0) {
          continue;
        }

        const newCoordinates = employee.powerMeters
          .filter(({ isChecked }) => isChecked) // Lọc những phần tử có checked = true
          .map(({ latitude, longitude }) => [longitude, latitude]); // Ánh xạ tọa độ
        
        // Thêm marker cho đồng hồ điện
        const powerMeterMarkers = employee.powerMeters.map((pm) => ({
          id: `powerMeter-${pm.id}`,
          position: [pm.latitude, pm.longitude],
          icon: powerMeterIcon,
          popup: (
            <>
              <b>Mã đồng hồ:</b> {pm.id}
              <br />
              <b>Địa điểm:</b> {pm.installationLocation}
            </>
          ),
        }));
        allMarkers.push(...powerMeterMarkers);

        const employeeCoordinates = [
          employeeData.data.longitude,
          employeeData.data.latitude,
        ];

        newCoordinates.push(employeeCoordinates);

        // Lấy tuyến đường giữa các điểm
        try {
          const routeData = await getDirectionFromCoordinates(newCoordinates);
          if (routeData) {
            const decodedCoords = polyline.decode(routeData.routes[0].geometry);
            const geojson = {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: decodedCoords.map(([lat, lng]) => [lng, lat]),
              },
              properties: { color },
            };
            allGeoJSON.push(geojson);
          }
        } catch (error) {
          console.error(
            "Error fetching route for employee:",
            employeeId,
            error
          );
        }
      }

      setGeoJsonData(allGeoJSON);
      setMarkers(allMarkers);
      setIsMarkersLoaded(true); // Dữ liệu đã sẵn sàng
    };

    fetchGeoJSON();
  }, [autoAssignData]);
  if (!isMarkersLoaded) {
    // Hiển thị loading trong khi tải dữ liệu
    return <div>Loading map data...</div>;
  }
  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <FitMap /> */}
      {geoJsonData.map((geoJson, index) => (
        <GeoJSON
          key={index}
          data={geoJson}
          style={() => ({
            color: geoJson.properties.color,
            weight: 5,
          })}
        />
      ))}
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position} icon={marker.icon}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
