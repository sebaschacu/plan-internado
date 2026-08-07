// ═══════════════ DATOS DEL PLAN ═══════════════

// Turnos: L=libre, C=turno dia, N=noche, P=posturno
// sesion asignada: gymA, gymB, calistenia, natacion, running, descanso
export const TURNO_INFO = {
  L: { label: 'Libre',    color: '#22c55e', bg: '#0d2818', desc: 'Día libre' },
  C: { label: 'Turno día', color: '#f59e0b', bg: '#2a1f0a', desc: '6am-6pm' },
  N: { label: 'Noche',    color: '#3b82f6', bg: '#0a1a2e', desc: '6pm-6am' },
  P: { label: 'Posturno', color: '#64748b', bg: '#1a1f26', desc: 'Salió 6am' },
};

export const SESION_INFO = {
  gymA:       { label: 'Gym Pesado A', color: '#22c55e', icon: 'dumbbell', tipo: 'Piernas + tracción' },
  gymB:       { label: 'Gym Pesado B', color: '#22c55e', icon: 'dumbbell', tipo: 'Empuje + tracción' },
  calistenia: { label: 'Calistenia', color: '#a855f7', icon: 'home', tipo: 'Full body 30-40 min' },
  natacion:   { label: 'Natación', color: '#06b6d4', icon: 'waves', tipo: 'AM antes del turno' },
  running:    { label: 'Running Z2', color: '#06b6d4', icon: 'run', tipo: '30-45 min' },
  descanso:   { label: 'Descanso', color: '#64748b', icon: 'moon', tipo: 'Dormir' },
  libre:      { label: 'Sin sesión fija', color: '#475569', icon: 'dot', tipo: 'Opcional' },
};

// Calendario de agosto 2026 (editable por el usuario)
export const CALENDARIO_DEFAULT = [
  { dia: 1,  sem: 'Sáb', turno: 'L', sesion: 'gymA' },
  { dia: 2,  sem: 'Dom', turno: 'C', sesion: 'calistenia' },
  { dia: 3,  sem: 'Lun', turno: 'N', sesion: 'running' },
  { dia: 4,  sem: 'Mar', turno: 'P', sesion: 'descanso' },
  { dia: 5,  sem: 'Mié', turno: 'L', sesion: 'gymB' },
  { dia: 6,  sem: 'Jue', turno: 'C', sesion: 'calistenia' },
  { dia: 7,  sem: 'Vie', turno: 'N', sesion: 'running', festivo: true },
  { dia: 8,  sem: 'Sáb', turno: 'P', sesion: 'descanso' },
  { dia: 9,  sem: 'Dom', turno: 'L', sesion: 'gymA' },
  { dia: 10, sem: 'Lun', turno: 'C', sesion: 'calistenia' },
  { dia: 11, sem: 'Mar', turno: 'N', sesion: 'natacion' },
  { dia: 12, sem: 'Mié', turno: 'P', sesion: 'descanso' },
  { dia: 13, sem: 'Jue', turno: 'C', sesion: 'calistenia' },
  { dia: 14, sem: 'Vie', turno: 'C', sesion: 'calistenia' },
  { dia: 15, sem: 'Sáb', turno: 'N', sesion: 'natacion' },
  { dia: 16, sem: 'Dom', turno: 'P', sesion: 'descanso' },
  { dia: 17, sem: 'Lun', turno: 'L', sesion: 'gymB', festivo: true },
  { dia: 18, sem: 'Mar', turno: 'C', sesion: 'calistenia' },
  { dia: 19, sem: 'Mié', turno: 'N', sesion: 'running' },
  { dia: 20, sem: 'Jue', turno: 'P', sesion: 'descanso' },
  { dia: 21, sem: 'Vie', turno: 'L', sesion: 'gymA' },
  { dia: 22, sem: 'Sáb', turno: 'C', sesion: 'calistenia' },
  { dia: 23, sem: 'Dom', turno: 'N', sesion: 'running' },
  { dia: 24, sem: 'Lun', turno: 'P', sesion: 'descanso' },
  { dia: 25, sem: 'Mar', turno: 'L', sesion: 'gymB' },
  { dia: 26, sem: 'Mié', turno: 'C', sesion: 'calistenia' },
  { dia: 27, sem: 'Jue', turno: 'N', sesion: 'natacion' },
  { dia: 28, sem: 'Vie', turno: 'P', sesion: 'descanso' },
  { dia: 29, sem: 'Sáb', turno: 'L', sesion: 'gymA' },
  { dia: 30, sem: 'Dom', turno: 'C', sesion: 'calistenia' },
  { dia: 31, sem: 'Lun', turno: 'N', sesion: 'running' },
];

