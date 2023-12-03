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

export function GenerarPDF5(data, data2, nombreArchivo) {
  const pdf = new jsPDF();
  console.log('entrando en generarpdf');
  pdf.text('Reporte general de administraciones', 10, 10);

  let currentY = 20; // Espacio inicial después del título
  // Función auxiliar para imprimir secciones de datos con encabezados
  const printSection = (sectionData, headers, startY) => {
    let sectionHeadersPrinted = false;
    Object.keys(sectionData).forEach(key => {
      let percentage = parseFloat(sectionData[key]).toFixed(1);

      if (!sectionHeadersPrinted) {
        pdf.autoTable({
          head: [headers],
          body: [[key, `${percentage}%`]],
          startY: startY,
          margin: { top: 10 },
          theme: 'grid' // Asegura que las líneas de la tabla sean visibles
        });
        sectionHeadersPrinted = true;
      } else {
        pdf.autoTable({
          body: [[key, `${percentage}%`]],
          startY: pdf.autoTable.previous.finalY + 2, // Espacio entre filas
          margin: { top: 10 },
          theme: 'grid'
        });
      }
    });
    return pdf.autoTable.previous.finalY; // Retorna la última posición Y después de la sección
  };
  // Imprimir la primera sección de datos
  currentY = printSection(data, ["Cerro", "Porcentaje"], currentY) + 5;
  // Imprimir la segunda sección de datos
  Object.keys(data2).forEach(sector => {
    pdf.text(`Reporte por Administración: ${sector}`, 10, currentY);
    currentY = printSection(data2[sector], ["Sectores", "Porcentaje"], currentY + 5) + 10;
  });
  // Guardar el PDF con el nombre de archivo proporcionado
  pdf.save(`${nombreArchivo}.pdf`);
};

export function GenerarPDF6  ( data,nombreArchivo) {
  const pdf = new jsPDF();
  let currentY = 20;
  pdf.text('Reporte De enfermedades de todos los sectores',10,10);

  const sectoresUnicos = [...new Set(data.map(item => item.sector))];
  console.log("Sectores Únicos:", sectoresUnicos);
  

  sectoresUnicos.forEach(sector => {
  // Agrega el nombre del sector
  pdf.text(`Sector: ${sector}`, 10, currentY);
  currentY += 10;

  const defectosSector = data.filter(defect => defect.sector === sector);
  const tableData = defectosSector.map(defect => [defect.diseases, defect.cantidad]);

  // Agrega la tabla de defectos y cantidades
  pdf.autoTable({
    head: [['Tipo de Enfermedad', 'Cantidad']],
    body: tableData,
    startY: currentY + 5,
    margin: { top: 10 },
  });

  // Ajusta la posición Y para el próximo sector
  currentY = pdf.autoTable.previous.finalY + 10;
});

pdf.save(`${nombreArchivo}.pdf`);
};


export function GenerarPDF7  ( data,nombreArchivo) {
  const pdf = new jsPDF();
  let currentY = 20;

  pdf.text('Reporte todos los tipos de daños Por sector',10,10);


  const sectoresUnicos = [...new Set(data.map(item => item.sector))];
  console.log("Sectores Únicos:", sectoresUnicos);
  

  sectoresUnicos.forEach(sector => {
  // Agrega el nombre del sector
  pdf.text(`Sector: ${sector}`, 10, currentY);
  currentY += 10;

  const defectosSector = data.filter(defect => defect.sector === sector);
  const tableData = defectosSector.map(defect => [defect.damage, defect.cantidad]);

  // Agrega la tabla de defectos y cantidades
  pdf.autoTable({
    head: [['Tipo de Daño', 'Cantidad']],
    body: tableData,
    startY: currentY + 5,
    margin: { top: 10 },
  });

  // Ajusta la posición Y para el próximo sector
  currentY = pdf.autoTable.previous.finalY + 10;
});

pdf.save(`${nombreArchivo}.pdf`);
};

export function GenerarPDF8  ( data,nombreArchivo) {
  const pdf = new jsPDF();
  let currentY = 20;

  pdf.text('Reporte todos los tipos de fauna Por sector',10,10);


  const sectoresUnicos = [...new Set(data.map(item => item.sector))];
  console.log("Sectores Únicos:", sectoresUnicos);
  

  sectoresUnicos.forEach(sector => {
  // Agrega el nombre del sector
  pdf.text(`Sector: ${sector}`, 10, currentY);
  currentY += 10;

  const defectosSector = data.filter(defect => defect.sector === sector);
  const tableData = defectosSector.map(defect => [defect.fauna, defect.cantidad]);

  // Agrega la tabla de defectos y cantidades
  pdf.autoTable({
    head: [['Tipo de Fauna', 'Cantidad']],
    body: tableData,
    startY: currentY + 5,
    margin: { top: 10 },
  });

  // Ajusta la posición Y para el próximo sector
  currentY = pdf.autoTable.previous.finalY + 10;
});

pdf.save(`${nombreArchivo}.pdf`);
};

export function GenerarPDF9  ( data,nombreArchivo) {
  const pdf = new jsPDF();
  let currentY = 20;

  pdf.text('Reporte todos los tipos de plagas Por sector',10,10);


  const sectoresUnicos = [...new Set(data.map(item => item.sector))];
  console.log("Sectores Únicos:", sectoresUnicos);
  

  sectoresUnicos.forEach(sector => {
  // Agrega el nombre del sector
  pdf.text(`Sector: ${sector}`, 10, currentY);
  currentY += 10;

  const defectosSector = data.filter(defect => defect.sector === sector);
  const tableData = defectosSector.map(defect => [defect.plague, defect.cantidad]);

  // Agrega la tabla de defectos y cantidades
  pdf.autoTable({
    head: [['Tipo de plaga', 'Cantidad']],
    body: tableData,
    startY: currentY + 5,
    margin: { top: 10 },
  });

  // Ajusta la posición Y para el próximo sector
  currentY = pdf.autoTable.previous.finalY + 10;
});

pdf.save(`${nombreArchivo}.pdf`);
};