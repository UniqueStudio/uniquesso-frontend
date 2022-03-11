import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import config from "../config/config";

const client = axios.create({
    baseURL: config.BaseURL,
});

interface Response<T> {
    message: string;
    data: T;
}

interface LoginForm {
    email?: string;
    phone?: string;
    password?: string;
    validate_code?: string;
    totp_token?: string;
}

interface apiWrapperConfig {
    toastError?: boolean;
}

async function apiWrapper<T>(
    request: Promise<AxiosResponse<Response<T>, any>>,
    config: apiWrapperConfig = { toastError: true }
): Promise<T | null> {
    try {
        const { data } = await request;
        return data.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            const resp = err.response.data as Response<T>;
            if (config.toastError) toast.error(resp.message);
        } else {
            if (config.toastError) toast.error(`网络错误: ${err}`);
        }
    }
    return null;
}

async function login(form: LoginForm): Promise<string | null> {
    const resp = await apiWrapper<string>(client.post<Response<string>>("/login", form));
    if (resp !== null) toast.success("登录成功");
    return resp;
}

export async function LoginByEmail(email: string, password: string, totpToken: string): Promise<string | null> {
    return await login({
        email: email,
        password: password,
        totp_token: totpToken,
    });
}

export async function LoginByPhone(phone: string, password: string, totpToken: string): Promise<string | null> {
    return await login({
        phone: phone,
        password: password,
        totp_token: totpToken,
    });
}

export async function LoginBySMS(phone: string, smsCode: string): Promise<string | null> {
    return await login({
        phone: phone,
        validate_code: smsCode,
    });
}

export async function SendSMSCode(phone: string): Promise<string | null> {
    const resp = await apiWrapper<string>(client.post<Response<string>>("/sms/code", { phone: phone }));
    if (resp !== null) toast.success("发送短信验证码成功");
    return resp;
}

export async function RegisterUser(
    name: string,
    gender: number,
    phone: string,
    email: string,
    password: string,
    smsCode: string
): Promise<string | null> {
    const resp = await apiWrapper<string>(
        client.post<Response<string>>("/register", {
            name: name,
            gender: gender,
            phone: phone,
            email: email,
            password: password,
            validate_code: smsCode,
        })
    );
    if (resp !== null) toast.success("注册成功");
    return resp;
}

export async function CheckAuth(): Promise<boolean> {
    const resp = await apiWrapper<string>(client.get<Response<string>>("/auth/ping"), { toastError: false });
    return resp !== null;
}

export interface UserInfo {
    uid: string;
    phone: string;
    email: string;
    role_name: string;
    name: string;
    avatar_url: string;
    gender: number;
    group: string;
    lark_union_id: string;
    new_password?: string;
    join_time: string;
}

export async function GetUserInfo(): Promise<UserInfo | null> {
    const resp = await apiWrapper<UserInfo>(client.get<Response<UserInfo>>("/user/my"));
    if (resp !== null) toast.success("拉取个人信息成功");
    return resp;
}

export interface UserGroupInfo {
    groups: string[];
    users: UserInfo[];
}

// TODO(xylonx):
export async function FetchAllUserGroupInfo(): Promise<UserGroupInfo | null> {
    return null;
}
