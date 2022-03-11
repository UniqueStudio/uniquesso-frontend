import { yupResolver } from "@hookform/resolvers/yup";
import MailOutlineTwoToneIcon from "@mui/icons-material/MailOutlineTwoTone";
import PasswordIcon from "@mui/icons-material/Password";
import SendIcon from "@mui/icons-material/Send";
import TokenIcon from "@mui/icons-material/Token";
import LoadingButton from "@mui/lab/LoadingButton";
import { CardActions, FormControl, InputAdornment, Stack } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { LoginByEmail } from "../../api/client";
import { PasswordInput } from "../Input/Password";
import { TextInput } from "../Input/Text";

interface EmailPassword {
    email: string;
    password: string;
    totpToken: string;
}

const schema = yup
    .object()
    .shape({
        email: yup.string().required().email(),
        password: yup.string().required(),
        totpToken: yup.string(),
    })
    .required();

export function EmailLogin() {
    const { handleSubmit, control } = useForm<EmailPassword>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
            totpToken: "",
        },
    });

    const [loading, setLoading] = useState(false);

    const submit = async (data: EmailPassword) => {
        setLoading(true);
        await LoginByEmail(data.email, data.password, data.totpToken);
        setLoading(false);
    };
    return (
        <Stack spacing={2} component="form" alignItems="center" onSubmit={handleSubmit(submit)}>
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
                <PasswordInput
                    control={control}
                    name="password"
                    label="密码"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PasswordIcon></PasswordIcon>
                            </InputAdornment>
                        ),
                    }}
                    helperText={"密码不能为空"}
                ></PasswordInput>
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <TextInput
                    control={control}
                    name="totpToken"
                    label="两步验证码"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TokenIcon></TokenIcon>
                            </InputAdornment>
                        ),
                    }}
                    helperText={"两步验证码必须为6位数字"}
                ></TextInput>
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