export const MES_INFO = { nombre: 'Agosto', anio: 2026, mesIdx: 7, primerDiaSemana: 6 };
// primerDiaSemana: 0=Dom, 1=Lun, ... 6=Sab. Agosto 2026 empieza en sábado (6).
// Para meses futuros, cambia este número según en qué columna cae el día 1.

export const DIAS_SEMANA = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

// ═══════════════ SESIONES DE ENTRENAMIENTO ═══════════════
// tipo especial: los ejercicios con "lastre:true" muestran input de peso de mochila

export const SESIONES = {
  gymA: {
    nombre: 'Gym Pesado A', subtitulo: 'Piernas + tracción', color: '#22c55e', duracion: '~90 min',
    chequeo: 'Primera serie de calentamiento lenta o pesada anormal? Baja 10-15% las cargas hoy. No busques récords.',
    ejercicios: [
      { id: 'gymA-1', nombre: 'Sentadilla (Back Squat)', series: 4, reps: '5', rir: '2', descanso: '3 min', nota: 'Patrón principal. Calienta progresivo.' },
      { id: 'gymA-2', nombre: 'Peso Muerto', series: 3, reps: '4', rir: '2', descanso: '3 min', nota: 'Alterna con front squat.' },
      { id: 'gymA-3', nombre: 'Dominadas LASTRADAS', series: 4, reps: '4-6', rir: '1-2', descanso: '2.5 min', nota: 'Con mochila. El ejercicio estrella.', lastre: true },
      { id: 'gymA-4', nombre: 'Búlgaras', series: 3, reps: '8/pierna', rir: '2', descanso: '90s', nota: 'Unilateral.' },
      { id: 'gymA-5', nombre: 'Curl femoral', series: 3, reps: '10', rir: '1', descanso: '75s', nota: 'Aísla isquios.' },
      { id: 'gymA-6', nombre: 'Remo con barra', series: 3, reps: '8', rir: '2', descanso: '90s', nota: 'Tracción horizontal.' },
      { id: 'gymA-7', nombre: 'Gemelo de pie', series: 3, reps: '12', rir: '1', descanso: '60s', nota: 'Pausa abajo.' },
      { id: 'gymA-8', nombre: 'Dead hang (agarre)', series: 3, reps: '30-45s', rir: '1', descanso: '60s', nota: 'Grip + descompresión.' },
    ]
  },
  gymB: {
    nombre: 'Gym Pesado B', subtitulo: 'Empuje + tracción', color: '#22c55e', duracion: '~90 min',
    chequeo: 'Primera serie de calentamiento lenta o pesada anormal? Baja 10-15% las cargas hoy. No busques récords.',
    ejercicios: [
      { id: 'gymB-1', nombre: 'Press Banca', series: 4, reps: '5', rir: '2', descanso: '3 min', nota: 'Empuje horizontal.' },
      { id: 'gymB-2', nombre: 'Press Militar de pie', series: 3, reps: '6', rir: '2', descanso: '2.5 min', nota: 'Empuje vertical + core.' },
      { id: 'gymB-3', nombre: 'Fondos LASTRADOS', series: 4, reps: '6-8', rir: '1-2', descanso: '2.5 min', nota: 'Con mochila. Cuida profundidad del hombro.', lastre: true },
      { id: 'gymB-4', nombre: 'Jalón al pecho', series: 3, reps: '8-10', rir: '1-2', descanso: '90s', nota: 'Tracción vertical.' },
      { id: 'gymB-5', nombre: 'Press inclinado mancuernas', series: 3, reps: '10', rir: '2', descanso: '90s', nota: 'Pectoral clavicular.' },
      { id: 'gymB-6', nombre: 'Face pulls', series: 3, reps: '15', rir: '0-1', descanso: '60s', nota: 'Salud de hombro.' },
      { id: 'gymB-7', nombre: 'Curl + Extensión (superserie)', series: 3, reps: '10-12', rir: '1', descanso: '60s', nota: 'Brazos.' },
      { id: 'gymB-8', nombre: 'Rueda abdominal', series: 3, reps: '8-10', rir: '1', descanso: '60s', nota: 'Core anti-extensión.' },
    ]
  },
  calistenia: {
    nombre: 'Calistenia Full Body', subtitulo: 'FASE 1 · Fundamentos', color: '#a855f7', duracion: '30-40 min',
    chequeo: 'FASE 1 (Fundamentos): construyes tu base con banda de asistencia. Meta de esta fase: 8+ dominadas, 15+ flexiones, 8+ fondos limpios sin banda. NO uses lastre todavía. Prioriza técnica perfecta sobre cantidad.',
    ejercicios: [
      { id: 'cal-1', nombre: 'Calentamiento articular', series: 1, reps: '4-5 min', rir: '—', descanso: '—', nota: 'Círculos de hombro, muñeca, cadera, rodilla. Dead hang 20s. Band pull-apart 15 reps.' },
      { id: 'cal-2', nombre: 'Dominadas ASISTIDAS con banda', series: 4, reps: '5-8', rir: '1-2', descanso: '2 min', nota: 'Banda larga colgada de la barra, pie/rodilla dentro. Baja de asistencia cuando logres 8 limpias.', banda: true },
      { id: 'cal-3', nombre: 'Sentadilla peso corporal', series: 3, reps: '15-20', rir: '2', descanso: '75s', nota: 'Profundas, control. Cuando pases 20 fáciles, avanza a búlgara o sentadilla lenta.' },
      { id: 'cal-4', nombre: 'Fondos ASISTIDOS o en banco', series: 4, reps: '6-8', rir: '1-2', descanso: '2 min', nota: 'Banda en paralelas, o fondos en banco/silla si aún cuesta. Progresa a fondos completos.', banda: true },
      { id: 'cal-5', nombre: 'Flexiones', series: 3, reps: '8-12', rir: '1-2', descanso: '75s', nota: 'Si 12 es fácil, prueba flexión diamante o declinada. Si cuesta, apoya rodillas.' },
      { id: 'cal-6', nombre: 'Zancadas (lunges)', series: 3, reps: '10/pierna', rir: '2', descanso: '60s', nota: 'Base para el pistol squat. Control en la bajada.' },
      { id: 'cal-7', nombre: 'Remo con banda tubo', series: 3, reps: '12-15', rir: '1', descanso: '60s', nota: 'Banda tubo anclada. Tracción horizontal, equilibra las dominadas.' },
      { id: 'cal-8', nombre: 'Plancha (core)', series: 3, reps: '30-45s', rir: '1', descanso: '45s', nota: 'Cuerpo recto, glúteo y abdomen apretados. Base para L-sit y front lever.' },
    ]
  },
  natacion: {
    nombre: 'Natación', subtitulo: 'AM antes del turno · 7am', color: '#06b6d4', duracion: '45-60 min',
    chequeo: 'Interfiere poco con la fuerza. Modalidad aeróbica ideal para ti.',
    ejercicios: [
      { id: 'nat-1', nombre: 'Calentamiento', series: 1, reps: '8-10 min', rir: '—', descanso: '—', nota: 'Estilo libre suave + técnica.' },
      { id: 'nat-2', nombre: 'Bloque técnico', series: 4, reps: '50m', rir: '—', descanso: '20s', nota: 'Drills: catch-up, patada lateral.' },
      { id: 'nat-3', nombre: 'Nado continuo Z2', series: 1, reps: '20-30 min', rir: '—', descanso: '—', nota: 'Ritmo conversacional.' },
      { id: 'nat-4', nombre: 'Vuelta a la calma', series: 1, reps: '5 min', rir: '—', descanso: '—', nota: 'Nado lento + flotación.' },
    ]
  },
  running: {
    nombre: 'Running Z2', subtitulo: 'Base aeróbica', color: '#06b6d4', duracion: '40-55 min',
    chequeo: 'NUNCA el día antes ni después de piernas pesadas. Separa 24h de Gym A.',
    ejercicios: [
      { id: 'run-1', nombre: 'Calentamiento', series: 1, reps: '8 min', rir: '—', descanso: '—', nota: 'Movilidad + caminar a trote.' },
      { id: 'run-2', nombre: 'Z2 continuo', series: 1, reps: '30-45 min', rir: '—', descanso: '—', nota: '60-70% FC máx. Test de conversación.' },
      { id: 'run-3', nombre: 'Vuelta a la calma', series: 1, reps: '5 min', rir: '—', descanso: '—', nota: 'Trote suave a caminata.' },
    ]
  },
  descanso: {
    nombre: 'Descanso', subtitulo: 'Recuperación', color: '#64748b', duracion: 'Día completo',
    chequeo: 'Saliste 6am tras la noche. PRIORIDAD DORMIR. El sueño es tu factor limitante real.',
    ejercicios: []
  },
};
