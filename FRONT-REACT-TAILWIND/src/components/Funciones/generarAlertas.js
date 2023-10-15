import Swal from 'sweetalert2';
import { generarInformeEnExcel } from './xls';


const generarExcelYMostrarAlerta = async (defects) => {
  try {
    const data1 = defects.map(defect => ({
      TipoDeDefecto: defect.defect,
      Cantidad: defect.cantidad
    }));
    
    if (data1.length > 0) {
      generarInformeEnExcel(data1, 'Todos Los Tipos Defecto');
      await Swal.fire({
        icon: 'success',
        title: 'Archivo sxls generado correctamente',
      });
    } else {
      await Swal.fire({
        icon: 'info',
        title: 'No hay datos disponibles en este sector',
      });
    }
  } catch (error) {
    console.error('Error generando el informe en Excel:', error);
    await Swal.fire({
      icon: 'error',
      title: 'Ocurrió un error al generar el informe en Excel',
    });
  }
};



export default generarExcelYMostrarAlerta ;
