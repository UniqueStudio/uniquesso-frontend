import { DataTypeProvider, DataTypeProviderProps } from "@devexpress/dx-react-grid";
import { Chip, Input, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

interface SelectValue<T> {
    value: T;
    label: string;
}

type EnumTypeProviderProps<T> = DataTypeProviderProps & {
    enumValues: readonly SelectValue<T>[];
    defaultValue: SelectValue<T>;
};

// FIXME(xylonx): still contains bug
export function SelectTypeProvider<T>(props: EnumTypeProviderProps<T>) {
    const [value2Label] = useState(new Map(props.enumValues.map((v) => [v.value, v.label])));

    return (
        <DataTypeProvider
            formatterComponent={({ value }: any) => <Chip label={value2Label.get(value)}></Chip>}
            editorComponent={(editorProps: DataTypeProvider.ValueEditorProps) => {
                return (
                    <Select
                        input={<Input></Input>}
                        defaultValue={props.defaultValue.label}
                        value={editorProps.value}
                        onChange={(event) => editorProps.onValueChange(event.target.value)}
                    >
                        {props.enumValues.map((v) => (
                            <MenuItem key={v.label} value={v.label}>
                                {v.label}
                            </MenuItem>
                        ))}
                    </Select>
                );
            }}
            {...props}
        ></DataTypeProvider>
    );
}
