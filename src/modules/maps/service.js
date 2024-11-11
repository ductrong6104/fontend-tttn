import api from "@/utils/api";
export const searchAddress = async (address) => {
  try {
    const response = await api.get(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon_kml=1&addressdetails=1`
    );
    console.log(`response.data: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.error("Call API Error:", error);
    throw error;
  }
};

export const getAddressFromCoordinates = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name; // Trả về địa chỉ
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Không thể lấy địa chỉ";
  }
};

export const getDirectionFromCoordinates = async (coordinates) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_MAP;
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}`;
  console.log(`url: ${url}`);
  // console.log(`addresses in Mapjs: ${JSON.stringify(addresses)}`);
  console.log(`coordinates body api: ${JSON.stringify(coordinates)}`);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
      },

      body: JSON.stringify({
        coordinates: coordinates,
      }),
    });

    // console.log(`response${JSON.stringify(response)}`)
    // Lấy đường đi từ response
    // const data = await response.json();
    return response.json();
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};

export const getCoordinatesFromAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&limit=1`;
  try {
    const response = await api.get(url);
    console.log(`response.data: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
};
