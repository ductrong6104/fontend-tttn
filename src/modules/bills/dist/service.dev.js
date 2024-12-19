"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBillToGeneratePdfPayment = exports.getBillToGeneratePdf = exports.getAllBills = exports.createNewBill = exports.getTotalAmountByElectricRecordingId = void 0;

var _api = _interopRequireDefault(require("@/utils/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getTotalAmountByElectricRecordingId = function getTotalAmountByElectricRecordingId(electricRecordingId) {
  var response;
  return regeneratorRuntime.async(function getTotalAmountByElectricRecordingId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post("/bills/calculate-total-amount", electricRecordingId));

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

exports.getTotalAmountByElectricRecordingId = getTotalAmountByElectricRecordingId;

var createNewBill = function createNewBill(newBill) {
  var response;
  return regeneratorRuntime.async(function createNewBill$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_api["default"].post("/bills", newBill));

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

exports.createNewBill = createNewBill;

var getAllBills = function getAllBills() {
  var response;
  return regeneratorRuntime.async(function getAllBills$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/bills"));

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

exports.getAllBills = getAllBills;

var getBillToGeneratePdf = function getBillToGeneratePdf(billId, clientId) {
  var res;
  return regeneratorRuntime.async(function getBillToGeneratePdf$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/bills/".concat(billId, "/client/").concat(clientId, "/pdf")));

        case 3:
          res = _context4.sent;
          return _context4.abrupt("return", res.data);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getBillToGeneratePdf = getBillToGeneratePdf;

var getBillToGeneratePdfPayment = function getBillToGeneratePdfPayment(billId, clientId) {
  var res;
  return regeneratorRuntime.async(function getBillToGeneratePdfPayment$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/bills/".concat(billId, "/client/").concat(clientId, "/pdf-payment")));

        case 3:
          res = _context5.sent;
          return _context5.abrupt("return", res.data);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getBillToGeneratePdfPayment = getBillToGeneratePdfPayment;