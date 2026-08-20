import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Dumbbell, Home, Waves, Moon, Calendar, Check, CheckCircle2,
  Timer, Trophy, RotateCcw, ChevronLeft, ChevronRight, X, Backpack,
  Settings, ArrowLeft, Zap, Activity, Circle, Star, AlertTriangle, Flame, TrendingUp, Link2, Sparkles, Ruler, Clock
} from 'lucide-react';
import { TURNO_INFO, SESION_INFO, SESIONES, CALENDARIO_DEFAULT, MES_INFO, DIAS_SEMANA } from './data.js';

// ═══════════════ HELPERS ═══════════════
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

const parseRest = (s) => {
  if (!s || s === '—' || s.includes('0s')) return null;
  const n = parseFloat(s.replace(',', '.'));
  if (isNaN(n)) return null;
  const range = s.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)/);
  const v = range ? parseFloat(range[2]) : n;
  return s.toLowerCase().includes('min') ? Math.round(v * 60) : Math.round(v);
};

const playBeep = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880; o.type = 'sine';
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    o.start(); o.stop(ctx.currentTime + 0.4);
  } catch (e) {}
};
const vibrate = (p) => { try { navigator.vibrate?.(p); } catch (e) {} };
const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const getToday = () => {
  const now = new Date();
  if (now.getFullYear() === MES_INFO.anio && now.getMonth() === MES_INFO.mesIdx) return now.getDate();
  return null;
};

const IconFor = ({ name, size = 20, color, style }) => {
  const p = { size, color, style, strokeWidth: 2 };
  switch (name) {
    case 'dumbbell': return <Dumbbell {...p} />;
    case 'home': return <Home {...p} />;
    case 'waves': return <Waves {...p} />;
    case 'run': return <Activity {...p} />;
    case 'moon': return <Moon {...p} />;
    case 'dot': return <Circle {...p} />;
    default: return <Zap {...p} />;
  }
};

