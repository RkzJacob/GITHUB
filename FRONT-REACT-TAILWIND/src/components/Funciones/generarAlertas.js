import Swal from 'sweetalert2';
import { generarInformeEnExcel, generarInformeEnExcel2 } from './xls';
import { GenerarPDF,GenerarPDF2,GenerarPDF3, GenerarPDF5, GenerarPDF6, GenerarPDF7, GenerarPDF8, GenerarPDF9 } from "./generarPdf";

//generar alerta por todos los tipos de defecto
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

//generar alerta por defectos por sector
const generarExcelYMostrarAlerta2 = async (defects) => {
  try {
    const data1 = defects.map(defect => ({
      Sectores: defect.sector,
      TipoDeDefecto: defect.defect,
      Cantidad: defect.cantidad
    }));
    
    if (data1.length > 0) {
      generarInformeEnExcel2(data1, 'Defectos por sector');
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

//generar alerta por defectos de un sector 
const generarExcelYMostrarAlerta3 = async (defects) => {
  try {
    const data1 = defects.map(defect => ({
        Sector: defect.sector,
        Defecto: defect.defect,
        Cantidad: defect.cantidad
      }));
    
    if (data1.length > 0) {
      generarInformeEnExcel(data1, 'Defectos Del sector');
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


//genera alertas de los pdf por todos los tipos de defecto existentes
const generarPDFAlert1 = async (defects) => {
    try {
      if (defects.length > 0) {
        GenerarPDF(defects, 'Todos Los Tipos Defecto');
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




  const generarPDFAlert2 = async (defects) => {
      try {
        if (defects.length > 0) {
          GenerarPDF2(defects, 'Defectos por sector');
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
        await Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al generar el informe PDF',
        });
      }
    };


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
        await Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al generar el informe PDF',
        });
      }
      
    };

    const generarPDFAlert4 = async (defects) => {
      try {
        
        const perAdministrationPercentage  = defects.perAdministrationPercentage;
        const perSectorPercentage = defects.perSectorPercentage;

        if (perAdministrationPercentage && Object.keys(perAdministrationPercentage).length > 0) {
          console.log('usando funcion')
          GenerarPDF5(perAdministrationPercentage , perSectorPercentage,`Reporte General`);
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
        await Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al generar el informe PDF',
        });
      }
      
    };

    const generarPDFAlert5 = async (defects) => {
      try {
        if (defects.length > 0) {
          GenerarPDF2(defects, 'Defectos de sectores CERRO TUNEL');
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
        await Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al generar el informe PDF',
        });
      }
    };

    const generarPDFAlert6 = async (defects) => {
      try {
        if (defects.length > 0) {
          GenerarPDF2(defects, 'Defectos de sectores CERRO CASA');
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
        await Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al generar el informe PDF',
        });
      }
    };

    const generarPDFAlert7 = async (defects) => {
      try {
        if (defects.length > 0) {
          GenerarPDF2(defects, 'Defectos de sectores CERRO ESPERANZA');
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
        await Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al generar el informe PDF',
        });
      }
    };


    const generarPDFAlert8 = async (defects,nombrePdf) => {
      try {
        if (defects.length > 0) {
          GenerarPDF6(defects, ` ${nombrePdf}`);
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
        await Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al generar el informe PDF',
        });
      }
    };

    const generarPDFAlert9 = async (defects,nombrePdf) => {
      try {
        if (defects.length > 0) {
          GenerarPDF7(defects, ` ${nombrePdf}`);
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
        await Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al generar el informe PDF',
        });
      }
    };

    const generarPDFAlert10 = async (defects,nombrePdf) => {
      try {
        if (defects.length > 0) {
          GenerarPDF8(defects, ` ${nombrePdf}`);
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
        await Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al generar el informe PDF',
        });
      }
    };

    const generarPDFAlert11 = async (defects,nombrePdf) => {
      try {
        if (defects.length > 0) {
          GenerarPDF9(defects, ` ${nombrePdf}`);
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
        await Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al generar el informe PDF',
        });
      }
    };





export const Alertas = {
  generarExcelYMostrarAlerta,
  generarExcelYMostrarAlerta2,
  generarExcelYMostrarAlerta3,
  generarPDFAlert1,
  generarPDFAlert2,
  generarPDFAlert3,
  generarPDFAlert4,
  generarPDFAlert5,
  generarPDFAlert6,
  generarPDFAlert7,
  generarPDFAlert8,
  generarPDFAlert9,
  generarPDFAlert10,
  generarPDFAlert11,

};


