// Define una función externa que realiza la llamada a la API
//obtiene por parametro url los datos y los guarda en setdata

import axios from 'axios';
import Swal from 'sweetalert2';

export function ObtenerDataApi  (url, setData,token) {
    const headers = {
        Authorization: `Bearer ${token}`,
      };

    axios.get(url,{headers})
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
    
  };

export function ObtenerDataApiParametros (url, setData, token, Fecha1, Fecha2) {
    return new Promise((resolve, reject) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formattedFecha1 = new Date(Fecha1).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).split('/').join('-');
    
    const formattedFecha2 = new Date(Fecha2).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).split('/').join('-');
    
    const formattedUrl = `${url}${formattedFecha1}/${formattedFecha2}`;
    console.log(formattedUrl);

    Swal.fire({
      icon: 'info',
      title: 'Obteniendo datos...',
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });

    axios.get(formattedUrl, { headers })
      .then(response => {
        setData(response.data);
        console.log('listo');
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
        console.error('Error al obtener datos:', error);
      })
      .finally(() => {
        Swal.close();
      });
    });
  };



