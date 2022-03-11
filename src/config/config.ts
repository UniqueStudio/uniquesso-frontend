export default {
    // eslint-disable-next-line no-undef
    BaseURL: process.env.REACT_APP_API_URL,
    // eslint-disable-next-line no-undef
    SMSRefreshSeconds: +process.env.REACT_APP_SMS_REFRESH_SECONDS! || 60,
    GenderArray: [
        { key: 1, value: "Male" },
        { key: 2, value: "Female" },
    ],
};
