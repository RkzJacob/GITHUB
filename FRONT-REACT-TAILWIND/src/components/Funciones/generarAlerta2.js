import Swal from 'sweetalert2';
import { generarInformeEnExcel } from './xls';

const generarExcelYMostrarAlerta2 = async (defects) => {
    try {
      const data1 = defects.map(defect => ({
        Sectores: defect.sector,
        TipoDeDefecto: defect.defect,
        Cantidad: defect.cantidad
      }));
      
      if (data1.length > 0) {
        generarInformeEnExcel(data1, 'Defectos por sector');
        await Swal.fire({
          icon: 'success',
          title: 'Archivo xls generado correctamente',
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

export default generarExcelYMostrarAlerta2;