"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _leaflet = _interopRequireDefault(require("leaflet"));

require("leaflet-routing-machine");

var _reactLeaflet = require("react-leaflet");

var _service = require("@/modules/maps/service");

var _polyline = _interopRequireDefault(require("polyline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MovingVehicleMap = function MovingVehicleMap(_ref) {
  var coordinatesPath = _ref.coordinatesPath;
  var map = (0, _reactLeaflet.useMap)();
  (0, _react.useEffect)(function () {
    if (map && coordinatesPath.length >= 2) {
      var startLatLng = _leaflet["default"].latLng(coordinatesPath[0][0], coordinatesPath[0][1]);

      var endLatLng = _leaflet["default"].latLng(coordinatesPath[1][0], coordinatesPath[1][1]);

      var routeControl = _leaflet["default"].Routing.control({
        waypoints: [startLatLng, endLatLng],
        // Điểm bắt đầu và điểm kết thúc của lộ trình.
        routeWhileDragging: true,
        // Tắt tính năng kéo thả và tính toán lại lộ trình trong khi kéo waypoint.
        show: false,
        // Không hiển thị giao diện điều khiển lộ trình mặc định (panel chứa chỉ dẫn đường đi).
        createMarker: function createMarker(i, waypoint, n) {
          var markerIcon; // Kiểm tra nếu là điểm bắt đầu

          if (i === 0) {
            markerIcon = _leaflet["default"].icon({
              iconUrl: "/start-point.svg",
              // Đường dẫn đến icon bắt đầu
              iconSize: [32, 32],
              // Kích thước icon
              iconAnchor: [16, 16] // Vị trí neo của icon

            });
          } // Kiểm tra nếu là điểm kết thúc
          else if (i === n - 1) {
              markerIcon = _leaflet["default"].icon({
                iconUrl: "/end-point.svg",
                // Đường dẫn đến icon kết thúc
                iconSize: [32, 32],
                // Kích thước icon
                iconAnchor: [16, 16] // Vị trí neo của icon

              });
            } // Tạo marker với icon tương ứng cho waypoint


          return _leaflet["default"].marker(waypoint.latLng, {
            icon: markerIcon
          }).bindPopup("Waypoint ".concat(i + 1));
        }
      }).addTo(map); // Thêm routeControl vào bản đồ


      routeControl.on("routesfound", function (e) {
        var route = e.routes[0]; // Lấy lộ trình đầu tiên từ danh sách các lộ trình tìm thấy.

        var coordinates = route.coordinates; // Lấy danh sách các tọa độ (đường đi) trong lộ trình.

        var currentIndex = 0; // Biến để theo dõi vị trí hiện tại của marker.

        var vehicleIcon = _leaflet["default"].icon({
          iconUrl: "/motorbike.svg",
          // URL của biểu tượng xe di chuyển.
          iconSize: [32, 32],
          // Kích thước biểu tượng.
          iconAnchor: [16, 16] // Điểm neo của biểu tượng (giữa tâm của biểu tượng).

        });

        var marker = _leaflet["default"].marker(coordinates[0], {
          icon: vehicleIcon
        }).addTo(map); // Tạo marker tại vị trí đầu tiên của lộ trình.


        var moveVehicle = function moveVehicle() {
          if (currentIndex < coordinates.length) {
            marker.setLatLng(coordinates[currentIndex]); // Kiểm tra xem điểm hiện tại có khác điểm trước đó không

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

var _default = MovingVehicleMap;
exports["default"] = _default;