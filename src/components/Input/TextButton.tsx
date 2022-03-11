import { Box, Button, Grid, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

type SMSInputProps<T> = UseControllerProps<T> &
    TextFieldProps & {
        startIcon: React.ReactNode;
        refetchDuration: number;
        afterClick: () => void;
    };

export function TextButtonInput<T>(props: SMSInputProps<T>) {
    const {
        field,
        fieldState: { invalid },
    } = useController(props);

    function handleClick() {
        setSecondLeft(props.refetchDuration);
        props.afterClick();
    }

    const [secondLeft, setSecondLeft] = useState(0);
    useEffect(() => {
        const ticker = setInterval(() => {
            if (secondLeft === 0) {
                clearInterval(ticker);
                return;
            }
            setSecondLeft(secondLeft - 1);
        }, 1000);
        return () => {
            clearInterval(ticker);
        };
    }, [secondLeft]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                    <TextField
                        {...field}
                        {...props}
                        variant="standard"
                        size="small"
                        error={invalid}
                        helperText={invalid && props.helperText}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{props.startIcon}</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <Button size="medium" onClick={handleClick} disabled={secondLeft !== 0} variant="contained">
                        {secondLeft === 0 ? "获取验证码" : `${secondLeft}秒后获取`}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
