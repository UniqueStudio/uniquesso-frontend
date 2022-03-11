import { yupResolver } from "@hookform/resolvers/yup";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import TextsmsTwoToneIcon from "@mui/icons-material/TextsmsTwoTone";
import { LoadingButton } from "@mui/lab";
import { CardActions, FormControl, InputAdornment, Stack } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { LoginBySMS, SendSMSCode } from "../../api/client";
import { TextInput } from "../Input/Text";
import { TextButtonInput } from "../Input/TextButton";

interface PhoneSMS {
    phone: string;
    smsCode: string;
}

interface SMSLoginProps {
    smsRefreshSeconds: number;
}

const schema = yup
    .object()
    .shape({
        phone: yup.string().required().length(11),
        smsCode: yup.string().required().min(4),
    })
    .required();

export function SMSLogin(props: SMSLoginProps) {
    const { handleSubmit, control, getValues } = useForm<PhoneSMS>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            phone: "",
            smsCode: "",
        },
    });

    const [loading, setLoading] = useState(false);

    const handleAfterClickSendSMS = async () => {
        await SendSMSCode(getValues().phone);
    };

    const submit = async (data: PhoneSMS) => {
        setLoading(true);
        await LoginBySMS(data.phone, data.smsCode);
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
