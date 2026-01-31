
export const dbStructure = [
  { id: 'PARTE_I', label: 'Parte I' },
  { 
    id: 'SE', label: 'SE', 
    subs: ['SE-AE', 'SE-C', 'SE-A', 'SE-F', 'SE-M'] 
  },
  { 
    id: 'SI', label: 'SI', 
    subs: ['SI-1', 'SI-2', 'SI-3', 'SI-4', 'SI-5', 'SI-6'] 
  },
  { 
    id: 'SUA', label: 'SUA', 
    subs: ['SUA-1', 'SUA-2', 'SUA-3', 'SUA-4', 'SUA-5', 'SUA-6', 'SUA-7', 'SUA-8', 'SUA-9'] 
  },
  { 
    id: 'HS', label: 'HS', 
    subs: ['HS-1', 'HS-2', 'HS-3', 'HS-4', 'HS-5'] 
  },
  { id: 'HR', label: 'HR' },
  { 
    id: 'HE', label: 'HE', 
    subs: ['HE-0', 'HE-1', 'HE-2', 'HE-3', 'HE-4', 'HE-5'] 
  },
];

export const spanishProvinces = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'
];

export const exampleQuestions = [
  "¿Cuál es la resistencia al fuego requerida en un edificio residencial?",
  "Explícame los requisitos de aislamiento térmico según DB-HE",
  "¿Qué dice el CTE sobre accesibilidad en edificios públicos?"
];
