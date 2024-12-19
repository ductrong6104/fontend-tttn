"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAccount = exports.getAccountOfEmployees = exports.deleteAccount = exports.sigin = exports.createAccount = void 0;

var _api = _interopRequireDefault(require("@/utils/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createAccount = function createAccount(newAccount) {
  var response;
  return regeneratorRuntime.async(function createAccount$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post("/accounts", newAccount));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Call API Error: ", _context.t0);
          throw _context.t0;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createAccount = createAccount;

var sigin = function sigin(account) {
  var response;
  return regeneratorRuntime.async(function sigin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post("/accounts/sigin", account));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error("Call API Error: ", _context2.t0);
          throw _context2.t0;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.sigin = sigin;

var deleteAccount = function deleteAccount(id) {
  var response;
  return regeneratorRuntime.async(function deleteAccount$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_api["default"]["delete"]("/accounts/".concat(id)));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Call API Error: ", _context3.t0);
          throw _context3.t0;

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteAccount = deleteAccount;

var getAccountOfEmployees = function getAccountOfEmployees() {
  var response;
  return regeneratorRuntime.async(function getAccountOfEmployees$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/accounts/employees/fix"));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error("Call API Error: ", _context4.t0);
          throw _context4.t0;

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAccountOfEmployees = getAccountOfEmployees;

var updateAccount = function updateAccount(id, account) {
  var response;
  return regeneratorRuntime.async(function updateAccount$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_api["default"].put("/accounts/".concat(id), account));

        case 3:
          response = _context5.sent;
          return _context5.abrupt("return", response.data);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error("Call API Error: ", _context5.t0);
          throw _context5.t0;

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateAccount = updateAccount;