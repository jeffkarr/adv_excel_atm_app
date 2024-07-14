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

  // TEMPORARY TEST CODE 
  if (account && account.account_number === 1) {
    account.type = 'credit';
  }
  // END OF TEMPORARY TEST CODE

  if (account && amount > 1000.00) {
    console.log('--- 1 ---');
    account.restricted = "Your deposit amount exceeds the limit of $1000. Please resubmit a deposit that is below this limit.";
  }
  else if (account && account.hasOwnProperty('type') && account.type === 'credit' && account.hasOwnProperty('amount') ) {
        console.log('--- 2 ---');
    if (amount > account.amount) { 
      console.log('--- 3 ---');
      account.restricted = "Deposits for credit accounts cannot exceed your account balance. Please resubmit a deposit that is below this limit.";
    }
  } else { 
    console.log('--- 4 ---');
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