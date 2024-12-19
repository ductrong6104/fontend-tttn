"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCoordinatesFromAddress = exports.getDirectionFromCoordinates = exports.getAddressFromCoordinates = exports.searchAddress = void 0;

var _api = _interopRequireDefault(require("@/utils/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var searchAddress = function searchAddress(address) {
  var response;
  return regeneratorRuntime.async(function searchAddress$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("https://nominatim.openstreetmap.org/search?q=".concat(address, "&format=json&polygon_kml=1&addressdetails=1")));

        case 3:
          response = _context.sent;
          console.log("response.data: ".concat(JSON.stringify(response.data)));
          return _context.abrupt("return", response.data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error("Call API Error:", _context.t0);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.searchAddress = searchAddress;

var getAddressFromCoordinates = function getAddressFromCoordinates(lat, lon) {
  var url, response, data;
  return regeneratorRuntime.async(function getAddressFromCoordinates$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=".concat(lat, "&lon=").concat(lon);
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch(url));

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context2.sent;
          return _context2.abrupt("return", data.display_name);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          console.error("Error fetching address:", _context2.t0);
          return _context2.abrupt("return", "Không thể lấy địa chỉ");

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
};

exports.getAddressFromCoordinates = getAddressFromCoordinates;

var getDirectionFromCoordinates = function getDirectionFromCoordinates(coordinates) {
  var apiKey, url, response;
  return regeneratorRuntime.async(function getDirectionFromCoordinates$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          apiKey = process.env.NEXT_PUBLIC_API_KEY_MAP;
          url = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=".concat(apiKey);
          console.log("url: ".concat(url)); // console.log(`addresses in Mapjs: ${JSON.stringify(addresses)}`);

          console.log("coordinates body api: ".concat(JSON.stringify(coordinates)));
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Accept: "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8"
            },
            body: JSON.stringify({
              coordinates: coordinates
            })
          }));

        case 7:
          response = _context3.sent;
          return _context3.abrupt("return", response.json());

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](4);
          console.error("Error fetching address:", _context3.t0);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 11]]);
};

exports.getDirectionFromCoordinates = getDirectionFromCoordinates;

var getCoordinatesFromAddress = function getCoordinatesFromAddress(address) {
  var url, response;
  return regeneratorRuntime.async(function getCoordinatesFromAddress$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          url = "https://nominatim.openstreetmap.org/search?q=".concat(encodeURIComponent(address), "&format=json&limit=1");
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_api["default"].get(url));

        case 4:
          response = _context4.sent;
          console.log("response.data: ".concat(JSON.stringify(response.data)));
          return _context4.abrupt("return", response.data);

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](1);
          console.error("Error fetching coordinates:", _context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.getCoordinatesFromAddress = getCoordinatesFromAddress;