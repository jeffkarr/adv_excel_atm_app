import React, { useState } from "react";
import { Stack, Alert } from "@mui/material";
import type { Color } from '@material-ui/lab/Alert'

interface UseAlertProps {
    severity: Color;
    message: string;
}

export const UseAlert = ( props: UseAlertProps) => {   
    // const [alertMessage, setAlertMessage] = useState(props.message); 
    // const [alertSeverity, setAlertSeverity] = useState(props.severity);
    // if (!alertSeverity) {
    //     setAlertSeverity('error');
    // }   

    const {severity, message} = props;
    return (
        <Stack spacing={2}>
            <Alert severity={severity}>{message}</Alert>
        </Stack>
    )
}