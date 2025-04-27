const Bank = require('./Bank');
const readline = require('readline');

const bank = new Bank();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function menu() {
    console.log(`
🏦 Express Banking System

1. Create Account
2. Transfer Money
3. Check Balance
4. Delete Account
5. List All Accounts
6. Exit
  `);

    rl.question("Choose an option: ", (choice) => {
        if (choice === '1') {
            rl.question("Enter account number: ", (accNum) => {
                rl.question("Enter initial balance: ", (bal) => {
                    bank.addAccount(accNum, parseFloat(bal));
                    menu();
                });
            });
        } else if (choice === '2') {
            rl.question("From account: ", (from) => {
                rl.question("To account: ", (to) => {
                    rl.question("Amount: ", (amt) => {
                        bank.transfer(from, to, parseFloat(amt));
                        menu();
                    });
                });
            });
        } else if (choice === '3') {
            rl.question("Enter account number: ", (acc) => {
                bank.checkBalance(acc);
                menu();
            });
        } else if (choice === '4') {
            rl.question("Enter account number to delete: ", (acc) => {
                bank.deleteAccount(acc);
                menu();
            });
        } else if (choice === '5') {
            bank.listAccounts();
            menu();
        } else {
            console.log("👋 Exiting system. Goodbye!");
            rl.close();
        }
    });
}

menu();
