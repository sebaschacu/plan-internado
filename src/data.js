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
  gymA:       { label: 'Gym A', color: '#22c55e', icon: 'dumbbell', tipo: 'Empuje superior' },
  gymB:       { label: 'Gym B', color: '#16a34a', icon: 'dumbbell', tipo: 'Tracción superior' },
  gymC:       { label: 'Gym C', color: '#15803d', icon: 'dumbbell', tipo: 'Pierna completa' },
  gymD:       { label: 'Gym D', color: '#4ade80', icon: 'dumbbell', tipo: 'Tren superior completo' },
  calistenia: { label: 'Calistenia', color: '#a855f7', icon: 'home', tipo: 'Full body + relleno' },
  natacion:   { label: 'Natación', color: '#06b6d4', icon: 'waves', tipo: 'AM antes del turno' },
  running:    { label: 'Running Z2', color: '#06b6d4', icon: 'run', tipo: '30-45 min' },
  descanso:   { label: 'Descanso', color: '#64748b', icon: 'moon', tipo: 'Dormir' },
  libre:      { label: 'Sin sesión fija', color: '#475569', icon: 'dot', tipo: 'Opcional' },
};

// Calendario de agosto 2026 (editable por el usuario)
export const CALENDARIO_DEFAULT = [
  { dia: 1, sem: 'Sáb', turno: 'L', sesion: 'gymC' },
  { dia: 2, sem: 'Dom', turno: 'C', sesion: 'descanso' },
  { dia: 3, sem: 'Lun', turno: 'N', sesion: 'gymD' },
  { dia: 4, sem: 'Mar', turno: 'P', sesion: 'descanso' },
  { dia: 5, sem: 'Mié', turno: 'L', sesion: 'gymC' },
  { dia: 6, sem: 'Jue', turno: 'C', sesion: 'calistenia' },
  { dia: 7, sem: 'Vie', turno: 'N', sesion: 'running', festivo: true },
  { dia: 8, sem: 'Sáb', turno: 'P', sesion: 'descanso' },
  { dia: 9, sem: 'Dom', turno: 'L', sesion: 'gymD' },
  { dia: 10, sem: 'Lun', turno: 'C', sesion: 'descanso' },
  { dia: 11, sem: 'Mar', turno: 'N', sesion: 'gymC' },
  { dia: 12, sem: 'Mié', turno: 'P', sesion: 'descanso' },
  { dia: 13, sem: 'Jue', turno: 'C', sesion: 'running' },
  { dia: 14, sem: 'Vie', turno: 'C', sesion: 'calistenia' },
  { dia: 15, sem: 'Sáb', turno: 'N', sesion: 'natacion' },
  { dia: 16, sem: 'Dom', turno: 'P', sesion: 'descanso' },
  { dia: 17, sem: 'Lun', turno: 'L', sesion: 'gymD', festivo: true },
  { dia: 18, sem: 'Mar', turno: 'C', sesion: 'descanso' },
  { dia: 19, sem: 'Mié', turno: 'N', sesion: 'gymC' },
  { dia: 20, sem: 'Jue', turno: 'P', sesion: 'descanso' },
  { dia: 21, sem: 'Vie', turno: 'L', sesion: 'gymD' },
  { dia: 22, sem: 'Sáb', turno: 'C', sesion: 'calistenia' },
  { dia: 23, sem: 'Dom', turno: 'N', sesion: 'running' },
  { dia: 24, sem: 'Lun', turno: 'P', sesion: 'descanso' },
  { dia: 25, sem: 'Mar', turno: 'L', sesion: 'gymC' },
  { dia: 26, sem: 'Mié', turno: 'C', sesion: 'calistenia' },
  { dia: 27, sem: 'Jue', turno: 'N', sesion: 'natacion' },
  { dia: 28, sem: 'Vie', turno: 'P', sesion: 'descanso' },
  { dia: 29, sem: 'Sáb', turno: 'L', sesion: 'gymD' },
  { dia: 30, sem: 'Dom', turno: 'C', sesion: 'descanso' },
  { dia: 31, sem: 'Lun', turno: 'N', sesion: 'gymC' },
];

export const MES_INFO = { nombre: 'Agosto', anio: 2026, mesIdx: 7, primerDiaSemana: 6 };
// primerDiaSemana: 0=Dom, 1=Lun, ... 6=Sab. Agosto 2026 empieza en sábado (6).
// Para meses futuros, cambia este número según en qué columna cae el día 1.

export const DIAS_SEMANA = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

// ═══════════════ SESIONES DE ENTRENAMIENTO ═══════════════
// tipo especial: los ejercicios con "lastre:true" muestran input de peso de mochila

