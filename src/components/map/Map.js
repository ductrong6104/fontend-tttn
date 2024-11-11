"use client";
import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import polyline from "polyline";
import { getDirectionFromCoordinates } from "@/modules/maps/service";
import LocationCurrent from "./LocationCurrent";
import MovingVehicleMap from "./VehicleMoving";
import LocationMarker from "./LocationMarker";
import { set } from "date-fns";
import { RightClickAddress } from "../contextmenu/RightClickAddress";
import AccountSession from "@/utils/account";
import SubfrmRecordingByEmployee from "../subform/subfrmRecordingByEmployee";
import { useReloadRecordingContext } from "../context/reloadRecordingContext";

const icon = L.icon({
  iconUrl: "/position-svgrepo-com.svg",

  iconSize: [25, 41], // Kích thước icon
  iconAnchor: [12, 41], // Điểm neo của icon
  popupAnchor: [1, -34],
  shadowSize: [41, 41], // Kích thước bóng
});
// const createCustomIcon = (color) => {
//   return L.icon({
//     iconUrl: `/marker-icon-${color}.svg`, // Đường dẫn đến icon với màu đã tạo
//     iconSize: [25, 41], // Kích thước icon
//     iconAnchor: [12, 41], // Điểm neo của icon
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41], // Kích thước bóng
//   });
// };
const iconMarkerSearch = L.icon({
  iconUrl: "/position-gps-svgrepo-com.svg",
  iconSize: [20, 20],
});

