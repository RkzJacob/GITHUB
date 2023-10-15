import jsPDF from 'jspdf';
import "jspdf-autotable";


export function GenerarPDF  (data,nombreArchivo) {
    const pdf = new jsPDF();
    pdf.text('Reporte de todos los Defectos', 10, 10);
    pdf.autoTable({
      head: [[ "Tipo de Defecto", "Cantidad"]],
      body: data.map(defect => [defect.defect, defect.cantidad]),
      startY: 20,
      margin: { top: 15 },
    });
  
    pdf.save(`${nombreArchivo}.pdf`);
};

export function GenerarPDF2  ( data,nombreArchivo) {
    const pdf = new jsPDF();
    let currentY = 10;

    data.forEach(item => {
    // Agrega el nombre del sector
    pdf.text(`Sector: ${item.sector}`, 10, currentY);
    currentY += 10;

    const tableData = data
      .filter(defect => defect.sector === item.sector)
      .map(defect => [defect.defect, defect.cantidad]);

    // Agrega la tabla de defectos y cantidades
    pdf.autoTable({
      head: [['Tipo de Defecto', 'Cantidad']],
      body: tableData,
      startY: currentY + 5,
      margin: { top: 10 },
    });

    // Ajusta la posición Y para el próximo sector
    currentY = pdf.autoTable.previous.finalY + 10;
  });

  pdf.save(`${nombreArchivo}.pdf`);
};

export function GenerarPDF3  (data,nombreArchivo,sector) {
    const pdf = new jsPDF();
    pdf.text(`Reporte de defectos del sector: ${sector}`, 10, 10);
    pdf.autoTable({
      head: [[ "Tipo de Defecto", "Cantidad"]],
      body: data.map(defect => [defect.defect, defect.cantidad]),
      startY: 20,
      margin: { top: 15 },
    });
  
    pdf.save(`${nombreArchivo}.pdf`);
};