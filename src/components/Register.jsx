import '../styles/loginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterFormKeys = {
    email: '',
    password: '',
    'confirm-password': '',
};

const baseUrl = 'http://localhost:3030/users';

export default function Register() {
    const [values, setValues] = useState(RegisterFormKeys);
    const navigate = useNavigate();


    const onChange = (e) => {

        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');

        try {
            const response = await (fetch(`${baseUrl}/register`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        ...(token && { 'X-Authorization': token })
                    },
                    body: JSON.stringify(values)
                }));

            if (response.status === 204) {
                navigate('/login');
                return;
            }
            const result = await response.json();

            if (!response.ok) {
                throw new Error("Register failed");
            }

            navigate('/login');

        } catch (err) {
            console.log(err)
        };

    }
    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        className="registerForm"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        onChange={onChange}
                        value={values[RegisterFormKeys.email]}
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                        className='registerForm'
                        type="password"
                        name="password"
                        id="register-password"
                        onChange={onChange}
                        values={values[RegisterFormKeys.password]}
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        className='registerForm'
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        onChange={onChange}
                        values={values[RegisterFormKeys['confirm-password']]}
                    />
                    <br />
                    <br />
                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section >
    );
};