import { yupResolver } from "@hookform/resolvers/yup";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import TokenIcon from "@mui/icons-material/Token";
import { LoadingButton } from "@mui/lab";
import { CardActions, FormControl, InputAdornment, Stack } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { LoginByPhone } from "../../api/client";
import { PasswordInput } from "../Input/Password";
import { TextInput } from "../Input/Text";

interface PhonePassword {
    phone: string;
    password: string;
    totpToken: string;
}

const schema = yup
    .object()
    .shape({
        phone: yup.string().required().length(11),
        password: yup.string().required(),
        totpToken: yup.string(),
    })
    .required();

export default function PhoneLogin() {
    const { handleSubmit, control } = useForm<PhonePassword>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            phone: "",
            password: "",
            totpToken: "",
        },
    });

    const [loading, setLoading] = useState(false);

    const submit = async (data: PhonePassword) => {
        setLoading(true);
        await LoginByPhone(data.phone, data.password, data.totpToken);
        setLoading(false);
    };

    return (
        <Stack spacing={2} component="form" alignItems="center" onSubmit={handleSubmit(submit)}>
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
                <PasswordInput
                    control={control}
                    name="password"
                    label="密码"
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
