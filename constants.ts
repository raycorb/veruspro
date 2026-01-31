
export const CTE_DB_LIST = [
  { code: 'DB-SE', title: 'Seguridad Estructural', color: 'blue' },
  { code: 'DB-SI', title: 'Seguridad en caso de Incendio', color: 'red' },
  { code: 'DB-SUA', title: 'Seguridad de Utilización y Accesibilidad', color: 'orange' },
  { code: 'DB-HE', title: 'Ahorro de Energía', color: 'green' },
  { code: 'DB-HS', title: 'Salubridad', color: 'cyan' },
  { code: 'DB-HR', title: 'Protección frente al Ruido', color: 'purple' }
];

export const OCCUPANCY_TABLE: Record<string, number> = {
  'Residencial Vivienda': 20,
  'Administrativo': 10,
  'Comercial': 2,
  'Docente': 1.5,
  'Hospitalario': 15,
  'Pública Concurrencia': 1,
  'Aparcamiento': 40
};
