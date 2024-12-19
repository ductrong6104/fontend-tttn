"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseURL = process.env.NEXT_PUBLIC_ELECTRICITY; // ? '' :"http://localhost:8080";

console.log(baseURL);

var instance = _axios["default"].create({
  baseURL: baseURL,
  timeout: 500000,
  headers: {
    'Content-Type': 'application/json'
  }
});

var _default = instance;
exports["default"] = _default;