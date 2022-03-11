import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import MailOutlineTwoToneIcon from "@mui/icons-material/MailOutlineTwoTone";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import TelegramIcon from "@mui/icons-material/Telegram";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserInfo } from "../../api/client";
import config from "../../config/config";
import { PasswordInput } from "../Input/Password";
import { SelectorInput } from "../Input/Selector";
import { TextInput } from "../Input/Text";

export function UserInfoForm() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const { handleSubmit, control, getValues, reset } = useForm<UserInfo>({
        mode: "onChange",
        // resolver: yupResolver(schema),
        defaultValues: {
            uid: "UID",
            name: "姓名",
            role_name: "DevOps",
            gender: 0,
            email: "",
            phone: "",
            // TODO: using default image
            avatar_url: "",
        },
    });

    useEffect(() => {
        (async () => {
            // TODO(xylonx): change the hacking mock way
            // const resp = await GetUserInfo();
            const resp: UserInfo = {
                uid: "108e3348-7ecf-11ec-9377-0242ac130005",
                phone: "18272008762",
                email: "xylon-x@foxmail.com",
                role_name: "admin",
                name: "xylonx",
                avatar_url: "https://s3.xylonx.com/file/preview-icc/108e3348-7ecf-11ec-9377-0242ac130005.png",
                gender: 2,
                group: "Web",
                lark_union_id: "",
                join_time: new Date().toDateString(),
            };
            if (resp) {
                setUserInfo(resp);
                reset(resp);
                console.log(getValues());
            }
        })();
    }, []);

    const [editing, setEditing] = useState(false);

    const handleCancel = () => {
        setEditing(!editing);
        reset(userInfo!);
    };

    const handleAfterClickBindLark = () => {
        console.log("bind lark");
    };

    const [loading, setLoading] = useState(false);

    const submit = (data: UserInfo) => {
        setLoading(true);
        console.log(data);
        setLoading(false);
    };

    return (
        <Card>
            <CardHeader
                avatar={<Avatar src={getValues().avatar_url} sx={{ bgcolor: red[500] }}></Avatar>}
                title={getValues().name}
                subheader={getValues().uid}
            />
            {/* TODO(xylonx): using more flexiable way to set all of such form item */}
            <Stack spacing={2} component="form" alignItems="center" textAlign="center" onSubmit={handleSubmit(submit)}>
                <CardContent>
                    <Typography variant="h6">基本信息</Typography>
                    <Box
                        sx={{ display: "flex", justifyContent: "center", flexDirection: "row", flexWrap: "wrap" }}
                        alignItems="center"
                    >
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                            <SelectorInput
                                control={control}
                                disabled={!editing}
                                name="gender"
                                label="性别"
                                helperText="性别不能为空"
                                selections={config.GenderArray}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <TransgenderIcon></TransgenderIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            ></SelectorInput>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                            <TextInput
                                control={control}
                                disabled
                                name="group"
                                label="所在组"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GroupsIcon></GroupsIcon>
                                        </InputAdornment>
                                    ),
                                }}
                                helperText={""}
                            ></TextInput>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                            <TextInput
                                control={control}
                                disabled
                                name="role_name"
                                label="角色"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <TransgenderIcon></TransgenderIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextInput>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                            <TextInput
                                control={control}
                                disabled
                                name="join_time"
                                label="加入时间"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccessTimeFilledIcon></AccessTimeFilledIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextInput>
                        </FormControl>
                    </Box>
                </CardContent>
                <CardContent>
                    <Typography variant="h6">联系方式</Typography>
                    <Box
                        sx={{ display: "flex", justifyContent: "center", flexDirection: "row", flexWrap: "wrap" }}
                        alignItems="center"
                    >
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                            <TextInput
                                control={control}
                                disabled={!editing}
                                name="phone"
                                label="手机号"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon></PhoneIcon>
                                        </InputAdornment>
                                    ),
                                }}
                                helperText={"手机号不能为空且必须为11位数字"}
                            ></TextInput>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                            <TextInput
                                control={control}
                                disabled={!editing}
                                name="email"
                                label="邮箱地址"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineTwoToneIcon></MailOutlineTwoToneIcon>
                                        </InputAdornment>
                                    ),
                                }}
                                helperText={"邮箱不能为空且必须符合格式"}
                            ></TextInput>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                            <TextField
                                variant="standard"
                                size="small"
                                label={`Lark帐号${userInfo?.lark_union_id && "(已绑定)"}`}
                                disabled={true}
                                value={userInfo?.lark_union_id || "未绑定"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <TelegramIcon></TelegramIcon>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="link lark account"
                                                disabled={userInfo?.lark_union_id !== ""}
                                                onClick={handleAfterClickBindLark}
                                            >
                                                <AddLinkIcon></AddLinkIcon>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                        </FormControl>
                    </Box>
                </CardContent>
                <CardContent>
                    <Typography variant="h6">密码</Typography>
                    <Box
                        sx={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}
                        alignItems="center"
                    >
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                            <PasswordInput
                                control={control}
                                disabled={!editing}
                                name="new_password"
                                label="新密码"
                                helperText={"密码不能为空"}
                            ></PasswordInput>
                        </FormControl>
                    </Box>
                </CardContent>
                <CardActions disableSpacing>
                    <Stack direction="row" spacing={2}>
                        <Button
                            color={editing ? "error" : "primary"}
                            variant="contained"
                            endIcon={editing ? <CancelIcon></CancelIcon> : <EditIcon></EditIcon>}
                            onClick={handleCancel}
                        >
                            {editing ? "取消" : "修改"}
                        </Button>

                        <LoadingButton
                            type="submit"
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            确认
                        </LoadingButton>
                    </Stack>
                </CardActions>
            </Stack>
        </Card>
    );
}
