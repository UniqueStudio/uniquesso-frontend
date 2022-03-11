import { DataTypeProvider, DataTypeProviderProps } from "@devexpress/dx-react-grid";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

type AutocompleteTypeProviderProps<
    T extends {
        value: any;
        label: string;
    }
> = DataTypeProviderProps & {
    optionValues: readonly T[];
};

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export function AutocompleteTypeProvider<
    T extends {
        value: any;
        label: string;
    }
>(props: AutocompleteTypeProviderProps<T>) {
    const [valueMap] = useState(new Map(props.optionValues.map((v) => [v.value, v.label])));

    return (
        <DataTypeProvider
            formatterComponent={({ value }: any) => (
                <Box
                    component="ul"
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                    }}
                >
                    {value &&
                        value.map((v: T, idx: number) => {
                            return (
                                <ListItem key={idx}>
                                    <Chip label={valueMap.get(v)} />
                                </ListItem>
                            );
                        })}
                </Box>
            )}
            editorComponent={(editorProps: DataTypeProvider.ValueEditorProps) => (
                <Autocomplete
                    multiple
                    id="multiple-auto-complete"
                    size="small"
                    options={props.optionValues}
                    getOptionLabel={(opt) => opt.label}
                    value={editorProps.value && editorProps.value.map((v: T) => ({ value: v, label: valueMap.get(v) }))}
                    isOptionEqualToValue={(opt, value) => opt.value === value.value}
                    onChange={(event, newValue) => {
                        editorProps.onValueChange(newValue.map((v) => v.value));
                    }}
                    renderInput={(params) => <TextField variant="standard" {...params} />}
                ></Autocomplete>
            )}
            {...props}
        ></DataTypeProvider>
    );
}
