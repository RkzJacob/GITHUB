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

    const sectoresUnicos = [...new Set(data.map(item => item.sector))];
    console.log("Sectores Únicos:", sectoresUnicos);
    

    sectoresUnicos.forEach(sector => {
    // Agrega el nombre del sector
    pdf.text(`Sector: ${sector}`, 10, currentY);
    currentY += 10;

    const defectosSector = data.filter(defect => defect.sector === sector);
    const tableData = defectosSector.map(defect => [defect.defect, defect.cantidad]);

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

export function GenerarPDF4  (data,data2,nombreArchivo) {
  const pdf = new jsPDF();

  pdf.text(`Reporte general`, 10, 10);

  let currentY = pdf.autoTable.previous ? pdf.autoTable.previous.finalY + 10 : 20;

  //mostrar data de perAdministrationPercentage
  Object.keys(data).forEach(subseccion => {
    const porcentaje = data[subseccion];

    pdf.autoTable({
      head: [["Cerro", "Porcentaje"]],
      body: [[subseccion, porcentaje]],
      startY: currentY,
      margin: { top: 15 },
    });

    // Actualizar la posición actual Y
    currentY = pdf.autoTable.previous.finalY + 10;
  });

  // Mostrar datos de perSectorPercentage
  Object.keys(data2).forEach(sector => {
    pdf.text(`Cerro: ${sector}`, 10, currentY);
    currentY += 10;

    Object.keys(data2[sector]).forEach(subseccion => {
      const porcentaje = data2[sector][subseccion];

      pdf.autoTable({
        head: [["Sectores", "Porcentaje"]],
        body: [[subseccion, porcentaje]],
        startY: currentY,
        margin: { top: 15 },
      });

      currentY = pdf.autoTable.previous.finalY + 10;
    });
  });



  pdf.save(`${nombreArchivo}.pdf`);
};