import { Box } from "@mui/material";
import React from "react";
import { RoleControl } from "../components/Role";

export function RoleControlPage() {
    // const [permissions]
    return (
        <Box
            sx={{ display: "flex", justifyContent: "center", flexDirection: "row", flexWrap: "wrap" }}
            alignItems="center"
        >
            {/* <Stack spacing={2} alignItems="center" textAlign="center"> */}
            <RoleControl roleName={"admin"}></RoleControl>
            <RoleControl roleName={"admin"}></RoleControl>
            <RoleControl roleName={"admin"}></RoleControl>
            <RoleControl roleName={"admin"}></RoleControl>
            <RoleControl roleName={"admin"}></RoleControl>
            <RoleControl roleName={"admin"}></RoleControl>
            {/* </Stack> */}
        </Box>
    );
}
