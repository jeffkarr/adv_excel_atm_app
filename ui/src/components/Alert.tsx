import React, { useState } from "react"
import { Stack, Alert } from "@mui/material"

export const Alert = () => {
    return (
        <Stack spacing={2}>
            <Alert severity='warning'>Test Alert Message</Alert>
        </Stack>
    )
}