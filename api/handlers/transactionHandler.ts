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
    console.log('--- 1 ---');
    account.restricted = "Your deposit amount exceeds the limit of $1000. Please resubmit a deposit that is below this limit.";
  }
  else if (account && account.hasOwnProperty('type') && account.type === 'credit' && account.hasOwnProperty('amount') ) {
      console.log('--- 2 ---');
    // how much will it take to zero out this credit account balance?
    if ( account.amount < 0 ) {
      const amtNeededToZeroAcct = Math.abs(account.amount);
      if (amount > amtNeededToZeroAcct) {
        console.log('--- 3 a ---');
        account.restricted = "Total deposits for a credit account cannot exceed a zero account balance.";
      } else {
        console.log('--- 3 b ---');
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