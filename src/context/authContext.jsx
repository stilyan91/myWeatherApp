import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();
const baseUrl = 'http://localhost:3030/users/login';


export const AuthProvider = ({
    children
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});

    const loginHandler = async (email, password) => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`${baseUrl}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 204) {
                return {}
            };
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            };

            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            navigate('/');


        } catch (err) {
            console.error(err);
        };
    }

    const logoutHandler = async () => {
        setAuth({});
        localStorage.removeItem('accessToken');
    };


    const values = {
        loginHandler,
        logoutHandler,
        username: auth.username || auth.email,
        email: auth.email,
        userId: auth._id,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};
AuthContext.displayName = 'AuthContext';
export default AuthContext; 