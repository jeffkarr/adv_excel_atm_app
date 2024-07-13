import React, { useState } from "react";
import { Stack, Alert } from "@mui/material";

type UseAlertProps = {
    message: string;
}

export const UseAlert = ( props: UseAlertProps) => {   
    const [alertMessage, setAlertMessage] = useState(props.message); 
    return (
        <Stack spacing={2}>
            <Alert severity="error">{alertMessage}</Alert>
        </Stack>
    )
}