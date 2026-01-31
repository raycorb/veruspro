
import React, { useState } from 'react';
import { Project, TechnicalCalculation, BuildingUse } from '../types';
import { OCCUPANCY_TABLE } from '../constants';
import TechnicalCalculator from './TechnicalCalculator';
import { LayoutGrid, Users, ArrowLeft, Info } from 'lucide-react';

interface CalculatorsModuleProps {
  activeProject: Project | null;
  onUpdateProject: (project: Project) => void;
}

const CalculatorsModule: React.FC<CalculatorsModuleProps> = ({ activeProject, onUpdateProject }) => {
  const [selectedCalc, setSelectedCalc] = useState<'occupancy' | null>(null);

  if (!activeProject) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#010409]/30">
        <div className="w-20 h-20 bg-yellow-500/5 rounded-3xl flex items-center justify-center text-yellow-500/20 mb-6 border border-yellow-500/10">
          <Info size={40} />
        </div>
        <h3 className="text-xl font-bold text-[#f0f6fc]">Selecciona un Proyecto</h3>
        <p className="text-sm text-[#8b949e] mt-2 max-w-sm">
          Debes seleccionar un expediente activo en la barra lateral para poder realizar cálculos técnicos vinculados.
        </p>
      </div>
    );
  }

  // Lógica específica para Ocupación
  const occupancyFields = [
    { 
      id: 'use', 
      label: 'Uso Específico (DB-SI 3)', 
      type: 'select' as const, 
      options: Object.keys(OCCUPANCY_TABLE),
      help: 'Selecciona el uso predominante de la zona según la Tabla 2.1 del DB-SI 3.'
    },
    { 
      id: 'area', 
      label: 'Superficie Útil de la Zona', 
      type: 'number' as const, 
      unit: 'm²',
      help: 'Superficie computable para el cálculo de ocupantes.'
    }
  ];

  const handleCalculateOccupancy = (inputs: Record<string, any>) => {
    const use = inputs.use as string;
    const area = inputs.area as number;
    
    if (!use || !area) return {};

    const ratio = OCCUPANCY_TABLE[use];
    const occupants = Math.ceil(area / ratio); // CTE exige redondear al alza

    return {
      'Ratio Aplicado': `${ratio} m²/pers`,
      'Ocupantes Calculados': occupants,
      'Densidad Real': `${(occupants / area).toFixed(2)} pers/m²`
    };
  };

  const handleSaveCalculation = (calcData: Partial<TechnicalCalculation>) => {
    const newCalc: TechnicalCalculation = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedCalc!,
      name: selectedCalc === 'occupancy' ? 'Cálculo de Ocupación' : 'Cálculo Técnico',
      inputs: calcData.inputs || {},
      results: calcData.results || {},
      updatedAt: Date.now()
    };

    onUpdateProject({
      ...activeProject,
      technicalData: [...activeProject.technicalData, newCalc],
      updatedAt: Date.now()
    });

    // Notificación visual de guardado (opcional en UI)
    setSelectedCalc(null);
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 animate-fadeIn">
      {selectedCalc ? (
        <div className="max-w-4xl mx-auto space-y-6">
          <button 
            onClick={() => setSelectedCalc(null)}
            className="flex items-center gap-2 text-xs font-bold text-[#8b949e] hover:text-yellow-500 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Volver al catálogo
          </button>
          
          <TechnicalCalculator 
            title={selectedCalc === 'occupancy' ? "Cálculo de Ocupación (SI-3)" : "Calculadora Técnica"}
            fields={selectedCalc === 'occupancy' ? occupancyFields : []}
            onCalculate={handleCalculateOccupancy}
            onSave={handleSaveCalculation}
            initialData={activeProject.technicalData.find(c => c.type === selectedCalc)}
          />

          <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-start gap-3">
             <Info size={16} className="text-blue-500 mt-0.5" />
             <p className="text-[11px] text-[#8b949e] leading-relaxed">
               Los resultados de este cálculo se guardarán en el historial del expediente <strong>{activeProject.name}</strong> y serán utilizados por el Asistente IA para validar la coherencia de la memoria técnica.
             </p>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h2 className="text-2xl font-bold text-[#f0f6fc]">Módulos de Precisión Técnica</h2>
            <p className="text-[#8b949e] text-sm mt-1">Calculadoras normativas verificadas según el Código Técnico de la Edificación.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button 
              onClick={() => setSelectedCalc('occupancy')}
              className="bg-[#161b22] border border-[#30363d] p-6 rounded-3xl text-left hover:border-yellow-500/50 transition-all group relative overflow-hidden"
            >
              <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Ocupación DB-SI 3</h3>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">
                Determina la ocupación máxima por zona según la Tabla 2.1. Incluye redondeos normativos.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-[#30363d] pt-4">
                <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Abrir Módulo</span>
                <LayoutGrid size={14} className="text-[#484f58] group-hover:text-yellow-500" />
              </div>
            </button>

            {/* Placeholder Calculators */}
            {['Transmitancia HE', 'Evacuación SI', 'Acústica HR'].map(calc => (
              <div 
                key={calc}
                className="bg-[#161b22] border border-[#30363d] p-6 rounded-3xl opacity-40 cursor-not-allowed grayscale"
              >
                <div className="w-12 h-12 bg-[#21262d] rounded-2xl flex items-center justify-center text-[#484f58] mb-6">
                  <LayoutGrid size={24} />
                </div>
                <h3 className="text-sm font-black text-[#8b949e] uppercase tracking-widest mb-2">{calc}</h3>
                <p className="text-[11px] text-[#484f58]">Módulo en fase de verificación técnica. Próximamente disponible.</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorsModule;
