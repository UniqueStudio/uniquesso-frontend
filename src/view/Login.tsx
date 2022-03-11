import { DashboardRounded as DashboardIcon } from "@mui/icons-material";
import { Avatar, Box, Container, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import { EmailLogin } from "../components/Login/EmailLogin";
import { LarkOauthLogin } from "../components/Login/LarkLogin";
import PhoneLogin from "../components/Login/PhoneLogin";
import { SMSLogin } from "../components/Login/SMSLogin";
import config from "../config/config";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export function LoginPage() {
    const [tabSelect, setTabSelect] = React.useState(0);
    const smsRefreshSeconds = config.SMSRefreshSeconds;

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabSelect(newValue);
    };

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
                    {/* <EmailLogin></EmailLogin> */}
                </Stack>

                <Tabs value={tabSelect} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                    <Tab label="邮箱密码" {...a11yProps(0)}></Tab>
                    <Tab label="手机号密码" {...a11yProps(1)}></Tab>
                    <Tab label="手机验证码" {...a11yProps(2)}></Tab>
                    <Tab label="Lark扫码" {...a11yProps(3)}></Tab>
                </Tabs>
                <TabPanel value={tabSelect} index={0}>
                    <EmailLogin></EmailLogin>
                </TabPanel>
                <TabPanel value={tabSelect} index={1}>
                    <PhoneLogin></PhoneLogin>
                </TabPanel>
                <TabPanel value={tabSelect} index={2}>
                    <SMSLogin smsRefreshSeconds={smsRefreshSeconds}></SMSLogin>
                </TabPanel>
                <TabPanel value={tabSelect} index={3}>
                    <LarkOauthLogin></LarkOauthLogin>
                </TabPanel>

                <Stack alignItems="center">
                    <Typography variant="caption" color="textSecondary">
                        没有账号？ 立即
                        <Link to="/register">注册</Link>
                    </Typography>
                </Stack>
            </Paper>
        </Container>
    );
}
