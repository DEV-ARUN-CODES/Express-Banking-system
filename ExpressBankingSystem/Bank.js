const Account = require('./Account');
const TreeNode = require('./TreeNode');

class Bank {
    constructor() {
        this.head = null;
        this.root = null;
    }


    addAccount(accountNumber, balance = 0) {
        const newAccount = new Account(accountNumber, balance);
        if (!this.head) {
            this.head = newAccount;
        } else {
            let current = this.head;
            while (current.next) current = current.next;
            current.next = newAccount;
        }

        this.root = this._insertBST(this.root, newAccount);
        console.log(` Account ${accountNumber} created.`);
    }


    _insertBST(node, account) {
        if (!node) return new TreeNode(account);
        if (account.accountNumber < node.account.accountNumber) {
            node.left = this._insertBST(node.left, account);
        } else {
            node.right = this._insertBST(node.right, account);
        }
        return node;
    }


    _searchBST(node, accountNumber) {
        if (!node) return null;
        if (node.account.accountNumber === accountNumber) return node.account;
        if (accountNumber < node.account.accountNumber) {
            return this._searchBST(node.left, accountNumber);
        } else {
            return this._searchBST(node.right, accountNumber);
        }
    }

    findAccount(accountNumber) {
        return this._searchBST(this.root, accountNumber);
    }


    transfer(fromAcc, toAcc, amount) {
        const sender = this.findAccount(fromAcc);
        const receiver = this.findAccount(toAcc);

        if (!sender || !receiver) return console.log(" Invalid account number(s).");
        if (sender.balance < amount) return console.log(" Insufficient balance.");

        sender.balance -= amount;
        receiver.balance += amount;

        console.log(`✅ ₹${amount} transferred from ${fromAcc} to ${toAcc}.`);
    }


    checkBalance(accountNumber) {
        const acc = this.findAccount(accountNumber);
        if (!acc) return console.log(" Account not found.");
        console.log(` Balance of ${accountNumber}: ₹${acc.balance}`);
    }


    deleteAccount(accountNumber) {
        let prev = null;
        let current = this.head;

        while (current && current.accountNumber !== accountNumber) {
            prev = current;
            current = current.next;
        }

        if (!current) return console.log(" Account not found.");

        if (!prev) this.head = current.next;
        else prev.next = current.next;

        console.log(`Account ${accountNumber} deleted from Linked List.`);
        console.log(`Note: Tree is not updated dynamically for simplicity.`);
    }


    listAccounts() {
        console.log("📄 List of Accounts:");
        let current = this.head;
        while (current) {
            console.log(`- ${current.accountNumber} | ₹${current.balance}`);
            current = current.next;
        }
    }
}

module.exports = Bank;
