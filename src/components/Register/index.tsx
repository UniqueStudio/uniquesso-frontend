import { yupResolver } from "@hookform/resolvers/yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineTwoToneIcon from "@mui/icons-material/MailOutlineTwoTone";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import TextsmsTwoToneIcon from "@mui/icons-material/TextsmsTwoTone";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { LoadingButton } from "@mui/lab";
import { Box, CardActions, FormControl, InputAdornment, Stack } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { RegisterUser, SendSMSCode } from "../../api/client";
import config from "../../config/config";
import { PasswordInput } from "../Input/Password";
import { SelectorInput } from "../Input/Selector";
import { TextInput } from "../Input/Text";
import { TextButtonInput } from "../Input/TextButton";

interface RegisterProps {
    smsRefreshSeconds: number;
}

interface RegisterForm {
    name: string;
    gender: number;
    email: string;
    phone: string;
    smsCode: string;
    password: string;
}

const schema = yup
    .object()
    .shape({
        name: yup.string().required(),
        gender: yup
            .number()
            .required()
            .oneOf(config.GenderArray.map((v) => v.key)),
        email: yup.string().required().email(),
        // TODO(xylonx); change length to suit multiple country
        phone: yup.string().required().length(11),
        smsCode: yup.string().required().min(4),
        password: yup.string().required(),
    })
    .required();

export function Register(props: RegisterProps) {
    const { handleSubmit, control, getValues } = useForm<RegisterForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            gender: 0,
            email: "",
            phone: "",
            smsCode: "",
            password: "",
        },
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleAfterClickSendSMS = async () => {
        await SendSMSCode(getValues().phone);
    };

    const submit = async (data: RegisterForm) => {
        setLoading(true);
        const resp = await RegisterUser(data.name, data.gender, data.phone, data.email, data.password, data.smsCode);
        setLoading(false);
        if (resp !== null) navigate("/login");
    };

    return (
        <Stack spacing={2} component="form" alignItems="center" onSubmit={handleSubmit(submit)}>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <Box display="grid" gridTemplateColumns="6fr 6fr" gap={1}>
                    <TextInput
                        control={control}
                        name="name"
                        label="姓名"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon></AccountCircleIcon>
                                </InputAdornment>
                            ),
                        }}
                        helperText={"姓名不能为空"}
                    ></TextInput>
                    <SelectorInput
                        control={control}
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
                </Box>
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <TextInput
                    control={control}
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
                <TextInput
                    control={control}
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
                <TextButtonInput
                    control={control}
                    afterClick={handleAfterClickSendSMS}
                    refetchDuration={props.smsRefreshSeconds}
                    name="smsCode"
                    label="短信验证码"
                    startIcon={<TextsmsTwoToneIcon></TextsmsTwoToneIcon>}
                    helperText={"短信验证码不能为空且至少为4位数字"}
                ></TextButtonInput>
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <PasswordInput
                    control={control}
                    name="password"
                    label="密码"
                    helperText={"密码不能为空"}
                ></PasswordInput>
            </FormControl>

            <CardActions>
                <LoadingButton
                    type="submit"
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                >
                    登录
                </LoadingButton>
            </CardActions>
        </Stack>
    );
}