// ═══════════════ NUMERIC INPUT ═══════════════
const NumInput = ({ value, onChange, placeholder, w = 'w-11' }) => (
  <input
    type="text" inputMode="numeric" pattern="[0-9]*\.?[0-9]*"
    value={value ?? ''}
    onChange={(e) => onChange(e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.'))}
    placeholder={placeholder}
    className={`${w} h-8 px-1 bg-[#0f1417] border border-[#2a3540] focus:border-[#4a5560] focus:outline-none text-slate-100 text-xs text-center rounded transition-colors`}
    style={{ fontFamily: 'ui-monospace, monospace' }}
  />
);

// ═══════════════ REST TIMER OVERLAY ═══════════════
const RestTimer = ({ timer, onSkip, color }) => {
  if (!timer) return null;
  const { secondsLeft, total, name, done } = timer;
  const pct = total > 0 ? Math.max(0, (secondsLeft / total) * 100) : 0;
  const low = secondsLeft <= 5 && secondsLeft > 0;
  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:w-72 z-50 rounded-xl overflow-hidden border-2 shadow-2xl"
      style={{ borderColor: done ? '#22c55e' : color, background: '#151b21' }}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <Timer size={13} color={done ? '#22c55e' : color} />
            <span className="text-[10px] uppercase tracking-wide font-bold truncate" style={{ color: done ? '#22c55e' : color }}>
              {done ? 'Descanso listo' : 'Descansando'}
            </span>
          </div>
          <button onClick={onSkip} className="flex items-center gap-1 px-2 py-0.5 border border-[#2a3540] rounded text-slate-400 text-[10px] font-bold">
            SALTAR <X size={10} />
          </button>
        </div>
        <div className="text-[10px] text-slate-500 truncate mb-1">{name}</div>
        <div className={`text-4xl font-bold leading-none ${low ? 'text-red-400' : 'text-slate-100'}`} style={{ fontFamily: 'ui-monospace, monospace' }}>
          {fmtTime(secondsLeft)}
        </div>
        <div className="mt-2 h-1 bg-[#0f1417] rounded-full overflow-hidden">
          <div className="h-full transition-all duration-1000 ease-linear" style={{ width: `${pct}%`, background: done ? '#22c55e' : color }} />
        </div>
      </div>
    </div>
  );
};

// ═══════════════ EXERCISE CARD ═══════════════
const ExerciseCard = ({ ex, prog, pr, onToggleSet, onLog, onLastre, onBanda, color }) => {
  const setCount = typeof ex.series === 'number' ? ex.series : 1;
  const p = prog || { sets: [], logs: [], lastre: null };
  const allDone = setCount > 0 && p.sets?.length === setCount && p.sets.every(Boolean);
  const isPR = pr?.flash;

  return (
    <div className={`rounded-lg border transition-all ${allDone ? 'border-emerald-600/50 bg-emerald-950/10' : 'border-[#232c34] bg-[#151b21]'}`}>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {ex.nuevo && (
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1 border bg-green-500/20 border-green-400/60 text-green-300">
                  <Sparkles size={9} strokeWidth={3} />Nuevo v5
                </span>
              )}
              {ex.opcional && (
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1 border bg-slate-600/20 border-slate-500/60 text-slate-300">
                  Opcional
                </span>
              )}
              {ex.bs && (
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1 border"
                  style={{
                    background: ex.bstipo === 'ant' ? '#7c2d1233' : '#5b21b633',
                    borderColor: ex.bstipo === 'ant' ? '#c2410c88' : '#7c3aed88',
                    color: ex.bstipo === 'ant' ? '#fdba74' : '#c4b5fd'
                  }}>
                  <Link2 size={9} strokeWidth={3} />{ex.bs} · {ex.bstipo === 'ant' ? 'antag.' : 'no comp.'}
                </span>
              )}
              {allDone && <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 flex items-center gap-1"><Check size={9} strokeWidth={3} />Hecho</span>}
              {(ex.lastre || ex.acarreo) && pr?.kg != null && (
                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border flex items-center gap-1 ${isPR ? 'bg-amber-500/30 border-amber-400 text-amber-200 animate-pulse' : 'bg-amber-950/40 border-amber-700/50 text-amber-300'}`}>
                  <Trophy size={9} strokeWidth={3} />PR {pr.kg}kg
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-100 leading-tight">{ex.nombre}</h3>
            {ex.nota && <p className="text-[11px] text-slate-500 mt-0.5">{ex.nota}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {[['Series', ex.series], ['Reps', ex.reps], ['RIR', ex.rir], ['Desc.', ex.descanso]].map(([l, v], i) => (
            <div key={i} className="bg-[#0f1417] border border-[#232c34] px-1.5 py-1 rounded text-center">
              <div className="text-[8px] uppercase tracking-wide text-slate-600 font-semibold">{l}</div>
              <div className="text-xs font-bold text-slate-200" style={{ fontFamily: 'ui-monospace, monospace' }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Banda de asistencia */}
        {ex.banda && (
          <div className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded bg-purple-950/20 border border-purple-900/40">
            <Zap size={14} className="text-purple-400 flex-shrink-0" />
            <span className="text-[10px] uppercase tracking-wide text-purple-300/80 font-semibold">Banda</span>
            <input
              type="text"
              value={p.banda ?? ''}
              onChange={(e) => onBanda(ex.id, e.target.value)}
              placeholder="color/nivel"
              className="flex-1 min-w-0 h-8 px-2 bg-[#0f1417] border border-[#3a2a50] focus:border-purple-500/60 focus:outline-none text-slate-100 text-xs rounded"
            />
          </div>
        )}

        {/* Acarreo (distancia + carga) */}
        {ex.acarreo && (
          <div className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded bg-cyan-950/20 border border-cyan-900/40 flex-wrap">
            <Ruler size={14} className="text-cyan-400 flex-shrink-0" />
            <span className="text-[10px] uppercase tracking-wide text-cyan-300/80 font-semibold">Acarreo</span>
            <input type="text" inputMode="numeric" value={p.banda ?? ''}
              onChange={(e) => onBanda(ex.id, e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="m" className="w-12 h-8 px-1 bg-[#0f1417] border border-cyan-900/50 focus:border-cyan-500/60 focus:outline-none text-slate-100 text-xs text-center rounded" />
            <span className="text-[10px] text-slate-500">m</span>
            <NumInput value={p.lastre} onChange={(v) => onLastre(ex.id, v === '' ? null : parseFloat(v))} placeholder="kg" w="w-12" />
            <span className="text-[10px] text-slate-500">kg</span>
            <span className="text-[9px] text-cyan-500/70 w-full">Sube primero distancia (30→40→50m), luego carga</span>
          </div>
        )}

        {/* Isométrico (segundos) - métrica clave */}
        {ex.iso && (
          <div className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded bg-rose-950/20 border border-rose-900/40 flex-wrap">
            <Clock size={14} className="text-rose-400 flex-shrink-0" />
            <span className="text-[10px] uppercase tracking-wide text-rose-300/80 font-semibold">Isométrico</span>
            <NumInput value={p.segundos} onChange={(v) => onLastre(ex.id, v === '' ? null : parseFloat(v))} placeholder="seg" w="w-14" />
            <span className="text-[10px] text-slate-500">seg</span>
            <span className="text-[9px] text-rose-500/70 w-full">Métrica clave del objetivo. Solo tiempo hasta 60s, luego carga</span>
          </div>
        )}

        {/* Lastre (mochila) */}
        {ex.lastre && (
          <div className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded bg-amber-950/20 border border-amber-900/40">
            <Backpack size={14} className="text-amber-400 flex-shrink-0" />
            <span className="text-[10px] uppercase tracking-wide text-amber-300/80 font-semibold">Lastre</span>
            <NumInput value={p.lastre} onChange={(v) => onLastre(ex.id, v === '' ? null : parseFloat(v))} placeholder="kg" w="w-14" />
            <span className="text-[10px] text-slate-500">kg</span>
          </div>
        )}

        {/* Checklist de series */}
        {setCount > 0 && (
          <div className="flex items-start gap-1.5 flex-wrap pt-2 border-t border-[#232c34]">
            {Array.from({ length: setCount }).map((_, i) => {
              const checked = p.sets?.[i];
              const log = p.logs?.[i] || {};
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <button onClick={() => onToggleSet(ex.id, i, setCount, ex)}
                    className={`w-9 h-9 rounded-md border-2 flex items-center justify-center font-bold text-xs transition-all ${checked ? 'border-transparent' : 'border-[#2a3540] bg-[#0f1417] text-slate-500'}`}
                    style={{ background: checked ? color : undefined, color: checked ? '#0a0a0a' : undefined, fontFamily: 'ui-monospace, monospace' }}>
                    {checked ? <Check size={14} strokeWidth={3} /> : i + 1}
                  </button>
                  {checked && ex.rir !== '—' && (
                    <div className="flex flex-col gap-0.5">
                      <NumInput value={log.kg} onChange={(v) => onLog(ex.id, i, { ...log, kg: v === '' ? null : parseFloat(v) }, setCount)} placeholder="kg" />
                      <NumInput value={log.reps} onChange={(v) => onLog(ex.id, i, { ...log, reps: v === '' ? null : parseInt(v, 10) }, setCount)} placeholder="rep" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════ SESSION VIEW ═══════════════
const SessionView = ({ diaData, sesionKey, progress, prMap, onBack, onToggleSet, onLog, onLastre, onBanda, onReset, restTimer, onSkipTimer }) => {
  const ses = SESIONES[sesionKey];
  const color = ses.color;
  const dayProg = progress || {};

  const total = ses.ejercicios.length;
  const completed = useMemo(() => ses.ejercicios.filter(ex => {
    const sc = typeof ex.series === 'number' ? ex.series : 1;
    const p = dayProg[ex.id];
    return sc > 0 && p?.sets?.length === sc && p.sets.every(Boolean);
  }).length, [ses, dayProg]);

  const done = total > 0 && completed === total;
  const anyProgress = Object.keys(dayProg).length > 0;

  return (
    <div className="min-h-screen bg-[#0f1417]">
      <header className="sticky top-0 z-30 bg-[#0f1417]/95 backdrop-blur border-b border-[#232c34]">
        <div className="px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wide mb-2">
            <ArrowLeft size={14} /> Calendario
          </button>
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: color + '22', border: `2px solid ${color}` }}>
              <IconFor name={SESION_INFO[sesionKey]?.icon} size={20} color={color} />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-50 leading-none">{ses.nombre}</h1>
              <div className="text-[11px] uppercase tracking-wide mt-1 font-medium" style={{ color }}>
                {MES_INFO.nombre} {diaData.dia} · {diaData.sem} · {ses.subtitulo}
              </div>
            </div>
          </div>
          {total > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">
                  {completed}/{total} ejercicios {done && '· completo'}
                </span>
                {anyProgress && (
                  <button onClick={onReset} className="flex items-center gap-1 text-[10px] uppercase text-slate-500 font-bold">
                    <RotateCcw size={10} /> Reset
                  </button>
                )}
              </div>
              <div className="h-1.5 bg-[#1a222a] rounded-full overflow-hidden">
                <div className="h-full transition-all duration-500" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%`, background: done ? '#22c55e' : color }} />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="px-4 py-4 max-w-2xl mx-auto pb-32">
        {/* Aviso de festivo */}
        {diaData.festivo && (
          <div className="mb-3 px-3 py-2.5 rounded-lg border-l-4 border-rose-500 bg-rose-950/20 flex items-start gap-2">
            <Star size={15} className="text-rose-400 flex-shrink-0 mt-0.5" fill="currentColor" />
            <p className="text-[12px] text-rose-200 leading-relaxed">
              <span className="font-bold">Día festivo en Colombia.</span>
              {sesionKey === 'natacion'
                ? ' La piscina universitaria está cerrada hoy. Cambia a running, calistenia o descanso desde el modo edición.'
                : ' La piscina universitaria está cerrada, pero el gym y las demás sesiones no se afectan.'}
            </p>
          </div>
        )}

        {/* Chequeo */}
        <div className="mb-4 px-3 py-2.5 rounded-lg border-l-4 bg-[#151b21]" style={{ borderColor: color }}>
          <p className="text-[12px] text-slate-300 leading-relaxed">{ses.chequeo}</p>
        </div>

        {/* Aviso: sesión con acarreos antes de guardia / seguridad */}
        {ses.ejercicios.some(e => e.acarreo) && (
          <div className="mb-4 px-3 py-2 rounded-lg border-l-4 border-cyan-600 bg-cyan-950/20 flex items-start gap-2">
            <AlertTriangle size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-cyan-200/90 leading-relaxed">
              Esta sesión tiene acarreos. Si mañana tienes guardia, recorta a 2 series (es autorregulación). Si el agarre te limitó un remo o jalón, baja carga, no distancia.
            </p>
          </div>
        )}

        {total === 0 ? (
          <div className="text-center py-16">
            <Moon size={40} className="text-slate-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-slate-300 mb-2">Día de descanso</h2>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">El sueño es tu factor limitante real. Hoy recuperas. Máximo unos dead hangs suaves si te apetece.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {ses.ejercicios.map(ex => (
              <ExerciseCard key={ex.id} ex={ex} prog={dayProg[ex.id]} pr={prMap[ex.id]}
                onToggleSet={onToggleSet} onLog={onLog} onLastre={onLastre} onBanda={onBanda} color={color} />
            ))}
          </div>
        )}

        {done && total > 0 && (
          <div className="mt-6 rounded-xl border-2 border-emerald-600/50 bg-gradient-to-br from-emerald-950/40 to-[#0f1417] p-5 text-center">
            <Trophy size={32} className="text-emerald-400 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-slate-50">Sesión completada</h3>
            <p className="text-sm text-slate-400 mt-1">Buen trabajo. Recupera: proteína + sueño. Nos vemos la próxima.</p>
          </div>
        )}
      </main>

      <RestTimer timer={restTimer} onSkip={onSkipTimer} color={color} />
    </div>
  );
};

