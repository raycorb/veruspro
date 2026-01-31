
import React, { useState, useEffect } from 'react';
import { FloorInfo, BuildingUse } from './types';
import { cn } from './utils';
import { Plus, Trash2 } from 'lucide-react';

interface BuildingVisualizationProps {
  floorsAbove: FloorInfo[];
  floorsBelow: FloorInfo[];
  onUpdateFloor: (id: string, updates: Partial<FloorInfo>) => void;
  onAddFloor: (above: boolean) => void;
  onRemoveFloor: (id: string) => void;
  evacuationHeight: number;
}

const BuildingVisualization: React.FC<BuildingVisualizationProps> = ({
  floorsAbove,
  floorsBelow,
  onUpdateFloor,
  onAddFloor,
  onRemoveFloor,
  evacuationHeight
}) => {
  const PX_M = 14; 
  const hAbove = floorsAbove.reduce((acc, f) => acc + f.height, 0);
  const hBelow = floorsBelow.reduce((acc, f) => acc + f.height, 0);

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn select-none">
      
      <button 
        onClick={() => onAddFloor(true)}
        className="group mb-2 flex items-center gap-1.5 text-[9px] font-black text-[#484f58] hover:text-yellow-500 uppercase tracking-widest transition-colors"
      >
        <Plus size={10} /> Añadir Planta
      </button>

      {/* Contenedor principal con espacio controlado para cotas técnicas */}
      <div className="w-full relative pr-36 pl-0.5">
        
        {/* Plantas Sobre Rasante */}
        <div className="flex flex-col-reverse">
          {floorsAbove.map((floor, index) => (
            <FloorItem 
              key={floor.id}
              floor={floor}
              displayLabel={index === 0 ? 'PB' : `P${index}`}
              heightPx={Math.max(34, floor.height * PX_M)}
              onUpdate={onUpdateFloor}
              onRemove={onRemoveFloor}
              type="above"
              isBase={index === 0}
            />
          ))}
        </div>

        {/* Eje de Rasante y HUD con posicionamiento relativo estricto */}
        <div className="flex items-center relative h-[2px] my-1.5">
           <div className="h-full w-full bg-yellow-500/60 shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
           
           {/* HUD Lateral Técnico */}
           <div className="absolute left-[calc(100%+12px)] flex flex-col items-start whitespace-nowrap">
              
              {/* h_evac: Siempre ARRIBA de la rasante */}
              {hAbove > 0 && (
                <div className="flex items-center gap-2 mb-1.5 absolute bottom-[4px] animate-fadeIn">
                  <div className="w-4 h-[1px] bg-red-500/40" />
                  <span className="text-[9px] font-black text-red-500 bg-[#0d1117] px-1.5 py-0.5 rounded border border-red-500/30 shadow-sm">
                    h_evac: {hAbove.toFixed(2).replace('.', ',')}m
                  </span>
                </div>
              )}

              {/* RASANTE: Justo en el eje */}
              <div className="flex items-center gap-2 absolute top-1/2 -translate-y-1/2">
                <div className="w-4 h-[1px] bg-yellow-500/60" />
                <span className="text-[8px] font-black text-yellow-500 uppercase tracking-tighter bg-yellow-500/20 px-1.5 py-0.5 rounded border border-yellow-500/40">
                  RASANTE
                </span>
              </div>
              
              {/* h_desc: Siempre DEBAJO de la rasante */}
              {hBelow > 0 && (
                <div className="flex items-center gap-2 mt-1.5 absolute top-[4px] animate-fadeIn">
                  <div className="w-4 h-[1px] bg-blue-400/40" />
                  <span className="text-[9px] font-black text-blue-400 bg-[#0d1117] px-1.5 py-0.5 rounded border border-blue-400/30 shadow-sm">
                    h_desc: {hBelow.toFixed(2).replace('.', ',')}m
                  </span>
                </div>
              )}
           </div>
        </div>

        {/* Plantas Bajo Rasante */}
        <div className="flex flex-col">
          {floorsBelow.map((floor, index) => (
            <FloorItem 
              key={floor.id}
              floor={floor}
              displayLabel={`S-${index + 1}`}
              heightPx={Math.max(34, floor.height * PX_M)}
              onUpdate={onUpdateFloor}
              onRemove={onRemoveFloor}
              type="below"
              isBase={false}
            />
          ))}
        </div>
      </div>

      <button 
        onClick={() => onAddFloor(false)}
        className="group mt-2 flex items-center gap-1.5 text-[9px] font-black text-[#484f58] hover:text-blue-400 uppercase tracking-widest transition-colors"
      >
        <Plus size={10} /> Añadir Sótano
      </button>
    </div>
  );
};

