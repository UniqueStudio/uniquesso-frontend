import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { Chip, Input, MenuItem, Select } from "@mui/material";
import React from "react";

const BooleanFormatter = ({ value }: any) => <Chip label={value ? "Yes" : "No"} />;

const BooleanEditor = ({ value, onValueChange }: any) => (
    <Select
        input={<Input />}
        value={value ? "Yes" : "No"}
        onChange={(event) => onValueChange(event.target.value === "Yes")}
        style={{ width: "100%" }}
    >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
    </Select>
);

export const BooleanTypeProvider = (props: any) => (
    <DataTypeProvider formatterComponent={BooleanFormatter} editorComponent={BooleanEditor} {...props} />
);
