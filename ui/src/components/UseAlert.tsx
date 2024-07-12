import { Stack, Alert } from "@mui/material"

type UseAlertProps = {
    severity: string;
    message: string;
}

export const UseAlert = ( props: UseAlertProps) => {
    return (
        <Stack spacing={2}>
            <Alert severity={props.severity}>{props.message}</Alert>
        </Stack>
    )
}