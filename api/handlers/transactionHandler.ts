import { query } from "../utils/db";
import { getAccount } from "./accountHandler";

export const withdrawal = async (accountID: string, amount: number) => {
  
  const account = await getAccount(accountID);
  
  if (amount <= 5 ) {
    account.withdrawRestricted = "Minimum withdrawal amount is $5. Please resubmit withdrawal request with a valid dollar amount.";
  }
  if (account && amount > 200.00) {
    account.withdrawRestricted = "There is a transaction limit of $200 for withdrawals. Please resubmit a withdrawal that is below this limit.";
  }

  if ( !account.hasOwnProperty('withdrawRestricted') ) {
    account.amount -= amount;
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