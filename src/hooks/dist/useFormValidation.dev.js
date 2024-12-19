"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useFormValidation = function useFormValidation() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      emailExists = _useState2[0],
      setEmailExists = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      checkingEmail = _useState4[0],
      setCheckingEmail = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      emailError = _useState6[0],
      setEmailError = _useState6[1];

  var emailInputRef = (0, _react.useRef)(null);

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      phoneExists = _useState8[0],
      setPhoneExists = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      checkingPhone = _useState10[0],
      setCheckingPhone = _useState10[1];

  var _useState11 = (0, _react.useState)(''),
      _useState12 = _slicedToArray(_useState11, 2),
      phoneError = _useState12[0],
      setPhoneError = _useState12[1];

  var phoneInputRef = (0, _react.useRef)(null);

  var _useState13 = (0, _react.useState)(false),
      _useState14 = _slicedToArray(_useState13, 2),
      identityCardExists = _useState14[0],
      setIdentityCardExists = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      checkingIdentityCard = _useState16[0],
      setCheckingIdentityCard = _useState16[1];

  var _useState17 = (0, _react.useState)(''),
      _useState18 = _slicedToArray(_useState17, 2),
      identityCardError = _useState18[0],
      setIdentityCardError = _useState18[1];

  var identityCardInputRef = (0, _react.useRef)(null);
  return {
    emailExists: emailExists,
    setEmailExists: setEmailExists,
    checkingEmail: checkingEmail,
    setCheckingEmail: setCheckingEmail,
    emailError: emailError,
    setEmailError: setEmailError,
    emailInputRef: emailInputRef,
    phoneExists: phoneExists,
    setPhoneExists: setPhoneExists,
    checkingPhone: checkingPhone,
    setCheckingPhone: setCheckingPhone,
    phoneError: phoneError,
    setPhoneError: setPhoneError,
    phoneInputRef: phoneInputRef,
    identityCardExists: identityCardExists,
    setIdentityCardExists: setIdentityCardExists,
    checkingIdentityCard: checkingIdentityCard,
    setCheckingIdentityCard: setCheckingIdentityCard,
    identityCardError: identityCardError,
    setIdentityCardError: setIdentityCardError,
    identityCardInputRef: identityCardInputRef
  };
};

var _default = useFormValidation;
exports["default"] = _default;