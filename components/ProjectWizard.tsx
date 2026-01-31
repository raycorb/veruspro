
import React, { useState } from 'react';
import { Project, InterventionType, BuildingUse, ComplianceStatus } from '../types';
import { spanishProvinces } from '../data';
import { 
  X, Building2, Layers, Ruler, CheckCircle2, 
  Info, ArrowRight, Home, Layout, AlertCircle, Plus
} from 'lucide-react';
import { cn } from '../utils';

interface ProjectWizardProps {
  onCreate: (project: Project) => void;
  onCancel: () => void;
}

const ProjectWizard: React.FC<ProjectWizardProps> = ({ onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: 'Proyecto de ejemplo',
    location: 'Madrid',
    municipality: 'Galapagar',
    intervention: InterventionType.OBRA_NUEVA,
    uses: [BuildingUse.RESIDENCIAL_VIVIENDA],
    parcelArea: 257.38,
    floorsAbove: 2,
    floorsBelow: 1
  });

  const handleCreate = () => {
    if (!formData.name) return;

    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      location: formData.location,
      interventions: [formData.intervention],
      uses: formData.uses,
      parcelArea: formData.parcelArea,
      totalArea: formData.parcelArea * 1.5, // Estimado inicial
      height: formData.floorsAbove * 3, // Se recalculará en la vista de edificio
      floors: formData.floorsAbove + formData.floorsBelow,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      buildingInfo: {
        province: formData.location,
        municipality: formData.municipality,
        changeOfUse: formData.intervention === InterventionType.CAMBIO_USO,
        floorsAbove: Array.from({ length: formData.floorsAbove }).map((_, i) => ({
          id: `above-${i}`,
          name: i === 0 ? 'PB' : `P${i}`,
          height: 3,
          use: formData.uses[0],
          area: 120
        })),
        floorsBelow: Array.from({ length: formData.floorsBelow }).map((_, i) => ({
          id: `below-${i}`,
          name: `S-${i+1}`,
          height: 3,
          use: BuildingUse.APARCAMIENTO,
          area: 80
        }))
      },
      dbStatus: [
        { code: 'DB-SE', status: ComplianceStatus.PENDING, progress: 0 },
        { code: 'DB-SI', status: ComplianceStatus.IN_PROGRESS, progress: 0 },
        { code: 'DB-SUA', status: ComplianceStatus.PENDING, progress: 0 },
        { code: 'DB-HE', status: ComplianceStatus.PENDING, progress: 0 },
        { code: 'DB-HS', status: ComplianceStatus.PENDING, progress: 0 },
        { code: 'DB-HR', status: ComplianceStatus.PENDING, progress: 0 }
      ],
      technicalData: []
    };
    onCreate(newProject);
  };

  return (
    <div className="w-full max-w-5xl bg-[#161b22] border border-[#30363d] rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-slideUp">
      
      {/* Header */}
      <div className="p-8 border-b border-[#30363d] bg-[#0d1117] flex justify-between items-center shrink-0">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-yellow-500/20">
               <Plus size={24} />
            </div>
            <div>
               <h2 className="text-xl font-black text-[#f0f6fc] uppercase tracking-tight">Nuevo Expediente CTE</h2>
               <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-[0.2em]">Visor de Configuración Única</p>
            </div>
         </div>
         <button onClick={onCancel} className="p-3 hover:bg-[#21262d] rounded-full text-[#8b949e] transition-colors border border-transparent hover:border-[#30363d]">
            <X size={24} />
         </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Form */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#0d1117]/50">
          <div className="max-w-2xl mx-auto space-y-12 pb-12">
            
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#30363d] pb-2">
                <Info size={16} className="text-yellow-500" />
                <h3 className="text-xs font-black text-[#8b949e] uppercase tracking-widest">1. Identificación y Emplazamiento</h3>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#484f58] uppercase">Nombre del Proyecto</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl px-5 py-4 text-sm focus:border-yellow-500 outline-none transition-all shadow-inner"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#484f58] uppercase">Provincia</label>
                    <select 
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl px-5 py-4 text-sm focus:border-yellow-500 outline-none transition-all cursor-pointer"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    >
                      {spanishProvinces.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#484f58] uppercase">Municipio</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl px-5 py-4 text-sm focus:border-yellow-500 outline-none transition-all"
                      value={formData.municipality}
                      onChange={(e) => setFormData({...formData, municipality: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#30363d] pb-2">
                <Layers size={16} className="text-yellow-500" />
                <h3 className="text-xs font-black text-[#8b949e] uppercase tracking-widest">2. Clasificación</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#484f58] uppercase">Intervención</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.values(InterventionType).slice(0, 3).map(it => (
                      <button 
                        key={it}
                        onClick={() => setFormData({...formData, intervention: it})}
                        className={cn(
                          "px-4 py-3 text-left rounded-xl border text-[10px] font-bold uppercase transition-all",
                          formData.intervention === it ? "bg-yellow-500 border-yellow-500 text-black shadow-lg shadow-yellow-500/10" : "bg-[#0d1117] border-[#30363d] text-[#8b949e]"
                        )}
                      >
                        {it}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#484f58] uppercase">Uso Predominante</label>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.values(BuildingUse).slice(0, 4).map(u => (
                      <button 
                        key={u}
                        onClick={() => setFormData({...formData, uses: [u]})}
                        className={cn(
                          "px-3 py-3 text-center rounded-xl border text-[9px] font-bold uppercase transition-all leading-tight",
                          formData.uses.includes(u) ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" : "bg-[#0d1117] border-[#30363d] text-[#8b949e]"
                        )}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#30363d] pb-2">
                <Ruler size={16} className="text-yellow-500" />
                <h3 className="text-xs font-black text-[#8b949e] uppercase tracking-widest">3. Parámetros de Suelo</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#484f58] uppercase">Superficie de Parcela</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl px-5 py-4 text-sm focus:border-yellow-500 outline-none transition-all"
                      value={formData.parcelArea}
                      onChange={(e) => setFormData({...formData, parcelArea: Number(e.target.value)})}
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#484f58]">M²</span>
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/5 rounded-2xl border border-yellow-500/10 flex items-center gap-3">
                   <AlertCircle size={16} className="text-yellow-500 shrink-0" />
                   <p className="text-[10px] text-[#8b949e] leading-relaxed">
                     La altura de evacuación y plantas se gestionarán desde la <strong>Vista de Edificio</strong> una vez creado el expediente.
                   </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="w-full md:w-[380px] bg-[#161b22] border-l border-[#30363d] p-8 flex flex-col shrink-0">
           <div className="flex-1 space-y-8">
              <div className="bg-[#0d1117] rounded-3xl p-6 border border-[#30363d] relative overflow-hidden">
                 <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-6">Ficha del Expediente</h4>
                 <div className="space-y-4">
                    <SummaryRow label="Uso" value={formData.uses[0]} />
                    <SummaryRow label="Municipio" value={formData.municipality} />
                    <SummaryRow label="Parcela" value={`${formData.parcelArea} m²`} />
                    <SummaryRow label="Intervención" value={formData.intervention} />
                 </div>
              </div>
           </div>

           <button 
             onClick={handleCreate}
             disabled={!formData.name}
             className={cn(
               "w-full py-5 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-2xl mt-8",
               formData.name ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-[#21262d] text-[#484f58] cursor-not-allowed"
             )}
           >
             Crear Expediente <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-end border-b border-[#30363d] pb-2">
    <span className="text-[9px] font-black text-[#8b949e] uppercase">{label}</span>
    <span className="text-xs font-bold text-white truncate max-w-[150px]">{value}</span>
  </div>
);

export default ProjectWizard;
