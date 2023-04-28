export  const aFacultities = [
  "Facultad de Bellas Artes",
  "Facultad de Ciencias Naturales",
  "Facultad de Ciencias Políticas y Sociales",
  "Facultad de Derecho", "Enfermería",
  "Facultad de Filosofía",
  "Facultad de Informática",
  "Facultad de Ingeniería",
  "Facultad de Lenguas y Letras",
  "Facultad de Medicina",
  "Facultad de Psicología",
  "Facultad de Contaduría",
  "Facultad de Química",
];

// ! CHANGE THIS LATER
export const aSports = [
  "Fútbol",
  "Baloncesto",
  "Voleibol",
  "Atletismo",
];

export const aCampus = 	["Centro Universitario","Juriquilla","Aeropuerto", "Ex-prepa Centro", "Prepa Norte", "Prepa Sur"];

export const expRegex = /^([0-9]{5,7})$/;

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const insuranceRegex = /^^([0-9]{2}-?[0-9]{2}-?[0-9]{2}-?[0-9]{4}-?[0-9]{1})$$/;

export const nameRegex = /^([A-ZÁÉÍÓÚ]['-]?[a-záéíóúü]+([ ]?[a-z]?['-]?[A-ZÁÉÍÓÚ]['-]?[a-záéíóúü]+)*)$/;

export const phoneRegex = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/g;
