import React, { Dispatch, useReducer } from "react";
import { toast } from "react-toastify";

interface GlobalState {
    theme: "light" | "dark";
    userGroupMeta: {
        users: string[];
        groups: string[];
    };
}

type Action = { type: "reverseTheme" } | { type: "updateUserGroupMeta" };

const defaultState: GlobalState = {
    theme: "light",
    userGroupMeta: {
        users: [],
        groups: [],
    },
};

export const globalStateContext = React.createContext<[GlobalState, Dispatch<Action>]>([defaultState, () => {}]);

const reducer = (state: GlobalState, action: Action): GlobalState => {
    switch (action.type) {
        case "reverseTheme":
            console.log("reverse themes");
            return Object.assign({}, state, { theme: state.theme === "light" ? "dark" : "light" });
        case "updateUserGroupMeta":
            return defaultState;
        default:
            toast.error("Action not supported");
            return defaultState;
    }
};

export const GlobalStateContextProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    return <globalStateContext.Provider value={[state, dispatch]}>{children}</globalStateContext.Provider>;
};
