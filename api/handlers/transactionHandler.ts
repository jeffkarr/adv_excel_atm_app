import { query } from "../utils/db";
import { getAccount } from "./accountHandler";

export const withdrawal = async (accountID: string, amount: number) => {
  const account = await getAccount(accountID);
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
  return account;
}

export const deposit = async (accountID: string, amount: number) => {
  
  const account = await getAccount(accountID);

  if (amount <= 0 ) {
    account.restricted = "Minimum deposit amount is $1. Please resubmit deposit using a valid dollar amount.";
  }
  if (account && amount > 1000.00) {
    account.restricted = "Your deposit amount exceeds the limit of $1000. Please resubmit a deposit that is below this limit.";
  }
  if (account && account.hasOwnProperty('type') && account.type === 'credit' && account.hasOwnProperty('amount') ) {
    if ( account.amount <= 0 ) {
      // how much will it take to zero out this credit account balance?
      const amtNeededToZeroAcct = Math.abs(account.amount);
      if (amount > amtNeededToZeroAcct) {
        account.restricted = "Total deposits for a credit account cannot exceed a zero account balance.";
      } 
    }
  } 
  if ( !account.hasOwnProperty('restricted') ) {
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