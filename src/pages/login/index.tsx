import React, { useState, useEffect  } from 'react';
import { Outlet, Form } from "react-router-dom";

export function Login() {

    return (
        <div>
            <h1>Login</h1>
    
                <Form method="post" action={`/home`}>


                    <input type="text" name="username" placeholder='Digite seu Usuario'/>
                    <input type="password" name="password" placeholder='Digite sua senha' />

    
                  <button type="submit">Login</button>
                </Form>

            <a href={`/home`}>aaa</a>
        </div>
    )

}
