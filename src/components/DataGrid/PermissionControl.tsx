import { ChangeSet, EditingState, TableColumnWidthInfo } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableColumnResizing,
    TableEditColumn,
    TableEditRow,
    TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Button, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import { AutocompleteTypeProvider } from "./AutocompleteTypeProvider";
import { BooleanTypeProvider } from "./BooleanTypeProvider";

// =================
// Icon Button
// =================
const AddButton = ({ onExecute, disabled }: any) => (
    <div style={{ textAlign: "center" }}>
        <Button disabled={disabled} color="primary" onClick={onExecute} title="Create new row">
            New
        </Button>
    </div>
);

const EditButton = ({ onExecute, disabled }: any) => (
    <IconButton disabled={disabled} onClick={onExecute} title="Edit row" size="large">
        <EditIcon />
    </IconButton>
);

const DeleteButton = ({ onExecute, disabled }: any) => (
    <IconButton
        disabled={disabled}
        onClick={() => {
            // eslint-disable-next-line
            if (window.confirm("Are you sure you want to delete this row?")) {
                onExecute();
            }
        }}
        title="Delete row"
        size="large"
    >
        <DeleteIcon />
    </IconButton>
);

const CommitButton = ({ onExecute, disabled }: any) => (
    <IconButton disabled={disabled} onClick={onExecute} title="Save changes" size="large">
        <SaveIcon />
    </IconButton>
);

const CancelButton = ({ onExecute, disabled }: any) => (
    <IconButton disabled={disabled} color="secondary" onClick={onExecute} title="Cancel changes" size="large">
        <CancelIcon />
    </IconButton>
);

// eslint-disable-next-line no-unused-vars
const commandComponents = new Map<string, ({ onExecute, disabled }: any) => React.ReactElement>([
    ["add", AddButton],
    ["edit", EditButton],
    ["delete", DeleteButton],
    ["commit", CommitButton],
    ["cancel", CancelButton],
]);

const Command = (disabled: boolean) => {
    const iconCommandButton = ({ id, onExecute }: TableEditColumn.CommandProps) => {
        const CommandButton = commandComponents.get(id);
        if (!CommandButton) return null;
        return <CommandButton onExecute={onExecute} disabled={disabled}></CommandButton>;
    };
    return iconCommandButton;
};

// =================
// Grid Row Data
// =================

export interface ColumnOption {
    value: any;
    label: string;
}

export interface ColumnInfo {
    name: string;
    label: string;
    width?: number;
    options?: ColumnOption[];
}

interface PermissionControlGridProps<T> {
    rowData: T[];
    colInfo: ColumnInfo[];
    disableEdit: boolean;
    booleanFieldNames?: string[];
    multiSelectNames?: string[];
    // eslint-disable-next-line no-unused-vars
    onCommit: (changedRows: T[]) => void;
}

export function PermissionControlGrid<T extends { id: number }>(props: PermissionControlGridProps<T>) {
    const [columns] = useState(props.colInfo.map((v) => ({ name: v.name, title: v.label, width: v.width || 80 })));

    const [columnWidths, setColumnWidths] = useState<TableColumnWidthInfo[]>(
        columns.map((v) => ({ columnName: v.name, width: v.width }))
    );

    const [rows, setRows] = useState(props.rowData);

    const [name2Col] = useState(new Map<string, ColumnInfo>(props.colInfo.map((v) => [v.name, v])));

    // eslint-disable-next-line no-unused-vars
    const handleCommitChanges = ({ added, changed, deleted }: ChangeSet) => {
        let changedRows: T[] = [];
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row: any, idx: number) => ({
                    id: startingAddedId + idx,
                    ...row,
                })),
            ];
        }

        if (changed) changedRows = rows.map((row) => (changed[row.id] ? { ...row, ...changed[row.id] } : row));

        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter((row) => !deletedSet.has(row.id));
        }
        setRows(changedRows);
        props.onCommit(changedRows);
    };

    return (
        <Paper>
            <Grid rows={rows} columns={columns} getRowId={(row: any) => row.id}>
                <BooleanTypeProvider for={props.booleanFieldNames}></BooleanTypeProvider>

                {props.multiSelectNames &&
                    props.multiSelectNames.map((v, idx) => (
                        <AutocompleteTypeProvider
                            key={idx}
                            for={[name2Col.get(v)!!.name]}
                            optionValues={name2Col.get(v)!!.options || []}
                        ></AutocompleteTypeProvider>
                    ))}

                <EditingState onCommitChanges={handleCommitChanges} defaultEditingRowIds={[0]}></EditingState>
                <Table></Table>
                <TableColumnResizing
                    columnWidths={columnWidths}
                    onColumnWidthsChange={setColumnWidths}
                ></TableColumnResizing>
                <TableHeaderRow></TableHeaderRow>
                <TableEditRow></TableEditRow>
                <TableEditColumn
                    showAddCommand
                    showEditCommand
                    showDeleteCommand
                    commandComponent={Command(props.disableEdit)}
                ></TableEditColumn>
            </Grid>
        </Paper>
    );
}
