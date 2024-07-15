import { query } from "../utils/db";
import { getAccount } from "./accountHandler";

export const withdrawal = async (accountID: string, amount: number) => {
  
  const account = await getAccount(accountID);
  
  console.log('---- account ---');
  console.dir(account, {depth:null, colors:true});

  if (amount < 5 ) {
    account.withdrawRestricted = "The minimum withdrawal amount is $5. Please resubmit withdrawal request with a valid minimum dollar amount.";
  }
  if (account && amount > 200) {
    account.withdrawRestricted = "There is a transaction limit of $200 for withdrawals. Please resubmit a withdrawal that is below this limit.";
  }
  if (account && (amount >= 5 && amount <= 200) ) {
    const amtInFiveDollarIncrements = Number.isInteger(amount / 5);
    if (!amtInFiveDollarIncrements) {
      account.withdrawRestricted = "Withdrawals are only allowed in $5 increments. Please resubmit a withdrawal using $5 increments.";  
    }
  }
  if (account && account.hasOwnProperty('type') && account.type !== 'credit' && account.hasOwnProperty('amount') ) {
    if (amount > account.amount) {
      account.withdrawRestricted = `The withdrawal amount is greater than your account balance of $${account.amount}. Please resubmit a withdrawal that is less than your balance.`;  
    }
  }
  if (account && account.hasOwnProperty('type') && account.type === 'credit' && 
      account.hasOwnProperty('credit_limit') && account.credit_limit &&
      account.hasOwnProperty('amount') && account.amount ) {

        const acctAbsValue = Math.abs(account.amount);

        const acctTotAbsValue =  acctAbsValue + amount;

        if (acctTotAbsValue > account.credit_limit) {
          account.withdrawRestricted = `This credit withdrawal amount exceeds your credit limit of ${account.credit_limit}. Please resubmit a withdrawal that is less than your limit.`;  
        }  
  }
  if ( !account.hasOwnProperty('withdrawRestricted') ) {
    account.amount -= amount;
    account.total_withdraw_amt += amount;

    const currentDate = new Date().toISOString().slice(0, 10);
    
    const withdrawDate = new Date(account.withdraw_date).toISOString().slice(0, 10);

    console.log(`---- currentDate ${currentDate} withdrawDate ${withdrawDate} `);

    const res = await query(`
      UPDATE accounts
      SET amount = $1, 
        total_withdraw_amt = $2
      WHERE account_number = $3`,
      [account.amount, account.total_withdraw_amt, accountID]
    );

    if (res.rowCount === 0) {
      throw new Error("Transaction failed");
    }
  }
  return account;
}

export const deposit = async (accountID: string, amount: number) => {
  
  const account = await getAccount(accountID);

  if (amount <= 0 ) {
    account.depositRestricted = "Minimum deposit amount is $1. Please resubmit deposit using a valid dollar amount.";
  }
  if (account && amount > 1000.00) {
    account.depositRestricted = "Your deposit amount exceeds the limit of $1000. Please resubmit a deposit that is below this limit.";
  }
  if (account && account.hasOwnProperty('type') && account.type === 'credit' && account.hasOwnProperty('amount') ) {
    if ( account.amount <= 0 ) {
      // how much will it take to zero out this credit account balance?
      const amtNeededToZeroAcct = Math.abs(account.amount);
      if (amount > amtNeededToZeroAcct) {
        account.depositRestricted = "Total deposits for a credit account cannot exceed a zero account balance.";
      } 
    }
  } 
  if ( !account.hasOwnProperty('depositRestricted') ) {
    account.amount += amount;
    const res = await query(`
      UPDATE accounts
      SET amount = $1 
      WHERE account_number = $2`,
      [account.amount, accountID]
    );
    if (res.rowCount === 0) {
      throw new Error("Transaction failed");
    }
  }
  return account;
}