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
                    label="ζζΊε·"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneIcon></PhoneIcon>
                            </InputAdornment>
                        ),
                    }}
                    helperText={"ζζΊε·δΈθ½δΈΊη©ΊδΈεΏι‘»δΈΊ11δ½ζ°ε­"}
                ></TextInput>
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <PasswordInput
                    control={control}
                    name="password"
                    label="ε―η "
                    helperText={"ε―η δΈθ½δΈΊη©Ί"}
                ></PasswordInput>
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <TextInput
                    control={control}
                    name="totpToken"
                    label="δΈ€ζ­₯ιͺθ―η "
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TokenIcon></TokenIcon>
                            </InputAdornment>
                        ),
                    }}
                    helperText={"δΈ€ζ­₯ιͺθ―η εΏι‘»δΈΊ6δ½ζ°ε­"}
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
                    η»ε½
                </LoadingButton>
            </CardActions>
        </Stack>
    );
}
