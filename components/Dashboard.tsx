
import React from 'react';
import { Project } from '../types';
import { 
  BarChart3, CheckCircle2, AlertTriangle, Clock, 
  ArrowUpRight, FileText, Layout
} from 'lucide-react';
import { cn } from '../utils';

interface DashboardProps {
  projects: Project[];
  onOpenProject: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, onOpenProject }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-2xl font-bold text-[#f0f6fc]">Gestión de Cumplimiento Normativo</h1>
        <p className="text-[#8b949e] text-sm mt-1">Panel de control de expedientes técnicos CTE.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Proyectos Activos" value={projects.length} icon={<Layout className="text-blue-500" />} />
        <StatCard title="Justificaciones OK" value="124" icon={<CheckCircle2 className="text-green-500" />} />
        <StatCard title="Pendientes Revisión" value="8" icon={<AlertTriangle className="text-yellow-500" />} />
        <StatCard title="Horas Ahorradas (IA)" value="45h" icon={<Clock className="text-purple-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recientes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
             <h2 className="text-sm font-bold uppercase tracking-widest text-[#8b949e]">Expedientes Recientes</h2>
             <button className="text-xs text-blue-500 hover:underline">Ver todos</button>
          </div>
          
          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="p-12 border-2 border-dashed border-[#30363d] rounded-2xl text-center text-[#8b949e]">
                 No hay actividad reciente.
              </div>
            ) : (
              projects.slice(0, 5).map(p => (
                <div 
                  key={p.id} 
                  onClick={() => onOpenProject(p.id)}
                  className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl flex items-center justify-between hover:border-[#8b949e] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#21262d] rounded-lg flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                       <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#f0f6fc]">{p.name}</h3>
                      <p className="text-[11px] text-[#8b949e]">{p.location} • {p.interventions[0]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden md:block">
                       <div className="flex items-center gap-1 mb-1">
                          <CheckCircle2 size={12} className="text-green-500" />
                          <span className="text-[10px] font-bold text-[#8b949e]">Progreso</span>
                       </div>
                       <div className="w-24 h-1.5 bg-[#30363d] rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '70%' }} />
                       </div>
                    </div>
                    <ArrowUpRight size={18} className="text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info lateral / IA Sugerencias */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#8b949e] px-2">Actualizaciones CTE</h2>
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-yellow-500/10 rounded-lg">
                   <AlertTriangle size={16} className="text-yellow-500" />
                </div>
                <span className="text-xs font-bold text-yellow-500">Aviso Normativo</span>
             </div>
             <p className="text-xs text-[#c9d1d9] leading-relaxed">
                Nueva modificación del DB-HE (Ahorro de Energía) entra en vigor el próximo mes. Revisa tus proyectos de Obra Nueva.
             </p>
             <button className="mt-4 w-full py-2 bg-[#21262d] hover:bg-[#30363d] rounded-lg text-xs font-bold text-blue-500 transition-colors">
               Leer más sobre el cambio
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: any) => (
  <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-2xl flex items-center justify-between">
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-[#8b949e] mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-[#f0f6fc]">{value}</h4>
    </div>
    <div className="w-10 h-10 bg-[#0d1117] rounded-xl flex items-center justify-center border border-[#30363d]">
       {icon}
    </div>
  </div>
);

export default Dashboard;
