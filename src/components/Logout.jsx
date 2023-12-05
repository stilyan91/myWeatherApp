import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import LoadingBar from '../components/LoadingBar';


export const Logout = () => {
    const navigate = useNavigate();
    const { logoutHandler } = useContext(AuthContext);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const doLogout = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch('http://localhost:3030/users/logout', {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        ...(token && { 'X-Authorization': token })
                    }
                });

                if (response.ok) {
                    logoutHandler();
                    navigate('/');
                };
            } catch (err) {
                console.error("Logout failed", err);
            };
        };
        doLogout();
    }, []);

    return (<LoadingBar />);
};