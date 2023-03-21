import React, { useState, useEffect  } from 'react';

import { Form, useNavigate } from "react-router-dom";

import {Card, CardProps} from '../../components/Card'

import api from '../../services/api';

export function Home() {

  const navigate = useNavigate();

  



  useEffect(() => {
    async function getImage() {
      
      try {
          const { data } = await api.get("/get_images");
          const token = localStorage.getItem("token")
          api.defaults.headers.authorization = `Bearer ${token}`;
          console.log(token)
          console.log(data)
      }
      catch (error: any) {
          alert(JSON.stringify((error.response.data.message)));
          console.log(JSON.stringify((error.response.data.message)));

      }

  }
    
     getImage();
    }, []);

  return (
    <div className='container'>
    
    </div>
  )
}
