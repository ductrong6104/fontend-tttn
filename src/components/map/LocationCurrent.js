"use client";
import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import polyline from "polyline";
import { getDirectionFromCoordinates } from "@/modules/maps/service";
const icon = L.icon({
  iconUrl: "/position-man.svg",
  iconSize: [38, 38],
});
export default function LocationCurrent({ coordinates, onChangeGeoJsonData }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
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
      coordinates.push(newLatLng);
       // Call the API when coordinates change
       getDirectionFromCoordinates(coordinates).then((data) => {
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
      }).catch((error) => {
        console.error("Error fetching route:", error);
      });
      // console.log(`coordinates ${JSON.stringify(coordinates)}`);
      setPosition(e.latlng);
      
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  
  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
