
export enum InterventionType {
  OBRA_NUEVA = 'Obra Nueva',
  REFORMA = 'Reforma',
  AMPLIACION = 'Ampliación',
  CAMBIO_USO = 'Cambio de Uso',
  REHABILITACION_INTEGRAL = 'Rehabilitación Integral'
}

export enum BuildingUse {
  RESIDENCIAL_VIVIENDA = 'Residencial Vivienda',
  ADMINISTRATIVO = 'Administrativo',
  COMERCIAL = 'Comercial',
  DOCENTE = 'Docente',
  HOSPITALARIO = 'Hospitalario',
  PUI = 'Pública Concurrencia',
  APARCAMIENTO = 'Aparcamiento',
  MIXTO = 'Mixto'
}

export enum AppModule {
  DASHBOARD = 'dashboard',
  PROJECTS = 'projects',
  LIBRARY = 'library',
  CHAT = 'chat',
  CALCULATORS = 'calculators'
}

export interface FloorInfo {
  id: string;
  name: string;
  height: number;
  use: string;
  area: number;
}

export enum ComplianceStatus {
  PENDING = 'Pendiente',
  IN_PROGRESS = 'En proceso',
  DONE = 'Cumple',
  NOT_APPLICABLE = 'No aplica'
}

export interface DBSectionStatus {
  code: string;
  status: ComplianceStatus;
  progress: number;
}

export interface DBSection {
  code: string;
  title: string;
  applies: boolean;
  description: string;
  reason: string;
}

export interface TechnicalCalculation {
  id: string;
  type: 'occupancy' | 'stairs' | 'thermal' | 'acoustic';
  name: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  updatedAt: number;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  interventions: InterventionType[];
  uses: BuildingUse[];
  parcelArea: number; // Nueva superficie de parcela
  totalArea: number;
  // Added height and floors to the project interface to match creation literal and update logic
  height: number;
  floors: number;
  createdAt: number;
  updatedAt: number;
  buildingInfo: {
    province: string;
    municipality: string;
    changeOfUse: boolean;
    floorsAbove: FloorInfo[];
    floorsBelow: FloorInfo[];
  };
  dbStatus: DBSectionStatus[];
  technicalData: TechnicalCalculation[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}
