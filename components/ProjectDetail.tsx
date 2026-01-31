
import React, { useState } from 'react';
import { Project, ComplianceStatus, FloorInfo } from '../types';
import { CTE_DB_LIST } from '../constants';
import { cn } from '../utils';
import { 
  Save, Download, Trash2, Edit3, MapPin, 
  ArrowLeft, CheckCircle2, Clock, HelpCircle,
  Building, ChevronDown, Zap, Sparkles, Maximize2, Minimize2,
  Settings2, Layers, Eye, EyeOff, Calculator, Book, Activity
} from 'lucide-react';
import BuildingVisualization from '../BuildingVisualization';
import AIChatJustifier from './AIChatJustifier';

interface ProjectDetailProps {
  project: Project;
  onUpdate: (p: Project) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onUpdate }) => {
  const [activeDB, setActiveDB] = useState<string | null>(null);
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [activePanel, setActivePanel] = useState<'building' | 'stats' | 'docs' | null>('building');

  const evacuationHeight = project.buildingInfo.floorsAbove.reduce((acc, f) => acc + f.height, 0);

  const handleUpdateFloor = (id: string, updates: Partial<FloorInfo>) => {
    const isAbove = project.buildingInfo.floorsAbove.some(f => f.id === id);
    const newBuildingInfo = { ...project.buildingInfo };
    if (isAbove) {
      newBuildingInfo.floorsAbove = newBuildingInfo.floorsAbove.map(f => f.id === id ? { ...f, ...updates } : f);
    } else {
      newBuildingInfo.floorsBelow = newBuildingInfo.floorsBelow.map(f => f.id === id ? { ...f, ...updates } : f);
    }
    onUpdate({ 
      ...project, 
      buildingInfo: newBuildingInfo, 
      height: newBuildingInfo.floorsAbove.reduce((acc, f) => acc + f.height, 0),
      updatedAt: Date.now() 
    });
  };

  const handleAddFloor = (above: boolean) => {
    const newBuildingInfo = { ...project.buildingInfo };
    const id = Math.random().toString(36).substr(2, 5);
    if (above) {
      newBuildingInfo.floorsAbove.push({
        id, name: `P${newBuildingInfo.floorsAbove.length}`, height: 3, use: project.uses[0], area: 120
      });
    } else {
      newBuildingInfo.floorsBelow.push({
        id, name: `S-${newBuildingInfo.floorsBelow.length + 1}`, height: 3, use: 'Aparcamiento', area: 80
      });
    }
    onUpdate({ ...project, buildingInfo: newBuildingInfo, updatedAt: Date.now() });
  };

  const handleRemoveFloor = (id: string) => {
    const newBuildingInfo = { ...project.buildingInfo };
    newBuildingInfo.floorsAbove = newBuildingInfo.floorsAbove.filter(f => f.id !== id);
    newBuildingInfo.floorsBelow = newBuildingInfo.floorsBelow.filter(f => f.id !== id);
    onUpdate({ ...project, buildingInfo: newBuildingInfo, updatedAt: Date.now() });
  };

  const togglePanel = (panel: 'building' | 'stats' | 'docs') => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden animate-fadeIn relative">
      
      {!zenMode && (
        <header className="p-6 bg-[#0d1117] border-b border-[#30363d] z-10 shrink-0 relative">
          <div className="flex justify-between items-start mb-6 px-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/5 rounded-2xl border border-yellow-500/20 text-yellow-500 flex items-center justify-center shadow-lg">
                 <Building size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-[#f0f6fc] tracking-tighter uppercase">{project.name}</h1>
                  <button onClick={() => setIsEditingHeader(!isEditingHeader)} className="p-1.5 hover:bg-[#21262d] rounded-lg text-[#484f58] hover:text-white transition-colors">
                     <Settings2 size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-yellow-500 uppercase tracking-widest opacity-80">
                    <MapPin size={12} /> {project.buildingInfo.municipality}, {project.buildingInfo.province}
                  </span>
                  <span className="text-[#30363d]">|</span>
                  <span className="text-[10px] text-[#484f58] font-black uppercase tracking-widest">Parcela: {project.parcelArea.toFixed(2).replace('.', ',')} m²</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <button className="px-5 py-2.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-xl text-[10px] font-black text-[#c9d1d9] uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-lg">
                <Download size={16} className="text-blue-500" /> Memoria Técnica
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-4 relative">
            <div className="lg:col-span-8 space-y-4">
               <div className="flex items-center justify-between px-1">
                  <h3 className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.2em]">Configuración Normativa</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {CTE_DB_LIST.map(db => {
                   const statusObj = project.dbStatus.find(s => s.code === db.code);
                   const status = statusObj?.status || ComplianceStatus.PENDING;
                   const isActive = activeDB === db.code;
                   return (
                     <button key={db.code} onClick={() => setActiveDB(isActive ? null : db.code)} className={cn("p-5 rounded-2xl border text-left transition-all group relative overflow-hidden", isActive ? "bg-yellow-500/[0.03] border-yellow-500/50 ring-1 ring-yellow-500/20 shadow-xl" : "bg-[#161b22] border-[#30363d] hover:border-[#484f58] shadow-sm")}>
                       <div className="flex justify-between items-center mb-2">
                          <span className={cn("text-xs font-black uppercase tracking-widest", isActive ? "text-yellow-500" : "text-blue-500/60")}>{db.code}</span>
                          <div className={cn("w-2 h-2 rounded-full", status === ComplianceStatus.DONE ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : status === ComplianceStatus.IN_PROGRESS ? "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)] animate-pulse" : "bg-[#30363d]")} />
                       </div>
                       <h4 className="text-[11px] font-bold text-[#f0f6fc] leading-tight uppercase tracking-tighter truncate">{db.title}</h4>
                     </button>
                   );
                 })}
               </div>
            </div>

            {/* Centro de Control HUD (Derecha) */}
            <div className="lg:col-span-4 relative h-full">
              {/* Toolbar Minimalista */}
              <div className="flex justify-end gap-2 mb-4">
                <ToolButton icon={<Building size={16}/>} active={activePanel === 'building'} onClick={() => togglePanel('building')} label="Sección" />
                <ToolButton icon={<Activity size={16}/>} active={activePanel === 'stats'} onClick={() => togglePanel('stats')} label="Métricas" />
                <ToolButton icon={<Book size={16}/>} active={activePanel === 'docs'} onClick={() => togglePanel('docs')} label="Normas" />
              </div>

              {/* Paneles Flotantes "In Situ" */}
              <div className="relative">
                {activePanel === 'building' && (
                  <div className="absolute top-0 right-0 w-full bg-[#161b22]/95 backdrop-blur-xl border border-yellow-500/30 rounded-[28px] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-30 animate-fadeIn animate-slideDown">
                    <div className="flex items-center gap-2 mb-6 border-b border-[#30363d] pb-3">
                       <Layers size={14} className="text-yellow-500" />
                       <h4 className="text-[10px] font-black text-[#8b949e] uppercase tracking-widest">Esquema de Sección</h4>
                    </div>
                    <BuildingVisualization floorsAbove={project.buildingInfo.floorsAbove} floorsBelow={project.buildingInfo.floorsBelow} onUpdateFloor={handleUpdateFloor} onAddFloor={handleAddFloor} onRemoveFloor={handleRemoveFloor} evacuationHeight={evacuationHeight} />
                  </div>
                )}

                {activePanel === 'stats' && (
                  <div className="absolute top-0 right-0 w-full bg-[#161b22]/95 backdrop-blur-xl border border-blue-500/30 rounded-[28px] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-30 animate-fadeIn animate-slideDown">
                    <div className="flex items-center gap-2 mb-6 border-b border-[#30363d] pb-3">
                       <Activity size={14} className="text-blue-500" />
                       <h4 className="text-[10px] font-black text-[#8b949e] uppercase tracking-widest">Métricas del Proyecto</h4>
                    </div>
                    <div className="space-y-4">
                      <StatMini label="Superficie Total" value={`${(project.parcelArea * 1.5).toFixed(2).replace('.',',')} m²`} />
                      <StatMini label="Plantas" value={project.buildingInfo.floorsAbove.length + project.buildingInfo.floorsBelow.length} />
                      <StatMini label="Altura Evac." value={`${evacuationHeight.toFixed(2).replace('.',',')} m`} />
                    </div>
                  </div>
                )}
              </div>
              <div className="h-10 w-full invisible" /> {/* Espaciador para el grid */}
            </div>
          </div>
        </header>
      )}

      <div className={cn("flex-1 overflow-hidden relative transition-all duration-500", zenMode ? "bg-[#0d1117]" : "")}>
         {activeDB ? (
           <div className="h-full flex flex-col md:flex-row divide-x divide-[#30363d] animate-slideUp">
              {!zenMode && (
                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 bg-[#0d1117]">
                   <div className="max-w-2xl mx-auto space-y-10">
                      <section className="animate-fadeIn">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 border border-yellow-500/20 shadow-xl">
                              <Sparkles size={24} />
                           </div>
                           <div>
                              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">{activeDB}</h2>
                              <p className="text-[10px] text-[#484f58] font-black uppercase tracking-widest">{CTE_DB_LIST.find(d => d.code === activeDB)?.title}</p>
                           </div>
                        </div>
                        <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-[24px] relative overflow-hidden group">
                           <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-3">Contexto de Redacción</h4>
                           <p className="text-[15px] text-[#c9d1d9] leading-relaxed relative z-10 font-serif italic">
                              Justifica los requisitos técnicos de <strong>{activeDB}</strong> para un proyecto de <strong>{project.interventions[0]}</strong> con una altura de evacuación de <strong>{evacuationHeight.toFixed(2).replace('.', ',')}m</strong>.
                           </p>
                        </div>
                      </section>
                   </div>
                </div>
              )}
              <div className={cn("bg-[#0d1117] flex flex-col shadow-2xl z-20 transition-all duration-500 border-l border-[#30363d]", zenMode ? "w-full" : "w-full md:w-[480px]")}>
                 <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d] bg-[#161b22]/30 shrink-0">
                    <div className="flex items-center gap-3">
                       <button onClick={() => setZenMode(!zenMode)} className="p-2 hover:bg-[#21262d] rounded-xl text-[#484f58] transition-colors">
                         {zenMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                       </button>
                       <span className="text-[10px] font-black text-[#8b949e] uppercase tracking-widest">Asistente Técnico IA</span>
                    </div>
                 </div>
                 <AIChatJustifier project={project} section={{ code: activeDB, title: CTE_DB_LIST.find(d => d.code === activeDB)?.title || '', applies: true, description: '', reason: '' }} />
              </div>
           </div>
         ) : (
           <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#010409]/20">
              <div className="w-16 h-16 bg-yellow-500/5 rounded-[32px] border border-yellow-500/10 flex items-center justify-center text-yellow-500/20 mb-6 shadow-2xl">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#f0f6fc] uppercase tracking-tighter">Panel de Redacción Normativa</h3>
              <p className="text-xs text-[#484f58] font-bold uppercase mt-3 tracking-[0.2em]">Selecciona un Documento Básico para justificar</p>
           </div>
         )}
      </div>
    </div>
  );
};

const ToolButton = ({ icon, active, onClick, label }: { icon: any, active: boolean, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all relative group",
      active 
        ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]" 
        : "bg-[#161b22] border-[#30363d] text-[#8b949e] hover:border-[#484f58]"
    )}
  >
    {icon}
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
    {active && <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(234,179,8,1)]" />}
  </button>
);

const StatMini = ({ label, value }: { label: string, value: any }) => (
  <div className="flex justify-between items-end border-b border-[#30363d] pb-2">
    <span className="text-[9px] font-black text-[#484f58] uppercase tracking-widest">{label}</span>
    <span className="text-xs font-bold text-white uppercase">{value}</span>
  </div>
);

export default ProjectDetail;