interface FloorItemProps {
  floor: FloorInfo;
  displayLabel: string;
  heightPx: number;
  onUpdate: (id: string, updates: Partial<FloorInfo>) => void;
  onRemove: (id: string) => void;
  type: 'above' | 'below';
  isBase: boolean;
}

const FloorItem: React.FC<FloorItemProps> = ({ floor, displayLabel, heightPx, onUpdate, onRemove, type, isBase }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(floor.height.toFixed(2).replace('.', ','));
  const isAbove = type === 'above';

  useEffect(() => {
    if (!isEditing) {
      setInputValue(floor.height.toFixed(2).replace('.', ','));
    }
  }, [floor.height, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9,.]/g, '');
    setInputValue(val);
    const numeric = parseFloat(val.replace(',', '.'));
    if (!isNaN(numeric)) {
      onUpdate(floor.id, { height: numeric });
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setInputValue(floor.height.toFixed(2).replace('.', ','));
  };

  return (
    <div 
      style={{ height: `${heightPx}px` }}
      className="w-full grid grid-cols-[1rem_1.8rem_1fr_4rem] items-center gap-1.5 group relative mb-0.5"
    >
      {/* 1. Botón Borrar */}
      <div className="flex justify-center">
        {!isBase && (
          <button 
            onClick={(e) => { e.stopPropagation(); onRemove(floor.id); }}
            className="opacity-0 group-hover:opacity-100 p-0.5 text-red-500/40 hover:text-red-500 transition-all rounded"
          >
            <Trash2 size={10} />
          </button>
        )}
      </div>

      {/* 2. Etiqueta Planta */}
      <div className="text-[8px] font-black text-[#8b949e] uppercase tracking-tighter">
        {displayLabel}
      </div>

      {/* 3. Selector de Uso - Ajustado para que "Pública Concurrencia" sea visible */}
      <div 
        className={cn(
          "h-full border rounded-[3px] flex items-center justify-center cursor-pointer transition-all px-1.5 overflow-hidden",
          isAbove 
            ? "border-yellow-500/20 bg-yellow-500/[0.04] hover:bg-yellow-500/[0.08]" 
            : "border-blue-400/20 bg-blue-400/[0.04] hover:bg-blue-400/[0.08]",
          isEditing && "ring-1 ring-yellow-500/50 border-yellow-500/50 bg-[#0d1117] z-20"
        )}
      >
        <select 
          className="w-full bg-transparent text-[8px] font-bold text-white outline-none cursor-pointer text-center appearance-none uppercase truncate"
          value={floor.use}
          onChange={(e) => onUpdate(floor.id, { use: e.target.value })}
        >
          {Object.values(BuildingUse).map(u => (
            <option key={u} value={u} className="bg-[#161b22] text-white text-[9px]">{u}</option>
          ))}
        </select>
      </div>

      {/* 4. Input Altura */}
      <div className="flex items-center gap-0.5 justify-end pr-0.5">
        <input 
          type="text"
          className="w-full bg-transparent text-[9px] font-black text-white text-right outline-none hover:bg-white/5 px-0.5 py-1 rounded transition-all focus:bg-[#161b22]"
          value={inputValue}
          onFocus={() => setIsEditing(true)}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="text-[7px] font-black text-[#484f58] shrink-0">m</span>
      </div>
    </div>
  );
};

export default BuildingVisualization;
