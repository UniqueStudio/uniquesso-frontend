import { faker } from "@faker-js/faker";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ColumnInfo, PermissionControlGrid } from "../DataGrid/PermissionControl";

interface Permission {
    id: number;
    action: string;
    resource: string;
    scope_persons: string[];
    scope_groups: string[];
    scope_all: boolean;
}

interface RoleControlProps {
    roleName: string;
    permissions?: Permission[];
}

const createRow = (): Permission => {
    return {
        id: faker.datatype.number(),
        action: faker.internet.httpMethod(),
        resource: faker.internet.url(),
        scope_persons: ["ss"],
        scope_groups: ["Web", "AI"],
        scope_all: faker.datatype.boolean(),
    };
};

const columnInfos: ColumnInfo[] = [
    { name: "action", label: "Action", width: 80 },
    { name: "resource", label: "Resource", width: 280 },
    {
        name: "scope_persons",
        label: "Scope(Person)",
        width: 280,
        options: [
            { value: "sssssss----ssss", label: "xylonx" },
            { value: "ss", label: "xylonx1" },
        ],
    },
    {
        name: "scope_groups",
        label: "Scope(Group)",
        width: 180,
        options: [
            { value: "AI", label: "ai" },
            { value: "Web", label: "web" },
        ],
    },
    { name: "scope_all", label: "Scope(All)", width: 120 },
];

export function RoleControl(props: RoleControlProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleEdit = () => setOpenDialog(true);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEdit(false);
    };

    const handleEditPermission = () => setEdit(!edit);

    return (
        <Box>
            <Card sx={{ width: 200, m: 2, p: 1 }}>
                <CardContent>
                    <Box textAlign="center">
                        <Typography variant="subtitle1">{props.roleName}</Typography>
                    </Box>
                </CardContent>
                <CardActions disableSpacing>
                    <Button variant="outlined" sx={{ margin: "auto" }} onClick={handleEdit}>
                        编辑
                    </Button>
                </CardActions>
            </Card>
            <Dialog maxWidth="xl" open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle> {props.roleName} </DialogTitle>
                <DialogContent>
                    <PermissionControlGrid
                        disableEdit={!edit}
                        rowData={[createRow(), createRow(), createRow()]}
                        colInfo={columnInfos}
                        booleanFieldNames={["scope_all"]}
                        multiSelectNames={["scope_groups", "scope_persons"]}
                        onCommit={(changedRows: Permission[]) => {
                            console.log(changedRows);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color={edit ? "error" : "primary"} autoFocus onClick={handleEditPermission}>
                        {edit ? "取消" : "编辑"}
                    </Button>
                    <Button color="error" autoFocus onClick={handleCloseDialog}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
