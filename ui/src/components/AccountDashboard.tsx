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
  const [depositAmount, setDepositAmount] = useState(0.0);
  const [withdrawAmount, setWithdrawAmount] = useState(0.0);
  const [useAlert, setUseAlert] = useState(false);
  const [useAlertMessage, setUseAlertMessage] = useState('');
  const [account, setAccount] = useState(props.account); 
  
  const tempAmt  = Math.round(depositAmount * 100) / 100;
  setDepositAmount(+tempAmt);

  const {signOut} = props;

  const depositFunds = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({amount: depositAmount})
    }
    const response = await fetch(`http://localhost:3000/transactions/${account.accountNumber}/deposit`, requestOptions);
    const data = await response.json();
    console.dir(data, {depth:null, colors:true});

    if (data && data.hasOwnProperty('restricted') ){
      setUseAlert(true);
      setUseAlertMessage(data.restricted ? data.restricted : '');
      setTimeout(() => {
        setUseAlert(false);
        setUseAlertMessage('');
        setDepositAmount(+0.00);
      }, 5000)
    }
    setAccount({
      accountNumber: data.account_number,
      name: data.name,
      amount: data.amount,
      type: data.type,
      creditLimit: data.credit_limit
    });
  }

  const withdrawFunds = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({amount: withdrawAmount})
    }
    const response = await fetch(`http://localhost:3000/transactions/${account.accountNumber}/withdraw`, requestOptions);
    const data = await response.json();
    setAccount({
      accountNumber: data.account_number,
      name: data.name,
      amount: data.amount,
      type: data.type,
      creditLimit: data.credit_limit
    });
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
              { useAlert ? 
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
                    onChange={ (e) => setDepositAmount(+0.00) }
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