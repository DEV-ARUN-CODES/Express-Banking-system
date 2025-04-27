class Account {
    constructor(accountNumber, balance = 0) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.next = null;
    }
}
module.exports = Account;