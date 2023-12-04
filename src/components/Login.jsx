import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const baseUrl = 'http://localhost:3030/users/login'
const LoginFormKyes = {
    Email: 'email',
    Password: 'password',
}

export default function Login() {
    const [values, setValues] = useState(LoginFormKyes);
    const navigate = useNavigate();


    const onChange = (e) => {

        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`${baseUrl}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    ...(token && { 'X-Authorization': token })
                },
                body: JSON.stringify(values)
            });
            if (response.status === 204) {
                return {}
            }
            const result = await response.json();

            if (!response.ok) {
                throw response
            };
            return result;

        } catch (err) {
            console.log(err);
        };

    };


    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmit}>

                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name={LoginFormKyes.Email}
                        placeholder="Sokka@gmail.com"
                        onChange={onChange}
                        value={values[LoginFormKyes.Email]}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name={LoginFormKyes.Password}
                        onChange={onChange}
                        value={values[LoginFormKyes.Password]}
                    />
                    <br />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};