"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecordingHistoryByPowerMeter = exports.createAutomationAssignmentOneEmployee = exports.createAutomationAssignment = exports.getRecordingHistoryByEmployee = exports.getShortestPath = exports.deleteRecordingByEmployee = exports.updateElectricRecordingByEmployee = exports.deleteElectricRecording = exports.updateElectricRecording = exports.updateElectricRecordingFirst = exports.getAssignedElectricRecordingsByEmployeeId = exports.getAssignedElectricRecordings = exports.createElectricRecording = exports.getAllElectricRecordings = void 0;

var _api = _interopRequireDefault(require("@/utils/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllElectricRecordings = function getAllElectricRecordings() {
  var response;
  return regeneratorRuntime.async(function getAllElectricRecordings$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get('/electric-recordings'));

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

exports.getAllElectricRecordings = getAllElectricRecordings;

var createElectricRecording = function createElectricRecording(newElectricRecordingRequest) {
  var response;
  return regeneratorRuntime.async(function createElectricRecording$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post('/electric-recordings', newElectricRecordingRequest));

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

exports.createElectricRecording = createElectricRecording;

var getAssignedElectricRecordings = function getAssignedElectricRecordings() {
  var response;
  return regeneratorRuntime.async(function getAssignedElectricRecordings$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get('/electric-recordings/assigned'));

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

exports.getAssignedElectricRecordings = getAssignedElectricRecordings;

var getAssignedElectricRecordingsByEmployeeId = function getAssignedElectricRecordingsByEmployeeId(employeeId) {
  var response;
  return regeneratorRuntime.async(function getAssignedElectricRecordingsByEmployeeId$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/electric-recordings/assigned/".concat(employeeId)));

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

exports.getAssignedElectricRecordingsByEmployeeId = getAssignedElectricRecordingsByEmployeeId;

var updateElectricRecordingFirst = function updateElectricRecordingFirst(electricRecordingUpdateRequest) {
  var response;
  return regeneratorRuntime.async(function updateElectricRecordingFirst$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_api["default"].put("/electric-recordings", electricRecordingUpdateRequest));

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

exports.updateElectricRecordingFirst = updateElectricRecordingFirst;

var updateElectricRecording = function updateElectricRecording(electricRecordingId, electricRecordingUpdateRequest) {
  var response;
  return regeneratorRuntime.async(function updateElectricRecording$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_api["default"].put("/electric-recordings/".concat(electricRecordingId), electricRecordingUpdateRequest));

        case 3:
          response = _context6.sent;
          return _context6.abrupt("return", response.data);

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.error('Call API Error:', _context6.t0);
          throw _context6.t0;

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateElectricRecording = updateElectricRecording;

var deleteElectricRecording = function deleteElectricRecording(electricRecordingId) {
  var response;
  return regeneratorRuntime.async(function deleteElectricRecording$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_api["default"]["delete"]("/electric-recordings/".concat(electricRecordingId)));

        case 3:
          response = _context7.sent;
          return _context7.abrupt("return", response.data);

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.error('Call API Error:', _context7.t0);
          throw _context7.t0;

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteElectricRecording = deleteElectricRecording;

var updateElectricRecordingByEmployee = function updateElectricRecordingByEmployee(electricRecordingId, electricRecordingUpdateRequest) {
  var response;
  return regeneratorRuntime.async(function updateElectricRecordingByEmployee$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(_api["default"].put("/electric-recordings/".concat(electricRecordingId, "/employee"), electricRecordingUpdateRequest));

        case 3:
          response = _context8.sent;
          return _context8.abrupt("return", response.data);

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          console.error('Call API Error:', _context8.t0);
          throw _context8.t0;

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateElectricRecordingByEmployee = updateElectricRecordingByEmployee;

var deleteRecordingByEmployee = function deleteRecordingByEmployee(electricRecordingId) {
  var response;
  return regeneratorRuntime.async(function deleteRecordingByEmployee$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(_api["default"]["delete"]("/electric-recordings/employee/".concat(electricRecordingId)));

        case 3:
          response = _context9.sent;
          return _context9.abrupt("return", response.data);

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          console.error('Call API Error:', _context9.t0);
          throw _context9.t0;

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteRecordingByEmployee = deleteRecordingByEmployee;

var getShortestPath = function getShortestPath(employeeId, locationCurrent) {
  var response;
  return regeneratorRuntime.async(function getShortestPath$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post("/electric-recordings/assigned/".concat(employeeId, "/shortest"), locationCurrent));

        case 3:
          response = _context10.sent;
          return _context10.abrupt("return", response.data);

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.error('Call API Error:', _context10.t0);
          throw _context10.t0;

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getShortestPath = getShortestPath;

var getRecordingHistoryByEmployee = function getRecordingHistoryByEmployee(employeeId) {
  var response;
  return regeneratorRuntime.async(function getRecordingHistoryByEmployee$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/electric-recordings/recording-history/".concat(employeeId)));

        case 3:
          response = _context11.sent;
          return _context11.abrupt("return", response.data);

        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          console.error('Call API Error:', _context11.t0);
          throw _context11.t0;

        case 11:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getRecordingHistoryByEmployee = getRecordingHistoryByEmployee;

var createAutomationAssignment = function createAutomationAssignment(automationDatas) {
  var response;
  return regeneratorRuntime.async(function createAutomationAssignment$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post("/electric-recordings/automation-assignment", automationDatas));

        case 3:
          response = _context12.sent;
          return _context12.abrupt("return", response.data);

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          console.error('Call API Error:', _context12.t0);
          throw _context12.t0;

        case 11:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createAutomationAssignment = createAutomationAssignment;

var createAutomationAssignmentOneEmployee = function createAutomationAssignmentOneEmployee(automationDatas) {
  var response;
  return regeneratorRuntime.async(function createAutomationAssignmentOneEmployee$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post("/electric-recordings/automation-assignment-one-employee", automationDatas));

        case 3:
          response = _context13.sent;
          return _context13.abrupt("return", response.data);

        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          console.error('Call API Error:', _context13.t0);
          throw _context13.t0;

        case 11:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createAutomationAssignmentOneEmployee = createAutomationAssignmentOneEmployee;

var getRecordingHistoryByPowerMeter = function getRecordingHistoryByPowerMeter(powerMeterId) {
  var response;
  return regeneratorRuntime.async(function getRecordingHistoryByPowerMeter$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/electric-recordings/recording-history/powerMeter/".concat(powerMeterId)));

        case 3:
          response = _context14.sent;
          return _context14.abrupt("return", response.data);

        case 7:
          _context14.prev = 7;
          _context14.t0 = _context14["catch"](0);
          console.error('Call API Error:', _context14.t0);
          throw _context14.t0;

        case 11:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getRecordingHistoryByPowerMeter = getRecordingHistoryByPowerMeter;