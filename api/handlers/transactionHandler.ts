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
  console.log('--- entering deposit function ---');
  
  const account = await getAccount(accountID);
  console.dir(account, {depth:null, colors:true});

  if (account && amount > 1000.00) {
    throw new Error("Your deposit amount exceeds the transaction limit of $1000");
  }
  else if (account && account.hasOwnProperty('type') && account.type === 'credit' && 
      account.hasOwnProperty('amount') ) {
    if (amount > account.amount) {
      throw new Error("Credit account deposits cannot exceed your account value");
    }
  } else {
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