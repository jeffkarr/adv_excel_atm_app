import React, { useState } from "react"
import { Stack, Alert } from "@mui/material"

type UseAlertProps = {
    severity: string;
    message: string;
}

export const UseAlert = ( props: UseAlertProps) => {
    return (
        <Stack spacing={2}>
            <Alert severity='warning'>Test Alert Message</Alert>
        </Stack>
    )
}