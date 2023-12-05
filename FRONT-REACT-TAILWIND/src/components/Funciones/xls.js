import * as XLSX  from 'xlsx';

//generar reporte de xls

export function generarInformeEnExcel(data, nombreArchivo) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

    const style = {
      fill: {
        fgColor: { rgb: "00BFFF" } // Color de fondo rojo
      }
    };
    

    ws['A1'].s = style;
 
    ws['!cols'] = [{ wch: 20 }];
  
    XLSX.utils.book_append_sheet(wb, ws, 'Informe');
  
    XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
  }

export function generarInformeEnExcel2(data, nombreArchivo) {
    const wb = XLSX.utils.book_new();
    const sectoresUnicos = [...new Set(data.map(item => item.sector))];

    sectoresUnicos.forEach((sector, index) => {
      const defectosSector = data.filter(defect => defect.sector === sector);
      const ws = XLSX.utils.json_to_sheet(defectosSector);
      
      if (index === 0) {
        const style = {
          fill: {
            fgColor: { rgb: "00BFFF" } // Color de fondo azul
          }
        };
        ws['A1'].s = style;
      }

      ws['!cols'] = [{ wch: 20 }];

      XLSX.utils.book_append_sheet(wb, ws, `Sector ${index + 1}`);
    });

    XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
}