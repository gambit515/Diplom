import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "../../styles/AuthForm/AuthForm.css"

const AuthForm = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Отправка запроса на авторизацию и получение токена
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.auth_token);
                navigate("/main")
            } else {
                console.error('Ошибка авторизации');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };

    return (
        <div className="container">
            <div className={"OutputFrame"}>
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Авторизация</h2>
                    <div className={"filling"}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button type="submit">Войти</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AuthForm;
