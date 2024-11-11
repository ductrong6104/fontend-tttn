import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  GeoJSON,
} from "react-leaflet";
import { useAutoAssignContext } from "../context/autoAssignContext";
import { getEmployeeById } from "@/modules/employees/service";
import { getDirectionFromCoordinates } from "@/modules/maps/service";
import polyline from "polyline";
function FitBoundsToMarkers({ markers }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(
        markers.map((marker) => [marker.latitude, marker.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] }); // Thêm khoảng cách padding
    }
  }, [markers, map]);

  return null;
}

function FitMap() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [map]);
}

export default function MapAutomation() {
  const defaultPosition = [10.8535886, 106.7878561]; // Tọa độ mặc định
  const { powerMeters, setPowerMeters } = useAutoAssignContext();
  const [positionEmployee, setPositionEmployee] = useState(null);
  const geoJsonLayer = useRef(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const icon = L.icon({
    iconUrl: "/position-svgrepo-com.svg",

    iconSize: [25, 41], // Kích thước icon
    iconAnchor: [12, 41], // Điểm neo của icon
    popupAnchor: [1, -34],
    shadowSize: [41, 41], // Kích thước bóng
  });

  const iconMan = L.icon({
    iconUrl: "/position-man.svg",

    iconSize: [25, 41], // Kích thước icon
    iconAnchor: [12, 41], // Điểm neo của icon
    popupAnchor: [1, -34],
    shadowSize: [41, 41], // Kích thước bóng
  });
  const { idAndFullName } = useAutoAssignContext();
  useEffect(() => {
    if (idAndFullName && idAndFullName != "") {
      const id = idAndFullName.split("-")[0];
      getEmployeeById(id).then((res) => {
        if (res.status === 200) {
          setPositionEmployee([res.data.latitude, res.data.longitude]);
        }
      });
    } else {
      setPositionEmployee(null);
    }
  }, [idAndFullName]);
  useEffect(() => {
    if (positionEmployee && powerMeters.length > 0) {
      const newCoordinates = powerMeters.map(({ latitude, longitude }) => [
        longitude,
        latitude,
      ]);
      newCoordinates.push([positionEmployee[1], positionEmployee[0]]);
      // setPowerMeters(newCoordinates)
      console.log(`newCoordinate automation: ${newCoordinates}`);
      getDirectionFromCoordinates(newCoordinates)
        .then((data) => {
          if (data) {
            const decodedCoords = polyline.decode(data.routes[0].geometry);
            const geojson = {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: decodedCoords.map(([lat, lng]) => [lng, lat]), // Đảo ngược thứ tự lat,lng thành lng,lat
              },
              properties: {},
            };
            console.log("geojson", geojson);
            setGeoJsonData(geojson); // Gọi callback cập nhật geoJsonData
          }
        })
        .catch((error) => {
          console.error("Error fetching route:", error);
        });
    }
  }, [positionEmployee, powerMeters]);

  useEffect(() => {
    console.log("Updated geoJsonData: ", geoJsonData);
    // You can set an unique key on the <GeoJSON> element every time you want it to be changed. In
    // practice this will cause the existing layer to be removed
    // from Leaflet and a new GeoJSON layer to be created with the provided data.
    if (geoJsonLayer.current) {
      geoJsonLayer.current.clearLayers().addData(geoJsonData);
    }
  }, [geoJsonData]); // Log ra mỗi lần geoJsonData thay đổ
  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: "500px", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FitBoundsToMarkers markers={powerMeters} />

      {powerMeters.map((powerMeter) => (
        <Marker
          key={powerMeter.id}
          position={[powerMeter.latitude, powerMeter.longitude]}
          icon={icon}
        >
          <Popup>
            <span>
              Mã đồng hồ: {powerMeter.powerMeterId}
              <br /> Vị trí lắp đặt: {powerMeter.installationLocation}
            </span>
          </Popup>
        </Marker>
      ))}
      {positionEmployee && (
        <Marker position={positionEmployee} icon={iconMan}></Marker>
      )}
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          // pointToLayer={pointToLayer}
          ref={geoJsonLayer}
        />
      )}
    </MapContainer>
  );
}
