import { DashboardRounded as DashboardIcon } from "@mui/icons-material";
import { Avatar, Container, Paper, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import { Register as RegisterForm } from "../components/Register";
import config from "../config/config";

export function RegisterPage() {
    const smsRefreshSeconds = config.SMSRefreshSeconds;

    return (
        <Container maxWidth="xs">
            <Paper elevation={12} sx={{ p: 4 }}>
                <Stack spacing={2} alignItems="center">
                    <Avatar
                        sx={{
                            height: 64,
                            width: 64,
                            bgcolor: blue[50],
                        }}
                    >
                        <DashboardIcon color="primary" fontSize="large" />
                    </Avatar>
                    <Stack spacing={1} alignItems="center">
                        <Typography variant="h5">联创团队统一登录系统</Typography>
                        <Typography variant="subtitle1">UniqueSSO</Typography>
                    </Stack>
                </Stack>

                <RegisterForm smsRefreshSeconds={smsRefreshSeconds}></RegisterForm>

                <Stack alignItems="center">
                    <Typography variant="caption" color="textSecondary">
                        已有账号？ 立即
                        <Link to="/login">登录</Link>
                    </Typography>
                </Stack>
            </Paper>
        </Container>
    );
}
