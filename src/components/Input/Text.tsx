import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

// interface TextInputProps<T> extends UseControllerProps<T> {
//     inputLabel: string;
//     helperText: string;
//     startIcon: React.ReactNode;
// }

type TextInputProps<T> = UseControllerProps<T> & TextFieldProps;

export function TextInput<T>(props: TextInputProps<T>) {
    const {
        field,
        fieldState: { invalid },
    } = useController(props);

    return (
        <TextField
            {...field}
            {...props}
            variant="standard"
            size="small"
            error={invalid}
            helperText={invalid && props.helperText}
        />
    );
}
