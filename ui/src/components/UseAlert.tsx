import React, { useState } from "react";
import { Stack, Alert } from "@mui/material";

type UseAlertProps = {
    severity: string;
    message: string;
}

export const UseAlert = ( props: UseAlertProps) => {   
    const [alertMessage, setAlertMessage] = useState(props.message); 
    const alertSeverity = props.severity ?? 'danger'; 
    return (
        <Stack spacing={2}>
            <Alert severity={alertSeverity}>{alertMessage}</Alert>
        </Stack>
    )
}