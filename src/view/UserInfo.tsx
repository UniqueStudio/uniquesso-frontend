import { Paper } from "@mui/material";
import React from "react";
import { UserInfoForm } from "../components/UserInfo";

export function UserInfoPage() {
    return (
        <Paper
            elevation={12}
            sx={{
                margin: "auto",
                maxWidth: "80%",
                flexGrow: 1,
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
            }}
        >
            <UserInfoForm></UserInfoForm>
        </Paper>
    );
}