export const SESIONES = {
  gymA: {
    nombre: 'Gym A — Empuje superior', subtitulo: 'Pecho · hombro · tríceps', color: '#22c55e', duracion: '~90 min',
    chequeo: 'Prioridad: empuje horizontal (tu punto débil). Primera serie de calentamiento anormalmente pesada? Baja 10-15% y no busques récords. Graba tu banca de lado para revisar técnica.',
    ejercicios: [
      { id: 'gymA-1', nombre: 'Press banca con barra', series: 4, reps: '5-8', rir: '2', descanso: '3 min', nota: 'Tu ejercicio prioritario. Excéntrica 3s, sin rebote, escápulas retraídas. Alt: press mancuernas.' },
      { id: 'gymA-2', nombre: 'Press inclinado mancuernas 30°', series: 3, reps: '8-12', rir: '1-2', descanso: '2.5 min', nota: 'Pectoral superior. 30° no más (si subes, trabaja hombro). Alt: press inclinado máquina.' },
      { id: 'gymA-3', nombre: 'Press militar sentado mancuernas', series: 3, reps: '8-12', rir: '1-2', descanso: '2 min', nota: 'Solo 3 series: tu militar ya es fuerte. Mantenimiento de deltoides anterior.' },
      { id: 'gymA-4', nombre: 'Aperturas en polea (pec en longitud larga)', series: 3, reps: '12-15', rir: '0-1', descanso: '90s', nota: 'Pectoral en estiramiento profundo. Alt: aperturas mancuernas en banco plano.' },
      { id: 'gymA-5', nombre: 'Extensión tríceps overhead (polea)', series: 3, reps: '10-15', rir: '1', descanso: '90s', nota: 'Overhead = cabeza larga en longitud larga (Maeo 2021). Alt: extensión con mancuerna.' },
      { id: 'gymA-6', nombre: 'Elevación lateral (polea/mancuerna)', series: 3, reps: '12-20', rir: '0-1', descanso: '60s', nota: 'Deltoides medio, tu déficit. Alt: lateral en máquina.' },
    ]
  },
  gymB: {
    nombre: 'Gym B — Tracción superior', subtitulo: 'Espalda · bíceps', color: '#16a34a', duracion: '~90 min',
    chequeo: 'Prioridad: tracción vertical (tu punto débil). OJO: mide progreso de dominadas en CARGA (jalón/lastre), no en reps — vas a subir 10kg de peso corporal y las reps bajarán aunque progreses.',
    ejercicios: [
      { id: 'gymB-1', nombre: 'Dominadas (asistidas o lastradas)', series: 4, reps: '4-6', rir: '1', descanso: '3 min', nota: 'Con 5RM: haz 4x3-4 con RIR 1-2, NO al fallo. Alterna agarre pronado/neutro. Alt: jalón pesado.', lastre: true },
      { id: 'gymB-2', nombre: 'Jalón al pecho', series: 3, reps: '8-12', rir: '1-2', descanso: '2 min', nota: 'Tu vehículo de PROGRESIÓN de carga (la dominada no permite subir de a poco). Escápulas arriba, luego tira.' },
      { id: 'gymB-3', nombre: 'Remo con apoyo en pecho', series: 4, reps: '8-12', rir: '1-2', descanso: '2.5 min', nota: 'Con apoyo: quita carga lumbar (ya la tienes en RDL). Mayor retorno por serie. Alt: remo mancuerna.' },
      { id: 'gymB-4', nombre: 'Pullover en polea alta (brazo recto)', series: 2, reps: '12-15', rir: '0-1', descanso: '90s', nota: 'Dorsal sin que el bíceps limite. Solo 2 series, complemento.' },
      { id: 'gymB-5', nombre: 'Face pull o pájaro', series: 3, reps: '15-20', rir: '0-1', descanso: '75s', nota: 'Deltoides posterior + rotadores. Contrapeso a tanto empuje. Innegociable.' },
      { id: 'gymB-6', nombre: 'Curl inclinado mancuernas 45-60°', series: 3, reps: '8-12', rir: '1', descanso: '90s', nota: 'Inclinado = cabeza larga del bíceps en longitud larga. Alt: curl de pie.' },
      { id: 'gymB-7', nombre: 'Curl martillo', series: 2, reps: '10-15', rir: '0-1', descanso: '75s', nota: 'Braquial y braquiorradial (grosor del brazo). Agarre neutro, amable con el codo.' },
    ]
  },
  gymC: {
    nombre: 'Gym C — Pierna completa', subtitulo: 'Cuádriceps · isquios · glúteo · gemelo', color: '#15803d', duracion: '~90 min',
    chequeo: 'Esta sesión está en TODAS las semanas (3 y 2), carga toda tu pierna. Tu sentadilla está proporcionalmente baja — hay margen. Pon la natación este día (no running) para no interferir.',
    ejercicios: [
      { id: 'gymC-1', nombre: 'Sentadilla trasera con barra', series: 4, reps: '5-8', rir: '2', descanso: '3 min', nota: 'Profundidad mínima paralelo. RIR 2 (no al fallo, coste sistémico alto). Alt: hack squat.' },
      { id: 'gymC-2', nombre: 'Peso muerto rumano (RDL)', series: 3, reps: '6-10', rir: '2', descanso: '2.5 min', nota: 'Isquio en longitud larga. Cadera atrás, tibias verticales, barra pegada. Alt: RDL mancuernas.' },
      { id: 'gymC-3', nombre: 'Prensa 45° o búlgara', series: 3, reps: '10-15', rir: '1', descanso: '2 min', nota: 'Cuádriceps sin carga axial. Prensa en semanas de guardia, búlgara en semanas buenas.' },
      { id: 'gymC-4', nombre: 'Curl femoral SENTADO', series: 3, reps: '8-12', rir: '1', descanso: '90s', nota: 'Sentado > tumbado (Maeo 2021, evidencia directa). Complementa el RDL. Alt: tumbado si no hay.' },
      { id: 'gymC-5', nombre: 'Extensión de cuádriceps', series: 2, reps: '12-20', rir: '0-1', descanso: '90s', nota: 'Único que trabaja recto femoral con cadera extendida. Solo 2 series al final.' },
      { id: 'gymC-6', nombre: 'Gemelo de pie (rodilla extendida)', series: 3, reps: '8-12', rir: '0-1', descanso: '90s', nota: 'Pausa 2s abajo (Kassiano 2023). Gastrocnemio. Alt: gemelo en prensa.' },
      { id: 'gymC-7', nombre: 'Gemelo sentado (sóleo)', series: 2, reps: '12-20', rir: '0-1', descanso: '60s', nota: 'Rodilla flexionada = sóleo. Músculo distinto, fibra lenta, reps altas.' },
    ]
  },
  gymD: {
    nombre: 'Gym D — Tren superior completo', subtitulo: 'Todo el torso · superseries', color: '#4ade80', duracion: '~90 min',
    chequeo: 'Sesión densa con SUPERSERIES (empuje+tracción emparejados): haces el ejercicio "a", descansas 90s, el "b", descansas 90s, y repites. Ahorra tiempo sin perder rendimiento. Tus 2 puntos débiles van primero y en fresco.',
    ejercicios: [
      { id: 'gymD-1', nombre: 'S1a) Press banca con barra', series: 4, reps: '5-8', rir: '2', descanso: '90s→S1b', nota: 'SUPERSERIE con dominadas. Tu punto débil #1, primero y fresco.' },
      { id: 'gymD-2', nombre: 'S1b) Dominadas o jalón pesado', series: 4, reps: '6-10', rir: '1', descanso: '90s→S1a', nota: 'SUPERSERIE con banca. Tu punto débil #2. No comparten músculo.', lastre: true },
      { id: 'gymD-3', nombre: 'S2a) Press inclinado mancuernas', series: 3, reps: '8-12', rir: '1-2', descanso: '90s→S2b', nota: 'SUPERSERIE con remo. Pectoral superior.' },
      { id: 'gymD-4', nombre: 'S2b) Remo con apoyo en pecho', series: 3, reps: '8-12', rir: '1-2', descanso: '90s→S2a', nota: 'SUPERSERIE con press inclinado. Espalda media.' },
      { id: 'gymD-5', nombre: 'S3a) Elevación lateral', series: 3, reps: '12-20', rir: '0-1', descanso: '60s→S3b', nota: 'SUPERSERIE con face pull. Deltoides medio.' },
      { id: 'gymD-6', nombre: 'S3b) Face pull o pájaro', series: 2, reps: '15-20', rir: '0-1', descanso: '60s→S3a', nota: 'SUPERSERIE con lateral. Deltoides posterior.' },
      { id: 'gymD-7', nombre: 'S4a) Curl inclinado mancuernas', series: 3, reps: '8-12', rir: '1', descanso: '60s→S4b', nota: 'SUPERSERIE con tríceps. Bíceps en longitud larga.' },
      { id: 'gymD-8', nombre: 'S4b) Extensión tríceps overhead', series: 3, reps: '10-15', rir: '1', descanso: '60s→S4a', nota: 'SUPERSERIE con curl. Tríceps cabeza larga.' },
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
      { id: 'cal-9', nombre: 'RELLENO: Elevación lateral con banda', series: 2, reps: '15-25', rir: '0-1', descanso: '45s', nota: 'Corrige tu déficit de deltoides medio. Banda tubo bajo los pies. 4 min bien invertidos.' },
      { id: 'cal-10', nombre: 'RELLENO: Face pull con banda', series: 2, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'Corrige deltoides posterior. Banda anclada a la altura de la cara.' },
      { id: 'cal-11', nombre: 'RELLENO: Gemelo a una pierna en escalón', series: 2, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'Corrige déficit de gemelo. En un escalón, ROM completo con pausa abajo.' },
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
