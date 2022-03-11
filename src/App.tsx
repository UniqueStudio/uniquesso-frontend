import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckAuth } from "./api/client";
import "./App.css";
import background from "./assets/background.png";
import { GlobalStateContextProvider } from "./context/globalState";
import logo from "./logo.svg";
import { LoginPage } from "./view/Login";
import { NotFoundPage } from "./view/NotFound";
import { RegisterPage } from "./view/Register";
import { RoleControlPage } from "./view/Role";
import { UserInfoPage } from "./view/UserInfo";

const routers = {
    "/login": <LoginPage></LoginPage>,
    "/register": <RegisterPage></RegisterPage>,
    "/": <Home></Home>,
    "/about": <About></About>,
    "/my": <UserInfoPage></UserInfoPage>,
    "/role": <RoleControlPage></RoleControlPage>,
    "*": <NotFoundPage></NotFoundPage>,
};

const escapePath = ["/login", "/register"];

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
            <Link to="/about">Home</Link>
        </div>
    );
}

function About() {
    return (
        <div>
            <h1>Hello, this is about page</h1>
            <Link to="/">Home</Link>
        </div>
    );
}

// FIXME(xylonx): for the async reason, before navigate to login page, it will flash the before page.
function AuthCheck({ children }: { children: React.ReactElement }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            // TODO(xylonx): below return instruction is just for developing. MUST remove it when deploy
            return;
            // eslint-disable-next-line no-unreachable
            if (!escapePath.includes(location.pathname) && !(await CheckAuth())) navigate("/login");
        })();
    }, []);

    return children;
}

function App() {
    return (
        <div>
            <Box
                sx={{
                    background: `url("${background}")`,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ToastContainer
                    position="top-right"
                    autoClose={1650}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    limit={4}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <GlobalStateContextProvider>
                    <Box>
                        <BrowserRouter>
                            <AuthCheck>
                                <Routes>
                                    {Object.entries<React.ReactElement>(routers).map(([path, element]) => (
                                        <Route key={path} path={path} element={element}></Route>
                                    ))}
                                </Routes>
                            </AuthCheck>
                        </BrowserRouter>
                    </Box>
                </GlobalStateContextProvider>
            </Box>
        </div>
    );
}

export default App;
