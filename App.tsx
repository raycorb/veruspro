
import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, FolderOpen, BookOpen, MessageSquare, 
  Calculator, Settings, Bell, Search, Plus, 
  ChevronRight, Building2, Clock, CheckCircle2,
  MoreVertical, FileText, BarChart3, Info, Sparkles,
  Zap
} from 'lucide-react';
import { Project, AppModule, ComplianceStatus, InterventionType, BuildingUse } from './types';
import { CTE_DB_LIST } from './constants';
import { cn } from './utils';

// Components
import Dashboard from './components/Dashboard';
import ProjectDetail from './components/ProjectDetail';
import ProjectWizard from './components/ProjectWizard';
import CalculatorsModule from './components/CalculatorsModule';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AppModule>(AppModule.DASHBOARD);
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('cte_pro_projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cte_pro_projects', JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
    setActiveProjectId(newProject.id);
    setActiveModule(AppModule.PROJECTS);
    setIsWizardOpen(false);
  };

  const handleUpdateProject = (updated: Project) => {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const activeProject = projects.find(p => p.id === activeProjectId) || null;

  return (
    <div className="flex h-screen bg-[#0d1117] text-[#f0f6fc] overflow-hidden font-sans selection:bg-yellow-500/30">
      
      {/* 1. Primary Sidebar (Global Nav) */}
      <nav className="w-16 flex flex-col items-center py-4 bg-[#010409] border-r border-[#30363d] shrink-0 z-50">
        <div className="w-10 h-10 bg-[#d29922] rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-yellow-500/20 group cursor-pointer transition-transform hover:scale-105 active:scale-95" onClick={() => setActiveModule(AppModule.DASHBOARD)}>
          <Building2 size={24} className="text-black" />
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
          <SidebarIcon 
            icon={<LayoutGrid size={22} />} 
            active={activeModule === AppModule.DASHBOARD} 
            onClick={() => { setActiveModule(AppModule.DASHBOARD); setActiveProjectId(null); }}
            label="Dashboard"
          />
          <SidebarIcon 
            icon={<FolderOpen size={22} />} 
            active={activeModule === AppModule.PROJECTS} 
            onClick={() => setActiveModule(AppModule.PROJECTS)}
            label="Expedientes"
          />
          <SidebarIcon 
            icon={<Sparkles size={22} />} 
            active={activeModule === AppModule.CHAT} 
            onClick={() => setActiveModule(AppModule.CHAT)}
            label="Asistente IA"
          />
          <SidebarIcon 
            icon={<Calculator size={22} />} 
            active={activeModule === AppModule.CALCULATORS} 
            onClick={() => setActiveModule(AppModule.CALCULATORS)}
            label="Cálculos"
          />
          <div className="h-px bg-[#30363d] mx-4 my-2" />
          <SidebarIcon 
            icon={<BookOpen size={22} />} 
            active={activeModule === AppModule.LIBRARY} 
            onClick={() => setActiveModule(AppModule.LIBRARY)}
            label="Normativa"
          />
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <SidebarIcon icon={<Settings size={22} />} label="Ajustes" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d29922] to-yellow-600 border border-[#30363d] overflow-hidden p-0.5">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="rounded-full" />
          </div>
        </div>
      </nav>

      {/* 2. Secondary Sidebar (Contextual) */}
      <aside className="w-72 bg-[#0d1117] border-r border-[#30363d] flex flex-col shrink-0 animate-fadeInRight">
        <div className="p-4 border-b border-[#30363d] flex items-center justify-between h-[73px]">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#8b949e]">
            {activeModule === AppModule.DASHBOARD ? 'Resumen Global' : 
             activeModule === AppModule.PROJECTS ? 'Mis Proyectos' : 
             activeModule === AppModule.CALCULATORS ? 'Módulos de Cálculo' : 
             activeModule === AppModule.CHAT ? 'Asistente Técnico' : 'Biblioteca'}
          </h2>
          {activeModule === AppModule.PROJECTS && (
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="p-1.5 hover:bg-[#21262d] rounded-md text-yellow-500 transition-colors bg-yellow-500/10"
            >
              <Plus size={18} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {activeModule === AppModule.PROJECTS ? (
            <div className="space-y-1">
              {projects.length === 0 ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-[#21262d] rounded-full flex items-center justify-center mx-auto text-[#8b949e]">
                    <FileText size={20} />
                  </div>
                  <p className="text-xs text-[#8b949e] italic">No hay expedientes activos</p>
                  <button onClick={() => setIsWizardOpen(true)} className="text-[10px] font-bold text-yellow-500 hover:underline">CREAR PRIMERO</button>
                </div>
              ) : (
                projects.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setActiveProjectId(p.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl flex flex-col transition-all group border",
                      activeProjectId === p.id ? "bg-yellow-500/5 border-yellow-500/30 shadow-lg shadow-yellow-500/5" : "hover:bg-[#21262d] border-transparent"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className={cn("text-xs font-bold truncate", activeProjectId === p.id ? "text-yellow-500" : "text-[#c9d1d9]")}>{p.name}</span>
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1",
                        p.dbStatus.some(s => s.status === ComplianceStatus.IN_PROGRESS) ? "bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.5)]" : "bg-[#30363d]"
                      )} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase text-[#8b949e] tracking-widest">{p.uses[0]}</span>
                      <span className="text-[#30363d]">|</span>
                      <span className="text-[9px] font-bold text-[#484f58] uppercase">{p.buildingInfo.municipality}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          ) : activeModule === AppModule.CALCULATORS ? (
            <div className="p-2 space-y-1 text-center py-8">
               <Calculator size={32} className="mx-auto text-yellow-500/30 mb-4" />
               <p className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Catálogo de Cálculos</p>
               <p className="text-[9px] text-[#484f58] mt-1 px-4">Vincula resultados a tus memorias técnicas.</p>
            </div>
          ) : (
            <div className="p-12 text-center">
               <Clock size={32} strokeWidth={1} className="mx-auto text-[#30363d] mb-4" />
               <p className="text-[10px] text-[#8b949e] uppercase tracking-widest font-bold">Sin actividad reciente</p>
            </div>
          )}
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0d1117]">
        {/* Module Router */}
        {isWizardOpen ? (
          <div className="flex-1 flex items-center justify-center p-8 bg-[#010409]/50 backdrop-blur-sm">
            <ProjectWizard onCreate={handleCreateProject} onCancel={() => setIsWizardOpen(false)} />
          </div>
        ) : activeModule === AppModule.DASHBOARD ? (
          <Dashboard projects={projects} onOpenProject={(id) => { setActiveProjectId(id); setActiveModule(AppModule.PROJECTS); }} />
        ) : activeModule === AppModule.PROJECTS && activeProject ? (
          <ProjectDetail project={activeProject} onUpdate={handleUpdateProject} />
        ) : activeModule === AppModule.CALCULATORS ? (
          <CalculatorsModule activeProject={activeProject} onUpdateProject={handleUpdateProject} />
        ) : activeModule === AppModule.CHAT ? (
          <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center p-8">
             <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 mb-6 border border-yellow-500/20 shadow-xl shadow-yellow-500/5">
                <Sparkles size={32} />
             </div>
             <h3 className="text-2xl font-bold text-[#f0f6fc]">Consultoría Técnica IA</h3>
             <p className="text-[#8b949e] mt-2 mb-8 text-sm">Resuelve dudas sobre DB-SI, DB-HE y más con el motor de Gemini entrenado en normativa española.</p>
             <div className="w-full bg-[#161b22] border border-[#30363d] rounded-2xl p-4 flex gap-3 shadow-2xl focus-within:border-yellow-500/50 transition-all">
                <input type="text" placeholder="Ej: ¿Qué resistencia al fuego debe tener un forjado que separa uso aparcamiento de vivienda?" className="flex-1 bg-transparent outline-none text-sm p-2" />
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-xs transition-all">Consultar</button>
             </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[#8b949e]">
             <Building2 size={64} strokeWidth={1} className="mb-4 opacity-10" />
             <h3 className="text-xl font-medium">Panel de Control</h3>
             <p className="text-sm mt-1 opacity-60">Selecciona un módulo o expediente para trabajar.</p>
             <button 
              onClick={() => setIsWizardOpen(true)}
              className="mt-8 px-8 py-3 bg-[#238636] hover:bg-[#2ea043] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/20 active:scale-95 flex items-center gap-2"
             >
               <Plus size={18} /> Nuevo Expediente
             </button>
          </div>
        )}
      </main>
    </div>
  );
};

const SidebarIcon = ({ icon, active, onClick, label }: { icon: any, active?: boolean, onClick?: () => void, label: string }) => (
  <button 
    onClick={onClick}
    title={label}
    className={cn(
      "w-12 h-12 flex items-center justify-center rounded-xl transition-all relative group",
      active ? "text-yellow-500 bg-yellow-500/10 shadow-[0_0_15px_rgba(210,153,34,0.1)]" : "text-[#8b949e] hover:text-white hover:bg-[#21262d]"
    )}
  >
    {icon}
    {active && <div className="absolute left-0 w-1 h-6 bg-yellow-500 rounded-r-full" />}
    <div className="absolute left-16 px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-lg text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 z-50 shadow-2xl">
      {label}
    </div>
  </button>
);

export default App;
