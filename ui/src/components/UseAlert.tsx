import React, { useState } from "react";
import { Stack, Alert } from "@mui/material";

type UseAlertProps = {
    severity: string;
    message: string;
}

export const UseAlert = ( props: UseAlertProps) => {
    const [alertSeverity, setAlertSeverity] = useState(props.severity); 
    const [alertMessage, setAlertMessage] = useState(props.message); 
    return (
        <Stack spacing={2}>
            <Alert severity={alertSeverity}>{alertMessage}</Alert>
        </Stack>
    )
}