// ═══════════════ EDIT DAY MODAL ═══════════════
const EditModal = ({ dia, onSave, onClose }) => {
  const [turno, setTurno] = useState(dia.turno);
  const [sesion, setSesion] = useState(dia.sesion);
  const [festivo, setFestivo] = useState(!!dia.festivo);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/80" onClick={onClose}>
      <div className="w-full max-w-md bg-[#151b21] border border-[#2a3540] rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-4 py-3 border-b border-[#232c34] flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100">Editar día {dia.dia} · {dia.sem}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-400"><X size={18} /></button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold mb-2">Turno</div>
            <div className="grid grid-cols-4 gap-1.5">
              {Object.entries(TURNO_INFO).map(([k, v]) => (
                <button key={k} onClick={() => setTurno(k)}
                  className={`py-2 rounded-lg border-2 text-xs font-bold transition-all ${turno === k ? '' : 'border-[#2a3540] text-slate-400'}`}
                  style={{ borderColor: turno === k ? v.color : undefined, background: turno === k ? v.color + '22' : undefined, color: turno === k ? v.color : undefined }}>
                  {k}
                  <div className="text-[8px] font-normal mt-0.5">{v.label}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold mb-2">Sesión</div>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(SESION_INFO).map(([k, v]) => (
                <button key={k} onClick={() => setSesion(k)}
                  className={`py-2 px-2 rounded-lg border-2 text-xs font-bold flex items-center gap-2 transition-all ${sesion === k ? '' : 'border-[#2a3540] text-slate-400'}`}
                  style={{ borderColor: sesion === k ? v.color : undefined, background: sesion === k ? v.color + '22' : undefined, color: sesion === k ? v.color : undefined }}>
                  <IconFor name={v.icon} size={14} color={sesion === k ? v.color : '#64748b'} />
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold mb-2">Festivo</div>
            <button onClick={() => setFestivo(!festivo)}
              className={`w-full py-2.5 rounded-lg border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all ${festivo ? 'border-rose-500 bg-rose-500/20 text-rose-300' : 'border-[#2a3540] text-slate-400'}`}>
              <Star size={14} fill={festivo ? 'currentColor' : 'none'} />
              {festivo ? 'Es festivo (piscina cerrada)' : 'Marcar como festivo'}
            </button>
          </div>
        </div>
        <div className="flex gap-2 p-4 border-t border-[#232c34]">
          <button onClick={onClose} className="flex-1 py-2.5 border border-[#2a3540] text-slate-300 text-xs font-bold uppercase rounded-lg">Cancelar</button>
          <button onClick={() => onSave(dia.dia, turno, sesion, festivo)} className="flex-1 py-2.5 bg-emerald-600 text-white text-xs font-bold uppercase rounded-lg">Guardar</button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════ CALENDAR VIEW ═══════════════
const CalendarView = ({ calendario, progress, onOpenDay, onEditDay, editMode, setEditMode, today, saveStatus }) => {
  const dayCompletion = useCallback((d) => {
    const ses = SESIONES[d.sesion];
    if (!ses || ses.ejercicios.length === 0) return 'none';
    const p = progress[d.dia] || {};
    const total = ses.ejercicios.length;
    const done = ses.ejercicios.filter(ex => {
      const sc = typeof ex.series === 'number' ? ex.series : 1;
      const pr = p[ex.id];
      return sc > 0 && pr?.sets?.length === sc && pr.sets.every(Boolean);
    }).length;
    if (done === 0) return 'none';
    if (done === total) return 'full';
    return 'partial';
  }, [progress]);

  // ─── Estadísticas del mes ───
  const stats = useMemo(() => {
    // Días entrenables = los que tienen sesión con ejercicios (no descanso)
    const entrenables = calendario.filter(d => {
      const s = SESIONES[d.sesion];
      return s && s.ejercicios.length > 0;
    });
    const totalEntrenables = entrenables.length;

    let completadas = 0, parciales = 0;
    // Desglose por categoría
    const cats = { gym: 0, cardio: 0, calistenia: 0 };
    const catsTotal = { gym: 0, cardio: 0, calistenia: 0 };

    const catOf = (sesion) => {
      if (sesion.startsWith('gym')) return 'gym';
      if (sesion === 'natacion' || sesion === 'running') return 'cardio';
      if (sesion === 'calistenia') return 'calistenia';
      return null;
    };

    entrenables.forEach(d => {
      const c = catOf(d.sesion);
      if (c) catsTotal[c]++;
      const comp = dayCompletion(d);
      if (comp === 'full') { completadas++; if (c) cats[c]++; }
      else if (comp === 'partial') parciales++;
    });

    // Racha: días completados consecutivos hacia atrás desde hoy (o desde el último día con actividad)
    // Contamos sobre días entrenables; los de descanso no rompen la racha.
    let racha = 0;
    const refDay = today || 31;
    const ordenados = [...calendario].filter(d => d.dia <= refDay).sort((a, b) => b.dia - a.dia);
    for (const d of ordenados) {
      const ses = SESIONES[d.sesion];
      const esDescanso = !ses || ses.ejercicios.length === 0;
      if (esDescanso) continue; // descanso no rompe ni suma
      if (dayCompletion(d) === 'full') racha++;
      else break;
    }

    const pct = totalEntrenables > 0 ? Math.round((completadas / totalEntrenables) * 100) : 0;
    return { totalEntrenables, completadas, parciales, pct, racha, cats, catsTotal };
  }, [calendario, progress, dayCompletion, today]);


  return (
    <div className="min-h-screen bg-[#0f1417]">
      <header className="sticky top-0 z-30 bg-[#0f1417]/95 backdrop-blur border-b border-[#232c34]">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-50 leading-none tracking-tight">{MES_INFO.nombre} {MES_INFO.anio}</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">Entrenamiento por turnos · 75→85 kg</p>
              {saveStatus === 'saved' && (
                <span className="text-[10px] uppercase tracking-wide text-emerald-400 font-bold flex items-center gap-0.5">
                  <Check size={10} strokeWidth={3} /> Guardado
                </span>
              )}
            </div>
          </div>
          <button onClick={() => setEditMode(!editMode)}
            className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${editMode ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' : 'border-[#2a3540] text-slate-400'}`}>
            <Settings size={18} />
          </button>
        </div>
        {editMode && (
          <div className="px-4 pb-3">
            <div className="px-3 py-2 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
              <p className="text-[11px] text-emerald-300">Modo edición: toca cualquier día para cambiar su turno o sesión. Ideal para adaptar la app a los turnos del próximo mes.</p>
            </div>
          </div>
        )}
      </header>

      <main className="px-2 py-4 max-w-2xl mx-auto pb-24">
        {/* Leyenda de turnos */}
        <div className="flex items-center gap-3 justify-center mb-4 flex-wrap px-2">
          {Object.entries(TURNO_INFO).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: v.color }} />
              <span className="text-[10px] text-slate-500 uppercase tracking-wide">{v.label}</span>
            </div>
          ))}
        </div>

        {/* Cabecera de días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-1 px-1">
          {DIAS_SEMANA.map((d, i) => (
            <div key={i} className="text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-slate-500 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Cuadrícula del calendario */}
        <div className="grid grid-cols-7 gap-1 px-1">
          {/* Celdas vacías antes del día 1 */}
          {Array.from({ length: MES_INFO.primerDiaSemana }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Días del mes */}
          {calendario.map(d => {
            const turno = TURNO_INFO[d.turno];
            const ses = SESION_INFO[d.sesion];
            const comp = dayCompletion(d);
            const isToday = today === d.dia;
            return (
              <button key={d.dia}
                onClick={() => editMode ? onEditDay(d) : onOpenDay(d)}
                className={`relative aspect-square rounded-lg border p-1 flex flex-col transition-all ${
                  isToday ? 'border-slate-300 bg-[#1a222a] ring-1 ring-slate-400/50' : 'border-[#232c34] bg-[#151b21] active:bg-[#1a222a]'
                }`}
                style={{ borderTopColor: turno.color, borderTopWidth: '3px' }}>

                {/* Número del día + turno */}
                <div className="flex items-start justify-between leading-none">
                  <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'ui-monospace, monospace', color: isToday ? '#e2e8f0' : '#cbd5e1' }}>
                    {d.dia}<span className="text-[10px] font-bold" style={{ color: turno.color }}> · {d.turno}</span>
                  </span>
                  {/* Indicador de estado (esquina) */}
                  {!editMode && comp === 'full' && <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />}
                  {!editMode && comp === 'partial' && <Circle size={11} className="text-amber-400 flex-shrink-0" fill="#f59e0b" fillOpacity={0.4} />}
                  {editMode && <Settings size={11} className="text-slate-500 flex-shrink-0" />}
                </div>

                {/* Ícono de sesión (centro) */}
                <div className="flex-1 flex items-center justify-center">
                  <IconFor name={ses.icon} size={18} color={ses.color} />
                </div>

                {/* Etiqueta de sesión (abajo) */}
                <div className="text-[7px] sm:text-[8px] font-bold uppercase tracking-tight text-center leading-none truncate" style={{ color: ses.color }}>
                  {ses.label}
                </div>

                {/* Marcadores de esquina: hoy y festivo */}
                {isToday && (
                  <span className="absolute -top-1 -right-1 text-[7px] font-bold uppercase px-1 py-0.5 rounded-full bg-slate-200 text-slate-900 leading-none">Hoy</span>
                )}
                {d.festivo && (
                  <span className="absolute -top-1 -left-1 w-3.5 h-3.5 rounded-full bg-rose-500 flex items-center justify-center">
                    <Star size={8} className="text-white" fill="currentColor" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ═══ PANEL DE ESTADÍSTICAS ═══ */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3 px-1">
            <TrendingUp size={15} className="text-emerald-400" />
            <h2 className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">Tu progreso este mes</h2>
          </div>

          {/* Fila superior: anillo de sesiones + racha */}
          <div className="grid grid-cols-2 gap-2.5 mb-2.5">
            {/* Anillo de progreso */}
            <div className="rounded-xl border border-[#232c34] bg-[#151b21] p-3 flex items-center gap-3">
              <div className="relative flex-shrink-0" style={{ width: 62, height: 62 }}>
                <svg width="62" height="62" className="-rotate-90">
                  <circle cx="31" cy="31" r="26" fill="none" stroke="#232c34" strokeWidth="6" />
                  <circle cx="31" cy="31" r="26" fill="none" stroke="#22c55e" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 * (1 - stats.pct / 100)}
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-slate-100" style={{ fontFamily: 'ui-monospace, monospace' }}>{stats.pct}%</span>
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-2xl font-bold text-slate-100 leading-none" style={{ fontFamily: 'ui-monospace, monospace' }}>
                  {stats.completadas}<span className="text-sm text-slate-500">/{stats.totalEntrenables}</span>
                </div>
                <div className="text-[10px] uppercase tracking-wide text-slate-500 mt-1 leading-tight">Sesiones<br />completadas</div>
              </div>
            </div>

            {/* Racha */}
            <div className="rounded-xl border border-[#232c34] bg-[#151b21] p-3 flex items-center gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: stats.racha > 0 ? 'radial-gradient(circle, #f59e0b33, #f59e0b11)' : '#1a222a' }}>
                <Flame size={30} color={stats.racha > 0 ? '#f59e0b' : '#475569'} fill={stats.racha > 0 ? '#f59e0b' : 'none'} fillOpacity={0.25} />
              </div>
              <div className="min-w-0">
                <div className="text-2xl font-bold text-slate-100 leading-none" style={{ fontFamily: 'ui-monospace, monospace' }}>
                  {stats.racha}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-slate-500 mt-1 leading-tight">
                  {stats.racha === 1 ? 'Sesión en' : 'Sesiones en'}<br />racha
                </div>
              </div>
            </div>
          </div>

          {/* Desglose por categoría (barras sutiles) */}
          <div className="rounded-xl border border-[#232c34] bg-[#151b21] p-3.5">
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold mb-3">Desglose por tipo</div>
            <div className="space-y-2.5">
              {[
                { key: 'gym', label: 'Gimnasio', color: '#22c55e' },
                { key: 'cardio', label: 'Cardio', color: '#06b6d4' },
                { key: 'calistenia', label: 'Calistenia', color: '#a855f7' },
              ].map(({ key, label, color }) => {
                const done = stats.cats[key], tot = stats.catsTotal[key];
                const pct = tot > 0 ? (done / tot) * 100 : 0;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-slate-300">{label}</span>
                      <span className="text-[10px] font-bold" style={{ fontFamily: 'ui-monospace, monospace', color }}>{done}/{tot}</span>
                    </div>
                    <div className="h-1.5 bg-[#0f1417] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color, transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Nota inferior */}
        <p className="text-center text-[10px] text-slate-600 mt-4 px-4">
          Toca un día para ver o registrar tu entrenamiento{editMode ? '' : ''}
        </p>
      </main>
    </div>
  );
};

// ═══════════════ MAIN APP ═══════════════
export default function App() {
  const [calendario, setCalendario] = useState(CALENDARIO_DEFAULT);
  const [progress, setProgress] = useState({}); // { dia: { exId: {sets,logs,lastre} } }
  const [prMap, setPrMap] = useState({}); // { exId: {kg, flash} }
  const [view, setView] = useState('calendar'); // calendar | session
  const [activeDia, setActiveDia] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingDay, setEditingDay] = useState(null);
  const [restTimer, setRestTimer] = useState(null);
  const timerRef = useRef(null);
  const today = getToday();

  // ─── Persistencia robusta ───
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved
  const loadedRef = useRef(false);
  const saveTimeoutRef = useRef(null);

  // Guardado directo (sin debounce): se llama cada vez que cambian los datos
  const doSave = useCallback((cal, prog, prs) => {
    try {
      localStorage.setItem('plan-internado', JSON.stringify({ cal, prog, prs, v: 2 }));
      setSaveStatus('saved');
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => setSaveStatus('idle'), 1500);
      return true;
    } catch (e) {
      setSaveStatus('error');
      return false;
    }
  }, []);

  // Cargar al iniciar
  useEffect(() => {
    try {
      const raw = localStorage.getItem('plan-internado');
      if (raw) {
        const d = JSON.parse(raw);
        if (d.cal) setCalendario(d.cal);
        if (d.prog) setProgress(d.prog);
        if (d.prs) setPrMap(d.prs);
      }
    } catch (e) {}
    loadedRef.current = true;
  }, []);

  // Guardar cada vez que cambian los datos (inmediato, tras la carga inicial)
  useEffect(() => {
    if (!loadedRef.current) return; // no guardar durante la carga inicial
    doSave(calendario, progress, prMap);
  }, [calendario, progress, prMap, doSave]);

  // Guardar también cuando la app se minimiza o se cierra (red de seguridad)
  useEffect(() => {
    const flush = () => {
      if (loadedRef.current) {
        try { localStorage.setItem('plan-internado', JSON.stringify({ cal: calendario, prog: progress, prs: prMap, v: 2 })); } catch (e) {}
      }
    };
    window.addEventListener('visibilitychange', flush);
    window.addEventListener('pagehide', flush);
    window.addEventListener('beforeunload', flush);
    return () => {
      window.removeEventListener('visibilitychange', flush);
      window.removeEventListener('pagehide', flush);
      window.removeEventListener('beforeunload', flush);
    };
  }, [calendario, progress, prMap]);

  // ─── Timer ───
  const startTimer = useCallback((secs, name) => {
    if (!secs || timerRef.current) return;
    vibrate(100);
    let left = secs;
    setRestTimer({ secondsLeft: left, total: secs, name, done: false });
    timerRef.current = setInterval(() => {
      left -= 1;
      if (left <= 0) {
        clearInterval(timerRef.current); timerRef.current = null;
        setRestTimer({ secondsLeft: 0, total: secs, name, done: true });
        vibrate([200, 100, 200]); playBeep(); setTimeout(playBeep, 500);
        setTimeout(() => setRestTimer(null), 3000);
      } else setRestTimer(p => p ? { ...p, secondsLeft: left } : null);
    }, 1000);
  }, []);
  const skipTimer = useCallback(() => { if (timerRef.current) clearInterval(timerRef.current); timerRef.current = null; setRestTimer(null); }, []);
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  // ─── PR detector ───
  const checkPR = useCallback((exId, kg) => {
    if (kg == null || isNaN(kg) || kg <= 0) return;
    setPrMap(prev => {
      const cur = prev[exId];
      if (!cur || kg > cur.kg) {
        vibrate(400);
        setTimeout(() => setPrMap(p => ({ ...p, [exId]: { ...p[exId], flash: false } })), 4000);
        return { ...prev, [exId]: { kg, flash: true } };
      }
      return prev;
    });
  }, []);

  // ─── Mutaciones de progreso ───
  const toggleSet = useCallback((exId, i, setCount, ex) => {
    setProgress(prev => {
      const day = prev[activeDia] || {};
      const p = day[exId] || { sets: [], logs: [], lastre: null };
      const sets = [...(p.sets || [])];
      const logs = [...(p.logs || [])];
      while (sets.length < setCount) sets.push(false);
      while (logs.length < setCount) logs.push(null);
      const nv = !sets[i];
      sets[i] = nv;
      if (nv && !timerRef.current && ex) { const r = parseRest(ex.descanso); if (r) startTimer(r, ex.nombre); }
      return { ...prev, [activeDia]: { ...day, [exId]: { ...p, sets, logs } } };
    });
  }, [activeDia, startTimer]);

  const onLog = useCallback((exId, i, log, setCount) => {
    setProgress(prev => {
      const day = prev[activeDia] || {};
      const p = day[exId] || { sets: [], logs: [], lastre: null };
      const logs = [...(p.logs || [])];
      while (logs.length < setCount) logs.push(null);
      logs[i] = log;
      return { ...prev, [activeDia]: { ...day, [exId]: { ...p, logs } } };
    });
    if (log?.kg != null) checkPR(exId, log.kg);
  }, [activeDia, checkPR]);

  const onLastre = useCallback((exId, kg) => {
    setProgress(prev => {
      const day = prev[activeDia] || {};
      const p = day[exId] || { sets: [], logs: [], lastre: null };
      return { ...prev, [activeDia]: { ...day, [exId]: { ...p, lastre: kg } } };
    });
    if (kg != null) checkPR(exId, kg);
  }, [activeDia, checkPR]);

  const onBanda = useCallback((exId, val) => {
    setProgress(prev => {
      const day = prev[activeDia] || {};
      const p = day[exId] || { sets: [], logs: [], lastre: null };
      return { ...prev, [activeDia]: { ...day, [exId]: { ...p, banda: val } } };
    });
  }, [activeDia]);

  const resetDay = useCallback(() => {
    setProgress(prev => { const n = { ...prev }; delete n[activeDia]; return n; });
  }, [activeDia]);

  // ─── Editar dia ───
  const saveEdit = useCallback((dia, turno, sesion, festivo) => {
    setCalendario(prev => prev.map(d => d.dia === dia ? { ...d, turno, sesion, festivo } : d));
    setEditingDay(null);
  }, []);

  // ─── Navegacion ───
  const openDay = useCallback((d) => { setActiveDia(d.dia); setView('session'); window.scrollTo(0, 0); }, []);
  const backToCalendar = useCallback(() => { setView('calendar'); skipTimer(); }, [skipTimer]);

  const activeDiaData = calendario.find(d => d.dia === activeDia);

  if (view === 'session' && activeDiaData) {
    return (
      <>
        <SessionView
          diaData={activeDiaData} sesionKey={activeDiaData.sesion}
          progress={progress[activeDia]} prMap={prMap}
          onBack={backToCalendar} onToggleSet={toggleSet} onLog={onLog} onLastre={onLastre} onBanda={onBanda}
          onReset={resetDay} restTimer={restTimer} onSkipTimer={skipTimer}
        />
      </>
    );
  }

  return (
    <>
      <CalendarView
        calendario={calendario} progress={progress}
        onOpenDay={openDay} onEditDay={setEditingDay}
        editMode={editMode} setEditMode={setEditMode} today={today}
        saveStatus={saveStatus}
      />
      {editingDay && <EditModal dia={editingDay} onSave={saveEdit} onClose={() => setEditingDay(null)} />}
    </>
  );
}
