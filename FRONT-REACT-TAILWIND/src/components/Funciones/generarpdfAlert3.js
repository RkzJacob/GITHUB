import Swal from 'sweetalert2';
import { GenerarPDF3 } from "./generarPdf";

const generarPDFAlert3 = async (defects,sector) => {
    try {
      if (defects.length > 0) {
        GenerarPDF3(defects,`Defecto por sector ${sector}`,`${sector}`);
        await Swal.fire({
          icon: 'success',
          title: 'Archivo PDF generado correctamente',
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
        title: 'Ocurrió un error al generar el informe PDF',
      });
    }
  };
  
export default generarPDFAlert3;