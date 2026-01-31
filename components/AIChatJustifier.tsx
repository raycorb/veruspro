
import React, { useState } from 'react';
import { Project, DBSection } from '../types';
import { generateJustificationDraft } from '../services/geminiService';
import { AlertCircle, Zap, Copy, Check, FileText, Sparkles, Send } from 'lucide-react';

interface AIChatJustifierProps {
  project: Project;
  section: DBSection;
}

const AIChatJustifier: React.FC<AIChatJustifierProps> = ({ project, section }) => {
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const context = `
        Intervención: ${project.interventions.join(', ')}. 
        Usos: ${project.uses.join(', ')}. 
        Altura evacuación: ${project.height}m. 
        Superficie: ${project.totalArea}m2.
      `;
      const result = await generateJustificationDraft(
        project.name,
        section.title,
        section.code,
        context
      );
      setDraft(result);
    } catch (err: any) {
      setError(err.message || 'Error inesperado al conectar con el servidor de inteligencia artificial.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117] border-l border-[#30363d]">
      <div className="p-5 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500/10 p-2.5 rounded-xl border border-yellow-500/20 shadow-lg shadow-yellow-500/5">
            <Sparkles size={18} className="text-yellow-500" />
          </div>
          <div>
            <h4 className="text-xs font-black text-[#f0f6fc] uppercase tracking-wider">Redactor IA</h4>
            <p className="text-[9px] text-yellow-500/70 font-black tracking-[0.2em] uppercase">CTE Pro-AI Core</p>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`flex items-center px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-xl active:scale-95 ${loading ? 'bg-[#21262d] text-[#484f58] cursor-not-allowed border border-[#30363d]' : 'bg-yellow-500 text-black hover:bg-yellow-400'}`}
        >
          {loading ? 'REDACTANDO...' : 'GENERAR TEXTO'}
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar relative bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/[0.02] via-transparent to-transparent">
        {error && (
          <div className="mb-6 animate-fadeIn">
            <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-start gap-3 shadow-2xl">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <div>
                <h5 className="text-xs font-black text-red-500 mb-1 uppercase tracking-tight">Fallo en la Redacción</h5>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">{error}</p>
                <button 
                  onClick={handleGenerate} 
                  className="mt-4 text-[10px] font-black text-red-500 hover:text-red-400 flex items-center gap-2 uppercase"
                >
                  <Zap size={10} /> Reintentar proceso
                </button>
              </div>
            </div>
          </div>
        )}

        {draft ? (
          <div className="animate-fadeIn space-y-6">
            <div className="relative group">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-transparent rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
               <textarea
                className="relative w-full h-[500px] p-6 bg-[#0d1117] border border-[#30363d] rounded-3xl text-[#c9d1d9] font-serif text-[13px] focus:border-yellow-500/50 outline-none leading-loose shadow-2xl resize-none custom-scrollbar"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center bg-[#161b22] border border-[#30363d] p-3 rounded-2xl shadow-xl">
               <div className="flex gap-2 text-[9px] font-black text-[#484f58] uppercase px-2">
                  <span>Modo: Justificación Técnica</span>
                  <span>•</span>
                  <span>Motor: Flash 2.0</span>
               </div>
               <button 
                 onClick={copyToClipboard}
                 className="flex items-center gap-2 px-5 py-2 bg-[#21262d] hover:bg-[#30363d] rounded-xl text-xs font-black text-[#c9d1d9] transition-all active:scale-95 border border-[#30363d]"
               >
                 {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                 {copied ? '¡COPIADO!' : 'COPIAR BORRADOR'}
               </button>
            </div>
          </div>
        ) : !error && (
          <div className="flex flex-col items-center justify-center h-full text-center py-20 animate-pulse">
             <div className="relative mb-6">
                <FileText size={64} className="text-[#161b22]" />
                <Sparkles size={24} className="text-yellow-500/30 absolute -top-2 -right-2" />
             </div>
             <p className="text-[11px] font-black text-[#484f58] uppercase tracking-[0.3em]">Esperando Directrices...</p>
             <p className="text-[10px] text-[#8b949e] mt-4 max-w-[200px] leading-relaxed">Presiona el botón superior para que la IA redacte la justificación técnica basada en los datos del proyecto.</p>
          </div>
        )}
      </div>

      <div className="p-5 bg-[#010409] border-t border-[#30363d]">
         <div className="flex gap-3 items-center p-3 bg-[#161b22] border border-[#30363d] rounded-2xl focus-within:border-yellow-500/30 transition-all shadow-inner">
            <input 
              type="text" 
              placeholder="Añadir requisitos específicos..." 
              className="flex-1 bg-transparent text-[11px] outline-none text-[#c9d1d9]"
            />
            <button className="p-2 text-yellow-500 hover:text-yellow-400 transition-colors">
               <Send size={16} />
            </button>
         </div>
         <p className="text-[8px] text-[#484f58] text-center mt-4 uppercase tracking-widest font-black">
           Verificación Técnica Obligatoria • <span className="text-yellow-500/50">Normativa Vigente v.2024</span>
         </p>
      </div>
    </div>
  );
};

export default AIChatJustifier;