const Map = ({ addresses }) => {
  const [menuPosition, setMenuPosition] = useState(null); // Vị trí của sub-menu
  const [openMenu, setOpenMenu] = useState(false);
  // Reverse Geocoding: Chuyển tọa độ thành địa chỉ
  const [coordinates, setCoordinates] = useState([]);
  const defaultPosition = [10.8535886, 106.7878561]; // Tọa độ mặc định
  const [route, setRoute] = useState([]);
  const [startCoordinates, setStartCoordinates] = useState([]);
  const [endCoordinates, setEndCoordinates] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const mapRef = useRef(); // Tham chiếu tới bản đồ
  const geoJsonLayer = useRef(null);
  const [map, setMap] = useState(null);
  const [pathVehicle, setPathVehicle] = useState([]);
  const numberRecordAddress = addresses.length;
  const {reload, setReload} = useReloadRecordingContext();
  const [formDataRecording, setFormDataRecording] = useState({
    powerMeterId: "",
    employeeId: "",
    recordingDate: new Date().toISOString().split("T")[0],
    oldIndex: "",
    newIndex: "",
  });
  const [
    subfrmRecordingByEmployeedIsOpen,
    setSubfrmRecordingByEmployeedIsOpen,
  ] = useState(false);

  const accountSession = AccountSession.getInstance();
  const openSubfrmRecordingByEmployee = () => {
    setSubfrmRecordingByEmployeedIsOpen(true);
  };
  const closeSubfrmRecordingByEmployee = () => {
    setSubfrmRecordingByEmployeedIsOpen(false);
  };

  const handleChangeGeoJsonData = (geojson) => {
    setGeoJsonData(geojson);
  };
  useEffect(() => {
    console.log("Updated geoJsonData: ", geoJsonData);
    // You can set an unique key on the <GeoJSON> element every time you want it to be changed. In
    // practice this will cause the existing layer to be removed
    // from Leaflet and a new GeoJSON layer to be created with the provided data.
    if (geoJsonLayer.current) {
      geoJsonLayer.current.clearLayers().addData(geoJsonData);
    }
  }, [geoJsonData]); // Log ra mỗi lần geoJsonData thay đổ
  // Callback khi chọn vị trí từ SearchBox

  useEffect(() => {
    if (addresses.length > 1) {
      // Sử dụng một thuật toán để tìm đường đi ngắn
      const calculateShortestPath = () => {
        const sortedAddresses = addresses.sort((a, b) => a.id - b.id); // Cần áp dụng thuật toán tối ưu TSP
        // setRoute(sortedAddresses.map(a => [a.latitude, a.longitude]));
      };
      calculateShortestPath();
    }
  }, [addresses]);
  useEffect(() => {
    console.log(`coordinates updated: ${JSON.stringify(coordinates)}`);
  }, [coordinates]); // Chỉ chạy khi `coordinates` thay đổi
  useEffect(() => {
    const fetchRoute = async () => {
      if (addresses.length < 2) {
        // Nếu không có đủ địa chỉ, không gọi API
        return;
      }
      const newCoordinates = addresses.map(({ latitude, longitude }) => [
        longitude,
        latitude,
      ]);
      setCoordinates(newCoordinates);
      return;
      try {
        const data = await getDirectionFromCoordinates(newCoordinates);
        console.log(`data ${JSON.stringify(data)}`);
        // Kiểm tra đúng cấu trúc của GeoJSON
        if (data) {
          // Giải mã chuỗi geometry
          const decodedCoords = polyline.decode(data.routes[0].geometry);

          // Chuyển đổi danh sách tọa độ thành GeoJSON format
          const geojson = {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: decodedCoords.map(([lat, lng]) => [lng, lat]), // Đảo ngược thứ tự lat,lng thành lng,lat
            },
            properties: {},
          };
          console.log(`geojson ${JSON.stringify(geojson)}`);
          setGeoJsonData(geojson);
          // Tính toán bounds để di chuyển bản đồ tới phạm vi chứa tuyến đường
          // const coordinates = data.features[0].geometry.coordinates;
          // const bounds = coordinates.map((coord) => [coord[1], coord[0]]); // Đảo ngược tọa độ để phù hợp với Leaflet

          // // Di chuyển tới phạm vi chứa tuyến đường
          // if (mapRef.current) {
          //   mapRef.current.fitBounds(bounds);
          // }
        }
        // const routeCoordinates = response.data.features[0];
        // console.log(`routeCoordinates${JSON.stringify(routeCoordinates)}`)
      } catch (error) {
        console.error("Error fetching the route:", error);
      }
    };

    fetchRoute();
  }, [addresses]);

  // Hàm custom pointToLayer để tạo Marker với custom icon
  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, { icon: iconMarkerSearch }); // Sử dụng custom icon
  };

  useEffect(() => {
    if (map) {
      console.log("Map instance:", map);
    }
  }, [map]);

  const handleMarkerContextMenu = (e, markerPosition, markerInfo) => {
    // e.preventDefault();
    setOpenMenu(!openMenu);
    setMenuPosition({ lat: e.clientY, lon: e.clientX, markerPosition }); // Lưu vị trí của menu
    setEndAddress(markerInfo.installationLocation);
    setEndCoordinates({
      lat: markerPosition[0],
      lon: markerPosition[1],
    });
    setFormDataRecording((prevData) => ({
      ...prevData,
      powerMeterId: markerInfo.powerMeterId,
      employeeId: accountSession.getEmployeeId(),
      recordingDate: new Date().toISOString().split("T")[0],
      oldIndex: markerInfo.oldIndex,
      newIndex: "",
    }));
  };

  useEffect(() => {
    console.log(
      `updated startAddress: ${startAddress}, endAddress: ${endAddress}, startCoordinates: ${JSON.stringify(
        startCoordinates
      )}, endCoordinates: ${JSON.stringify(endCoordinates)}`
    );
  }, [startAddress, endAddress, startCoordinates, endCoordinates]);

  const handleSaveEndAddress = () => {
    // onChangeEndCoordinates(menuPosition.markerPosition);
    console.log("click ghi dien");
    openSubfrmRecordingByEmployee();
  };

  const handleCreateVehicle = (e) => {
    e.preventDefault();
    let listVehicle = [];
    listVehicle.push([startCoordinates.lat, startCoordinates.lon]);
    listVehicle.push([endCoordinates.lat, endCoordinates.lon]);

    console.log(`listVehicle: ${JSON.stringify(listVehicle)}`);
    setPathVehicle(listVehicle);
  };
  useEffect(() => {
    console.log(`updated pathVehicle: ${JSON.stringify(pathVehicle)}`);
  }, [pathVehicle]);
  // Danh sách các màu sắc (tuỳ ý thêm bớt màu sắc)
  const colors = ["red", "blue", "green", "yellow", "purple", "pink"];
  return (
    <div>
      <form onSubmit={handleCreateVehicle}>
        <div className="mb-2">
          <label className="mr-2">Điểm đi:</label>
          <input
            type="text"
            value={startAddress}
            className="w-full"
            required
            readOnly
          ></input>
        </div>
        <div className="mb-2">
          <label className="mr-2">Điểm đến:</label>
          <input
            type="text"
            value={endAddress}
            className="w-full"
            required
            readOnly
          ></input>
        </div>
        <div className="flex mb-2">
          <button
            type="submit"
            className={`${
              startAddress === "" || endAddress === ""
                ? "bg-red-500"
                : "bg-green-500"
            } mr-2 border-2 rounded-md p-2`}
          >
            Tạo phương tiện
          </button>
          <button
            type="button"
            className={`${
              endAddress === "" ? "bg-red-500" : "bg-green-500"
            }  border-2 rounded-md p-2`}
            onClick={openSubfrmRecordingByEmployee}
          >
            Ghi điện
          </button>
        </div>
      </form>

      <div
        className={
          subfrmRecordingByEmployeedIsOpen ? "pointer-events-none" : ""
        }
      >
        <MapContainer
          // center={[addresses[0]?.latitude, addresses[0]?.longitude]}
          center={defaultPosition}
          zoom={13}
          style={{ height: "500px", width: "100%", zIndex: 0 }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {addresses.map((address, idx) => {
            // Lấy màu sắc tương ứng cho mỗi điểm address
            // const color = colors[idx % colors.length];
            // const icon = createCustomIcon(color);
            return (
              <Marker
                key={idx}
                position={[address.latitude, address.longitude]}
                icon={icon}
                eventHandlers={{
                  contextmenu: (e) =>
                    handleMarkerContextMenu(
                      e,
                      [address.latitude, address.longitude],
                      {
                        powerMeterId: address.powerMeterId,
                        installationLocation: address.installationLocation,
                        oldIndex: address.oldIndex,
                      }
                    ), // Lưu thông tin của marker khi nhấp chuột phải
                }}
              >
                {/* <Image width={40} height={40} src="/position-svgrepo-com.svg" alt="icon-position"></Image> */}
                {/* <Circle
                  center={[address.latitude, address.longitude]}
                  radius={10}
                  pathOptions={{ fillColor: color }}
                  stroke={false}
                ></Circle> */}
                <Popup>
                  <span>
                    Mã đồng hồ: {address.powerMeterId}
                    <br /> Vị trí lắp đặt: {address.installationLocation}
                    <br /> Chỉ số cũ: {address.oldIndex}
                  </span>
                </Popup>
                {/* {openMenu === true && (
                <RightClickAddress
                  lat={menuPosition.lat}
                  lon={menuPosition.lon}
                  onSave={handleSaveEndAddress}
                  labelButton="Ghi điện"
                />
              )} */}
              </Marker>
            );
          })}
          {geoJsonData && (
            <GeoJSON
              data={geoJsonData}
              pointToLayer={pointToLayer}
              ref={geoJsonLayer}
            />
          )}
          <LocationMarker
            onChangeStartAddress={setStartAddress}
            onChangeStartCoordinates={setStartCoordinates}
            onChangeEndAddress={setEndAddress}
            onChangeEndCoordinates={setEndCoordinates}
            coordinates={coordinates}
            onChangeGeoJsonData={setGeoJsonData}
            numberRecordAddress={numberRecordAddress}
          />
          {/* <LocationCurrent
            coordinates={coordinates}
            onChangeGeoJsonData={setGeoJsonData}
          ></LocationCurrent> */}
          {/* Hiển thị marker tại vị trí đã chọn */}
          {startCoordinates.length > 0 && (
            <Marker position={startCoordinates} icon={icon}>
              <Popup>
                <span>Bạn đang ở vị trí: {startCoordinates.display_name}</span>
                <br />
                <span>
                  Tọa độ: {startCoordinates.lat}, {startCoordinates.lon}
                </span>
              </Popup>
            </Marker>
          )}
          {/* Gọi component MovingVehicleMap và truyền map */}
          <MovingVehicleMap coordinatesPath={pathVehicle} />
        </MapContainer>
        {/* <SearchBoxInMap
          onSelectPosition={handleSelectPosition}
          className="w-1/3 ml-2"
        ></SearchBoxInMap> */}
      </div>
      <SubfrmRecordingByEmployee
        isOpen={subfrmRecordingByEmployeedIsOpen}
        onClose={closeSubfrmRecordingByEmployee}
        frmData={formDataRecording}
        reload={reload}
        setReload={setReload}
      ></SubfrmRecordingByEmployee>
    </div>
  );
};

export default Map;
