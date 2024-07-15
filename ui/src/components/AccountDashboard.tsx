import React, { useState } from "react"
import {account} from "../Types/Account"
import Paper from "@mui/material/Paper/Paper";
import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Alert from "../components/Alert/Alert";

type AccountDashboardProps = {
  account: account;
  signOut: () => Promise<void>;
}

export const AccountDashboard = (props: AccountDashboardProps) => {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [useDepositAlert, setDepositAlert] = useState(false);
  const [useWithdrawAlert, setWithdrawAlert] = useState(false);
  const [useAlertMessage, setAlertMessage] = useState('');
  const [account, setAccount] = useState(props.account); 

  const {signOut} = props;

  const depositFunds = async () => {

    const depositIsInteger = Number.isInteger(depositAmount);
  
    if (!depositIsInteger) {
      setDepositAlert(true);
      setAlertMessage('Only whole dollar amounts are accepted for deposit transactions.');
      setTimeout(() => {
        setDepositAlert(false);
        setAlertMessage('');
        setDepositAmount(+0.00);
      }, 5000) 

    } else {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({amount: depositAmount})
      }
      const response = await fetch(`http://localhost:3000/transactions/${account.accountNumber}/deposit`, requestOptions);

      const data = await response.json();
  
      if (data && data.hasOwnProperty('depositRestricted') ){
        setDepositAlert(true);
        setAlertMessage(data.depositRestricted ? data.depositRestricted : '');
        setTimeout(() => {
          setDepositAlert(false);
          setAlertMessage('');
          setDepositAmount(+0.00);
        }, 5000)
      }
      setAccount({
        accountNumber: data.account_number,
        name: data.name,
        amount: data.amount,
        type: data.type,
        creditLimit: data.credit_limit,
        withdraw_date: data.withdraw_date,
        total_withdraw_amt: data.total_withdraw_amt
    }
  }

  const withdrawFunds = async () => {

    const withdrawIsInteger = Number.isInteger(withdrawAmount);

    if (!withdrawIsInteger) {
      setWithdrawAlert(true);
      setAlertMessage('Only whole dollar amounts that are specified in $5 increments are accepted for withdrawal transactions.');
      setTimeout(() => {
        setWithdrawAlert(false);
        setAlertMessage('');
        setWithdrawAmount(+0.00);
      }, 5000) 
    }  
    else if ( withdrawAmount < 5 ) {
      setWithdrawAlert(true);
      setAlertMessage('Withdrawal amount is less than the $5 minimum. Only whole dollar amounts that are specified in $5 increments are accepted.');
      setTimeout(() => {
        setWithdrawAlert(false);
        setAlertMessage('');
        setWithdrawAmount(+0.00);
      }, 5000) 
    } else {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({amount: withdrawAmount})
      }
      const response = await fetch(`http://localhost:3000/transactions/${account.accountNumber}/withdraw`, requestOptions);
      
      const data = await response.json();

      if (data && data.hasOwnProperty('withdrawRestricted') ){
        setWithdrawAlert(true);
        setAlertMessage(data.withdrawRestricted ? data.withdrawRestricted : '');
        setTimeout(() => {
          setWithdrawAlert(false);
          setAlertMessage('');
          setWithdrawAmount(+0.00);
        }, 5000)
      }
      setAccount({
        accountNumber: data.account_number,
        name: data.name,
        amount: data.amount,
        type: data.type,
        creditLimit: data.credit_limit,
        withdraw_date: data.withdraw_date,
        total_withdraw_amt: data.total_withdraw_amt
      });
    }
  }

  return (
    <Paper className="account-dashboard">
      <div className="dashboard-header">
        <h1>Hello, {account.name}!</h1>
        <Button variant="contained" onClick={signOut}>Sign Out</Button>
      </div>
      <h2>Balance: ${account.amount}</h2>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          <Card className="deposit-card">
            <CardContent>
              { useDepositAlert ? 
                <>
                  <Alert title="Deposit Failed" description={useAlertMessage} severity="error" /> 
                  <h3>Deposit</h3>
                  <TextField 
                    label="Deposit Amount" 
                    variant="outlined" 
                    type="number"
                    sx={{
                      display: 'flex',
                      margin: 'auto',
                    }}
                    onChange={ (e) => setDepositAmount(+0) }
                  />
                </>
              : 
                <>
                  <h3>Deposit</h3>
                  <TextField 
                    label="Deposit Amount" 
                    variant="outlined" 
                    type="number"
                    sx={{
                      display: 'flex',
                      margin: 'auto',
                    }}
                    onChange={ (e) => setDepositAmount(+e.target.value) }
                  />
                </>
              }
              <Button 
                variant="contained" 
                sx={{
                  display: 'flex', 
                  margin: 'auto', 
                  marginTop: 2}}
                onClick={depositFunds}
                >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className="withdraw-card">
            <CardContent>
              { useWithdrawAlert ? 
                <>
                  <Alert title="Withdrawal Failed" description={useAlertMessage} severity="error" /> 
                  <h3>Withdraw</h3>
                  <TextField 
                    label="Withdraw Amount" 
                    variant="outlined" 
                    type="number" 
                    sx={{
                      display: 'flex',
                      margin: 'auto',
                    }}
                    onChange={(e) => setWithdrawAmount(+0)}
                  />
                </>
              :
                <>
                  <h3>Withdraw</h3>
                  <TextField 
                    label="Withdraw Amount" 
                    variant="outlined" 
                    type="number" 
                    sx={{
                      display: 'flex',
                      margin: 'auto',
                    }}
                    onChange={(e) => setWithdrawAmount(+e.target.value)}
                  />
                </>
              }
              <Button 
                variant="contained" 
                sx={{
                  display: 'flex', 
                  margin: 'auto', 
                  marginTop: 2
                }}
                onClick={withdrawFunds}
                >
                  Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
    
  )
}