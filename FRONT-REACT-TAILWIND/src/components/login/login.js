import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from 'components/Funciones/authContext';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { usePermiso } from 'components/Funciones/Permisos';


const LoginForm = () => {
  const history = useHistory();
  const { login } = useAuth();

  const {Rol} = usePermiso();


  //constantes para el formulario
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  //cambios cuando cambia algo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      login(response.data.token);
      Rol(response.data.role);

      await Swal.fire({
        icon: 'success',
        title: 'Usuario autenticado',
      });

      history.push('/admin'); 
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'No se ha podido autenticar',
      });
    }
  };

  return (
    <div className='float-center'>
    <form className="form " onSubmit={handleSubmit}>
      <p className="form-title">Autenticación</p>
      <div className="input-container">
        <input type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange} 
          placeholder="ingresa un usuario" />
        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      </div>
      <div className="input-container">
        <input type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Ingresa contraseña"  />
        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
            <path
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      </div>
      <button className="submit" type="submit">
        Iniciar sesión
      </button>
      
    </form>
    </div>
      
  );
};

export default LoginForm;