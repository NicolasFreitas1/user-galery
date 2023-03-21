import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from './styles'

import teste111 from "../login/assets/teste111.jpg"

export function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

   

    async function handleLogin(event: any) {
        event.preventDefault()
        
        try {
            const { data } = await api.post("/register", {
                name,
                login,
                password,
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('login', JSON.stringify(data.login));
            localStorage.setItem('id', JSON.stringify(data.id));
            console.log(data)
            const token = localStorage.getItem('token');
            console.log(token)
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
                        <legend>Registrar-se</legend>
                        <input
                            type="text"
                            placeholder='Digite seu nome'
                            onChange={e => setName(e.target.value)} 
                            required
                            
                        />
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
                        <Link to="/" className="Text">Já possui uma conta? Faça login</Link>
                    </fieldset>
                </form>
                
                </div>
        </Container>
    )

    
}
