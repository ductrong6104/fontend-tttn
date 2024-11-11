import {
  getAddressFromCoordinates,
  getDirectionFromCoordinates,
} from "@/modules/maps/service";
import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { RightClickAddress } from "../contextmenu/RightClickAddress";
import polyline from "polyline";
const icon = L.icon({
  iconUrl: "/position-man.svg",
  iconSize: [38, 38],
});
function LocationMarker({
  onChangeStartAddress,
  onChangeStartCoordinates,
  onChangeEndAddress,
  onChangeEndCoordinates,
  coordinates,
  onChangeGeoJsonData,
  numberRecordAddress,
}) {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null); // Vị trí của sub-menu
  const [openMenu, setOpenMenu] = useState(false);
  // Reverse Geocoding: Chuyển tọa độ thành địa chỉ

  const handleMarkerContextMenu = (e, markerPosition) => {
    // e.preventDefault();
    setOpenMenu(!openMenu);
    setMenuPosition({ lat: e.clientX, lon: e.clientY, markerPosition });
    console.log("menuPosition", menuPosition);
  };

  // Sử dụng useMapEvents để bắt sự kiện click
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng; // Lấy tọa độ từ lần click
      setPosition([lat, lng]); // Cập nhật vị trí Marker

      onChangeStartCoordinates({ lat: e.latlng.lat, lon: e.latlng.lng });
      console.log("clickc corrdi");

      // Lấy địa chỉ từ tọa độ
      getAddressFromCoordinates(lat, lng).then((addr) => {
        setAddress(addr);
        onChangeStartAddress(addr);
        map.flyTo(e.latlng, map.getZoom()); // Di chuyển đến vị trí click
      });
      const newLatLng = [e.latlng.lng, e.latlng.lat];

      // Kiểm tra và xóa vị trí hiện tại nếu nó đã tồn tại trong coordinates
      const existingIndex = coordinates.findIndex(
        ([lng, lat]) => lng === newLatLng[0] && lat === newLatLng[1]
      );

      if (existingIndex !== -1) {
        // Xóa vị trí cũ
        coordinates.splice(existingIndex, 1);
      }

      // Thêm vị trí mới vào coordinates
      coordinates[numberRecordAddress] = newLatLng;
      // Call the API when coordinates change
      getDirectionFromCoordinates(coordinates)
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
            onChangeGeoJsonData(geojson); // Gọi callback cập nhật geoJsonData
          }
        })
        .catch((error) => {
          console.error("Error fetching route:", error);
        });
    },
  });

  // const handleSaveStartPoint = () => {
  // //   const { lat, lng } = menuPosition.markerPosition;
  //   const lat = menuPosition.markerPosition[1];
  //   const lng = menuPosition.markerPosition[0];
  //     console.log(`marker position: ${lat}`);

  //   setPosition([lat, lng]);
  //   onChangeStartCoordinates([lat, lng]);
  //     onChangeStartAddress(address);
  // };

  const handleSaveEndPoint = () => {
    const { lat, lng } = menuPosition.markerPosition;
    onChangeEndCoordinates([lat, lng]);
    getAddressFromCoordinates(lat, lng)
      .then((addr) => {
        console.log(`Saved address: ${addr}`);
        setAddress(addr);
        onChangeEndAddress(addr);
        map.flyTo([lat, lng], map.getZoom()); // Di chuyển đến vị trí click

        // Ẩn menu sau khi lưu
        setMenuPosition(null);
      })
      .catch((error) => console.error("Error fetching address:", error));
  };

  // Hiển thị Marker tại vị trí đã click cùng với địa chỉ
  return position === null ? null : (
    <div className="relative">
      <Marker
        position={position}
        icon={icon}
        eventHandlers={{
          contextmenu: (e) => handleMarkerContextMenu(e, position), // Sự kiện nhấp chuột phải
        }}
      >
        <Popup>
          <span>Bạn đang ở vị trí: {address}</span>
          <br />
          <span>
            Tọa độ: {position[0]}, {position[1]}
          </span>
        </Popup>
      </Marker>
      {openMenu === true && (
        <RightClickAddress
          lat={menuPosition.lat}
          lon={menuPosition.lon}
          onSave={handleSaveEndPoint}
        />
      )}
    </div>
  );
}

export default LocationMarker;
