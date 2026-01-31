
import React, { useState } from 'react';
import { TechnicalCalculation } from '../types';
import { cn } from '../utils';
import { Save, ChevronRight, Calculator, CheckCircle2 } from 'lucide-react';

interface CalculatorField {
  id: string;
  label: string;
  type: 'number' | 'select' | 'text';
  options?: string[];
  unit?: string;
  help?: string;
}

interface TechnicalCalculatorProps {
  title: string;
  fields: CalculatorField[];
  onCalculate: (inputs: Record<string, any>) => Record<string, any>;
  onSave: (calc: Partial<TechnicalCalculation>) => void;
  initialData?: TechnicalCalculation;
}

const TechnicalCalculator: React.FC<TechnicalCalculatorProps> = ({
  title,
  fields,
  onCalculate,
  onSave,
  initialData
}) => {
  const [inputs, setInputs] = useState<Record<string, any>>(initialData?.inputs || {});
  const [results, setResults] = useState<Record<string, any>>(initialData?.results || {});

  const handleInputChange = (id: string, value: any) => {
    const newInputs = { ...inputs, [id]: value };
    setInputs(newInputs);
    // Recalcular en tiempo real si es posible
    const newResults = onCalculate(newInputs);
    setResults(newResults);
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-3xl p-6 shadow-2xl animate-fadeIn">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500">
           <Calculator size={20} />
        </div>
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest">{title}</h3>
          <p className="text-[10px] text-[#8b949e] font-bold uppercase">Módulo de precisión normativa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-4">
          {fields.map(field => (
            <div key={field.id} className="space-y-1.5">
              <label className="block text-[10px] font-black text-[#8b949e] uppercase tracking-tighter">{field.label}</label>
              <div className="relative group">
                {field.type === 'select' ? (
                  <select 
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-2.5 text-sm focus:border-yellow-500 outline-none transition-all appearance-none cursor-pointer"
                    value={inputs[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input 
                    type={field.type}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-2.5 text-sm focus:border-yellow-500 outline-none transition-all shadow-inner"
                    value={inputs[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                  />
                )}
                {field.unit && (
                  <span className="absolute right-4 top-2.5 text-[10px] font-black text-[#484f58] uppercase">{field.unit}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Results View */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <CheckCircle2 size={120} />
           </div>
           <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-4">Resultados Calculados</h4>
           
           <div className="flex-1 space-y-4">
             {Object.entries(results).length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                  <Calculator size={32} className="mb-2" />
                  <p className="text-[10px] font-bold uppercase">Completa los datos</p>
               </div>
             ) : (
               Object.entries(results).map(([key, value]) => (
                 <div key={key} className="flex justify-between items-end border-b border-[#30363d] pb-2 group">
                    <span className="text-[10px] font-black text-[#8b949e] uppercase tracking-tighter group-hover:text-white transition-colors">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-lg font-black text-white">{value}</span>
                 </div>
               ))
             )}
           </div>

           <button 
             onClick={() => onSave({ inputs, results })}
             className="mt-8 w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl font-black text-xs transition-all shadow-lg shadow-yellow-500/10 active:scale-95 flex items-center justify-center gap-2"
           >
             <Save size={16} /> VINCULAR AL PROYECTO
           </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalCalculator;
