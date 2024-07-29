
class AccountSession {
  constructor() {
    this.accountId = null;
    this.username = null;
    this.employeeId = null;
  }

  static getInstance() {
    if (!AccountSession.instance) {
      AccountSession.instance = new AccountSession();
    }
    return AccountSession.instance;
  }

  setAccountId(accountId) {
    this.accountId = accountId;
  }

  getAccountId() {
    return this.accountId;
  }
  setUsername(username){
    this.username = username;
  }
  getUsername(){
    return this.username;
  }

  setEmployeeId(employeeId) { 
    this.employeeId = employeeId;
  }
  getEmployeeId() {
    return this.employeeId;
  }

  clearSession() {
    this.accountId = null;
    this.username = null;
    this.employeeId = null;
  }
}


export default AccountSession;