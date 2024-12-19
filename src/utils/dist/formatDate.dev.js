"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cuttingString = exports.formatDateForDatabase = exports.formatMonth = exports.formatDateForDisplay = void 0;

var _format = _interopRequireDefault(require("date-fns/format"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Định dạng ngày tháng để hiển thị trên giao diện (dd-MM-yyyy)
var formatDateForDisplay = function formatDateForDisplay(date) {
  return (0, _format["default"])(date, 'dd-MM-yyyy');
};

exports.formatDateForDisplay = formatDateForDisplay;

var formatMonth = function formatMonth(date) {
  return (0, _format["default"])(date, 'MM-yyyy');
}; // Định dạng ngày tháng để lưu vào cơ sở dữ liệu (yyyy-MM-dd)


exports.formatMonth = formatMonth;

var formatDateForDatabase = function formatDateForDatabase(date) {
  return (0, _format["default"])(date, 'yyyy-MM-dd');
};

exports.formatDateForDatabase = formatDateForDatabase;

var cuttingString = function cuttingString(str) {
  var parts = str.split('-');
  return parts[0];
};

exports.cuttingString = cuttingString;