import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordIcon from "@mui/icons-material/Password";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

type PasswordInputProps<T> = UseControllerProps<T> & TextFieldProps;

export function PasswordInput<T>(props: PasswordInputProps<T>) {
    const [showPassword, setShowPassword] = useState(false);
    const {
        field,
        fieldState: { invalid },
    } = useController(props);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <TextField
            {...field}
            {...props}
            variant="standard"
            size="small"
            error={invalid}
            helperText={invalid && props.helperText}
            type={showPassword ? "text" : "password"}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <PasswordIcon></PasswordIcon>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            disabled={props.disabled}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}
