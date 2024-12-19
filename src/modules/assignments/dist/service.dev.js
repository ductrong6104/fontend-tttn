"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAssignment = exports.createAssignment = exports.getAssignments = void 0;

var _api = _interopRequireDefault(require("@/utils/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * L y danh s ch ghi  n i n l i gi n cho nh n vi n
 * @returns {Promise<Array<ElectricRecording>>}
 */
var getAssignments = function getAssignments() {
  var response;
  return regeneratorRuntime.async(function getAssignments$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get('/assignments/assigned'));

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

exports.getAssignments = getAssignments;

var createAssignment = function createAssignment(newAssignment) {
  var response;
  return regeneratorRuntime.async(function createAssignment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post('/assignments', newAssignment));

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

exports.createAssignment = createAssignment;

var updateAssignment = function updateAssignment(assignmentId, _updateAssignment) {
  var response;
  return regeneratorRuntime.async(function updateAssignment$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_api["default"].put("/assignments/".concat(assignmentId), _updateAssignment));

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

exports.updateAssignment = updateAssignment;