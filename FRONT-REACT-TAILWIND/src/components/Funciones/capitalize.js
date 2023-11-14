// Función para capitalizar las etiquetas en un array
export function capitalizeLabels(labelsArray) {
    return labelsArray.map(label => {
      return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
    });
  }


export function capitalizeText (text) {
    if (!text) return ''; // Manejar el caso en el que no se pase ningún texto
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  