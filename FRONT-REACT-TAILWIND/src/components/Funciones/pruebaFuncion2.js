// Define una función externa que realiza la llamada a la API
//obtiene por parametro url los datos y los guarda en setdata

import axios from 'axios';

const ObtenerDataApi = (url, setData,token) => {
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

export default ObtenerDataApi;