import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

import {Container} from './styles'

import teste111 from "../login/assets/teste111.jpg"

export function Login() {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

   

    async function handleLogin(event: any) {
        event.preventDefault()
        
        try {
            const { data } = await api.post("/login", {
                login,
                password,
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('login', JSON.stringify(data.login));
            localStorage.setItem('id', JSON.stringify(data.id));
            const token = localStorage.getItem('token');
            api.defaults.headers.authorization = `Bearer ${token}`;
            console.log(token)
            console.log(data)
            navigate("/home");
        }
        catch (error: any) {
            alert(JSON.stringify((error.response.data.message)));
            console.log(JSON.stringify((error.response.data.message)));

        }

    }


    return (
       <Container>
        <div className='Geral'>
            <div className='DivImg'>
            </div>
                <form method="post">
                    <fieldset>
                        <legend>Entrar</legend>
                        <input
                            type="text"
                            placeholder='Digite seu usuário'
                            onChange={e => setLogin(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder='Digite sua senha'
                            onChange={e => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" onClick={handleLogin}>Acessar a plataforma</button>
                        <Link to="/register" className="Text">Não possui uma conta? Registrar-se</Link>
                    </fieldset>
                </form>
                
                </div>
        </Container>
    )

    
}
