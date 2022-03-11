import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

type SelectorInputProps<T> = UseControllerProps<T> &
    TextFieldProps & {
        selections: { key: string | number; value: string }[];
    };

export function SelectorInput<T>(props: SelectorInputProps<T>) {
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
            select
            helperText={invalid && props.helperText}
        >
            {props.selections.map(({ key, value }) => (
                <MenuItem key={key} value={key}>
                    {value}
                </MenuItem>
            ))}
        </TextField>
    );
}
