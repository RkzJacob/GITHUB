import * as XLSX  from 'xlsx';


export function generarInformeEnExcel(data, nombreArchivo) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
  
    XLSX.utils.book_append_sheet(wb, ws, 'Informe');
  
    XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
  }