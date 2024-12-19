"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountSession =
/*#__PURE__*/
function () {
  function AccountSession() {
    _classCallCheck(this, AccountSession);

    this.accountId = null;
    this.username = null;
    this.employeeId = null;
  }

  _createClass(AccountSession, [{
    key: "setAccountId",
    value: function setAccountId(accountId) {
      this.accountId = accountId;
    }
  }, {
    key: "getAccountId",
    value: function getAccountId() {
      return this.accountId;
    }
  }, {
    key: "setUsername",
    value: function setUsername(username) {
      this.username = username;
    }
  }, {
    key: "getUsername",
    value: function getUsername() {
      return this.username;
    }
  }, {
    key: "setEmployeeId",
    value: function setEmployeeId(employeeId) {
      this.employeeId = employeeId;
    }
  }, {
    key: "getEmployeeId",
    value: function getEmployeeId() {
      return this.employeeId;
    }
  }, {
    key: "clearSession",
    value: function clearSession() {
      this.accountId = null;
      this.username = null;
      this.employeeId = null;
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!AccountSession.instance) {
        AccountSession.instance = new AccountSession();
      }

      return AccountSession.instance;
    }
  }]);

  return AccountSession;
}();

var _default = AccountSession;
exports["default"] = _default;