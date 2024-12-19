"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmployeeById = exports.updateEmployee = exports.checkIdentityCardExists = exports.checkPhoneExists = exports.checkEmailExists = exports.getRecordableEmployees = exports.createEmployee = exports.getAllEmployees = void 0;

var _api = _interopRequireDefault(require("@/utils/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllEmployees = function getAllEmployees() {
  var response;
  return regeneratorRuntime.async(function getAllEmployees$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/employees"));

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

exports.getAllEmployees = getAllEmployees;

var createEmployee = function createEmployee(newEmployee) {
  var response;
  return regeneratorRuntime.async(function createEmployee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post("/employees", newEmployee));

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

exports.createEmployee = createEmployee;

var getRecordableEmployees = function getRecordableEmployees() {
  var response;
  return regeneratorRuntime.async(function getRecordableEmployees$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get('/employees/recordable'));

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
}; // debounce không nên được sử dụng trực tiếp trên hàm async khi export ra vì nó có thể gây ra lỗi khi sử dụng.


exports.getRecordableEmployees = getRecordableEmployees;

var checkEmailExists = function checkEmailExists(updateEmailRequest) {
  var response;
  return regeneratorRuntime.async(function checkEmailExists$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post("/employees/check-email", updateEmailRequest));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error('Error checking email:', _context4.t0);
          throw _context4.t0;

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.checkEmailExists = checkEmailExists;

var checkPhoneExists = function checkPhoneExists(phone) {
  var response;
  return regeneratorRuntime.async(function checkPhoneExists$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/employees/check-phone?phone=".concat(phone)));

        case 3:
          response = _context5.sent;
          return _context5.abrupt("return", response.data);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error('Error checking phone:', _context5.t0);
          throw _context5.t0;

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.checkPhoneExists = checkPhoneExists;

var checkIdentityCardExists = function checkIdentityCardExists(identityCard) {
  var response;
  return regeneratorRuntime.async(function checkIdentityCardExists$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/employees/check-identityCard?identityCard=".concat(identityCard)));

        case 3:
          response = _context6.sent;
          return _context6.abrupt("return", response.data);

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.error('Error checking identityCard:', _context6.t0);
          throw _context6.t0;

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.checkIdentityCardExists = checkIdentityCardExists;

var updateEmployee = function updateEmployee(_updateEmployee) {
  var response;
  return regeneratorRuntime.async(function updateEmployee$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_api["default"].put("/employees/".concat(_updateEmployee.id), _updateEmployee));

        case 3:
          response = _context7.sent;
          return _context7.abrupt("return", response.data);

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.error('Error updating employee:', _context7.t0);
          throw _context7.t0;

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateEmployee = updateEmployee;

var getEmployeeById = function getEmployeeById(employeeId) {
  var response;
  return regeneratorRuntime.async(function getEmployeeById$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/employees/".concat(employeeId)));

        case 3:
          response = _context8.sent;
          return _context8.abrupt("return", response.data);

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          console.error('Error updating employee:', _context8.t0);
          throw _context8.t0;

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getEmployeeById = getEmployeeById;