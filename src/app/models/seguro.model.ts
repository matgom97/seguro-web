// src/app/models/seguro.model.ts
export interface Seguro {
    numeroIdentificacion: number;
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido: string;
    telefonoContacto: string;
    correoElectronico: string;
    fechaNacimiento: string; // Puedes usar string para las fechas si los datos vienen como cadenas
    valorEstimadoSeguro: number;
    observaciones?: string;
  }
  