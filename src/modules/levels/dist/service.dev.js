"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLevel = exports.getLevelNotUseByElectricTypeId = exports.deleteLevelById = exports.createLevel = exports.getAllLevels = void 0;

var _api = _interopRequireDefault(require("@/utils/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllLevels = function getAllLevels() {
  var response;
  return regeneratorRuntime.async(function getAllLevels$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get('/levels'));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Call API Error:', _context.t0);
          throw _context.t0;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllLevels = getAllLevels;

var createLevel = function createLevel(level) {
  var response;
  return regeneratorRuntime.async(function createLevel$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post('/levels', level));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('Call API Error:', _context2.t0);
          throw _context2.t0;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createLevel = createLevel;

var deleteLevelById = function deleteLevelById(id) {
  var response;
  return regeneratorRuntime.async(function deleteLevelById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_api["default"]["delete"]("/levels/".concat(id)));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error('Call API Error:', _context3.t0);
          throw _context3.t0;

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteLevelById = deleteLevelById;

var getLevelNotUseByElectricTypeId = function getLevelNotUseByElectricTypeId(electricTypeId) {
  var response;
  return regeneratorRuntime.async(function getLevelNotUseByElectricTypeId$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/levels/not-use/electric-type/".concat(electricTypeId)));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error('Call API Error:', _context4.t0);
          throw _context4.t0;

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getLevelNotUseByElectricTypeId = getLevelNotUseByElectricTypeId;

var updateLevel = function updateLevel(levelId, level) {
  var response;
  return regeneratorRuntime.async(function updateLevel$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_api["default"].put("/levels/".concat(levelId), level));

        case 3:
          response = _context5.sent;
          return _context5.abrupt("return", response.data);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error('Call API Error:', _context5.t0);
          throw _context5.t0;

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateLevel = updateLevel;