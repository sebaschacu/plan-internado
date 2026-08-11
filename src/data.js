// ═══════════════ PLAN v4 · DATOS ═══════════════
// Turnos: L=libre, C=turno dia, N=noche, P=posturno
export const TURNO_INFO = {
  L: { label: 'Libre',    color: '#22c55e', bg: '#0d2818', desc: 'Día libre' },
  C: { label: 'Turno día', color: '#f59e0b', bg: '#2a1f0a', desc: '6am-6pm' },
  N: { label: 'Noche',    color: '#3b82f6', bg: '#0a1a2e', desc: '6pm-6am' },
  P: { label: 'Posturno', color: '#64748b', bg: '#1a1f26', desc: 'Salió 6am' },
};

// Sesiones: etiquetas cortas para el calendario
export const SESION_INFO = {
  gymA:  { label: 'Gym A',  color: '#22c55e', icon: 'dumbbell', tipo: 'Empuje superior' },
  gymB:  { label: 'Gym B',  color: '#16a34a', icon: 'dumbbell', tipo: 'Tracción superior' },
  gymC1: { label: 'Gym C1', color: '#15803d', icon: 'dumbbell', tipo: 'Pierna pesada' },
  gymC2: { label: 'Gym C2', color: '#65a30d', icon: 'dumbbell', tipo: 'Pierna volumen' },
  gymD:  { label: 'Gym D',  color: '#4ade80', icon: 'dumbbell', tipo: 'Torso completo' },
  calistenia: { label: 'Calistenia', color: '#a855f7', icon: 'home', tipo: 'Full body' },
  natacion:   { label: 'Natación', color: '#06b6d4', icon: 'waves', tipo: 'AM antes del turno' },
  running:    { label: 'Running', color: '#0891b2', icon: 'run', tipo: 'Z2 · 30-45 min' },
  descanso:   { label: 'Descanso', color: '#64748b', icon: 'moon', tipo: 'Dormir' },
};

// Calendario de agosto 2026 (Parte 9 del plan v4)
export const CALENDARIO_DEFAULT = [
  { dia: 1, sem: 'Sáb', turno: 'L', sesion: 'gymC1' },
  { dia: 2, sem: 'Dom', turno: 'C', sesion: 'calistenia' },
  { dia: 3, sem: 'Lun', turno: 'N', sesion: 'natacion' },
  { dia: 4, sem: 'Mar', turno: 'P', sesion: 'gymA' },
  { dia: 5, sem: 'Mié', turno: 'L', sesion: 'gymC2' },
  { dia: 6, sem: 'Jue', turno: 'C', sesion: 'calistenia' },
  { dia: 7, sem: 'Vie', turno: 'N', sesion: 'running', festivo: true },
  { dia: 8, sem: 'Sáb', turno: 'P', sesion: 'descanso' },
  { dia: 9, sem: 'Dom', turno: 'L', sesion: 'gymB' },
  { dia: 10, sem: 'Lun', turno: 'C', sesion: 'descanso' },
  { dia: 11, sem: 'Mar', turno: 'N', sesion: 'natacion' },
  { dia: 12, sem: 'Mié', turno: 'P', sesion: 'running' },
  { dia: 13, sem: 'Jue', turno: 'C', sesion: 'gymA' },
  { dia: 14, sem: 'Vie', turno: 'C', sesion: 'gymD' },
  { dia: 15, sem: 'Sáb', turno: 'N', sesion: 'gymC2' },
  { dia: 16, sem: 'Dom', turno: 'P', sesion: 'gymB' },
  { dia: 17, sem: 'Lun', turno: 'L', sesion: 'gymC1', festivo: true },
  { dia: 18, sem: 'Mar', turno: 'C', sesion: 'gymD' },
  { dia: 19, sem: 'Mié', turno: 'N', sesion: 'natacion' },
  { dia: 20, sem: 'Jue', turno: 'P', sesion: 'gymA' },
  { dia: 21, sem: 'Vie', turno: 'L', sesion: 'gymC2' },
  { dia: 22, sem: 'Sáb', turno: 'C', sesion: 'calistenia' },
  { dia: 23, sem: 'Dom', turno: 'N', sesion: 'running' },
  { dia: 24, sem: 'Lun', turno: 'P', sesion: 'descanso' },
  { dia: 25, sem: 'Mar', turno: 'L', sesion: 'gymC1' },
  { dia: 26, sem: 'Mié', turno: 'C', sesion: 'gymD' },
  { dia: 27, sem: 'Jue', turno: 'N', sesion: 'natacion' },
  { dia: 28, sem: 'Vie', turno: 'P', sesion: 'running' },
  { dia: 29, sem: 'Sáb', turno: 'L', sesion: 'gymA' },
  { dia: 30, sem: 'Dom', turno: 'C', sesion: 'calistenia' },
  { dia: 31, sem: 'Lun', turno: 'N', sesion: 'running' },
];

export const MES_INFO = { nombre: 'Agosto', anio: 2026, mesIdx: 7, primerDiaSemana: 5 };
export const DIAS_SEMANA = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

// ═══════════════ SESIONES ═══════════════
// Cada ejercicio: id, nombre, series, reps, rir, descanso, nota, [lastre], [banda]
// Biseries: bs (etiqueta de bloque, ej "BS1"), bstipo ('nc'=no competitiva, 'ant'=antagonista)

export const SESIONES = {
  gymA: {
    nombre: 'Gym A — Empuje superior', subtitulo: 'Pecho · hombro · tríceps', color: '#22c55e', duracion: '~71 min · 31 series',
    chequeo: 'Los 3 presses van primero en serie recta: aquí vive tu punto débil #1 y la señal debe ser limpia. Si el calentamiento se siente anormalmente pesado, baja 10-15% hoy.',
    ejercicios: [
      { id: 'A-1', nombre: 'Press banca con barra', series: 4, reps: '5-8', rir: '2', descanso: '3 min', nota: 'PRIORIDAD #1. Excéntrica 3s, sin rebote, escápulas retraídas. Alt: press mancuernas.' },
      { id: 'A-2', nombre: 'Press inclinado mancuernas 30°', series: 3, reps: '8-12', rir: '1-2', descanso: '2.5 min', nota: '30° no más: si subes el banco, el trabajo se va al hombro. Alt: press inclinado máquina.' },
      { id: 'A-3', nombre: 'Press militar sentado mancuernas', series: 3, reps: '8-12', rir: '1-2', descanso: '2 min', nota: 'Deltoides anterior. Mantenimiento: tu militar ya es fuerte.' },
      { id: 'A-4', nombre: 'Aperturas en polea (longitud larga)', series: 3, reps: '12-15', rir: '0-1', descanso: '45s', nota: 'Pectoral en estiramiento profundo.', bs: 'BS1', bstipo: 'nc' },
      { id: 'A-5', nombre: 'Elevación lateral en polea', series: 3, reps: '12-20', rir: '0-1', descanso: '45s', nota: 'Deltoides medio (tu déficit). Empareja con aperturas.', bs: 'BS1', bstipo: 'nc' },
      { id: 'A-6', nombre: 'Extensión tríceps overhead (polea)', series: 3, reps: '10-15', rir: '1', descanso: '60s', nota: 'Cabeza larga en longitud larga (Maeo 2021).', bs: 'BS2', bstipo: 'ant' },
      { id: 'A-7', nombre: 'Face pull o pájaro', series: 3, reps: '15-20', rir: '0-1', descanso: '60s', nota: 'Contrapeso OBLIGATORIO a 10 series de press. Salud de hombro.', bs: 'BS2', bstipo: 'ant' },
      { id: 'A-8', nombre: 'Elevación lateral mancuerna/máquina', series: 3, reps: '15-25', rir: '0-1', descanso: '45s', nota: 'Segunda dosis de deltoides medio.', bs: 'BS3', bstipo: 'nc' },
      { id: 'A-9', nombre: 'Extensión tríceps en polea (cuerda)', series: 3, reps: '12-15', rir: '0-1', descanso: '45s', nota: 'Segunda dosis de tríceps, rango alto.', bs: 'BS3', bstipo: 'nc' },
      { id: 'A-10', nombre: 'Rueda abdominal o plancha con peso', series: 3, reps: '8-12 / 30-45s', rir: '1', descanso: '60s', nota: 'Core anti-extensión.' },
    ]
  },
  gymB: {
    nombre: 'Gym B — Tracción superior', subtitulo: 'Espalda · bíceps · CERO pecho/tríceps', color: '#16a34a', duracion: '~72 min · 31 series',
    chequeo: 'Progreso de dominadas en CARGA, no en reps (vas a subir 10 kg de peso corporal). Usa correas en remo y jalón, NO en dominadas. El agarre directo va al final.',
    ejercicios: [
      { id: 'B-1', nombre: 'Dominada lastrada (o jalón pesado)', series: 4, reps: '5-8', rir: '1-2', descanso: '3 min', nota: 'PRIORIDAD #2. Nunca al fallo. Alterna pronado/neutro. SIN correas. Progresa en CARGA.', lastre: true },
      { id: 'B-2', nombre: 'Remo con apoyo en pecho', series: 4, reps: '8-12', rir: '1-2', descanso: '2.5 min', nota: 'Espalda media sin carga lumbar. CON correas. Alt: remo en máquina.' },
      { id: 'B-3', nombre: 'Jalón al pecho (agarre neutro)', series: 3, reps: '10-15', rir: '1', descanso: '2 min', nota: 'Tu vehículo de progresión fina. CON correas. Escápulas abajo, luego tira.' },
      { id: 'B-4', nombre: 'Pullover en polea alta (brazo recto)', series: 3, reps: '12-15', rir: '0-1', descanso: '45s', nota: 'Dorsal SIN que el bíceps intervenga (codo no se flexiona).', bs: 'BS1', bstipo: 'nc' },
      { id: 'B-5', nombre: 'Curl inclinado mancuernas 45-60°', series: 3, reps: '8-12', rir: '1', descanso: '45s', nota: 'Bíceps en longitud larga. Empareja con pullover.', bs: 'BS1', bstipo: 'nc' },
      { id: 'B-6', nombre: 'Pájaro o face pull', series: 3, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'Deltoides posterior.', bs: 'BS2', bstipo: 'nc' },
      { id: 'B-7', nombre: 'Curl martillo', series: 3, reps: '10-15', rir: '0-1', descanso: '45s', nota: 'Braquial y braquiorradial. Si el agarre limita, usa polea agarre neutro.', bs: 'BS2', bstipo: 'nc' },
      { id: 'B-8', nombre: 'Encogimiento mancuernas/polea', series: 3, reps: '10-15', rir: '0-1', descanso: '45s', nota: 'Trapecio.', bs: 'BS3', bstipo: 'nc' },
      { id: 'B-9', nombre: 'Rueda abdominal o plancha', series: 3, reps: '8-12 / 30-45s', rir: '1', descanso: '45s', nota: 'Core. Empareja con encogimiento.', bs: 'BS3', bstipo: 'nc' },
      { id: 'B-10', nombre: 'Dead hang o farmer\u2019s hold', series: 2, reps: '30-60s', rir: '—', descanso: '60s', nota: 'AGARRE directo. Va al final, nunca al principio.' },
    ]
  },
  gymC1: {
    nombre: 'Gym C1 — Pierna pesada', subtitulo: 'Solo días L · CERO torso', color: '#15803d', duracion: '~70 min · 28 series',
    chequeo: 'Sentadilla pesada SOLO en día libre — nunca antes de guardia nocturna de 12h de pie. RIR 2 en sentadilla, nunca al fallo (coste sistémico alto).',
    ejercicios: [
      { id: 'C1-1', nombre: 'Sentadilla trasera con barra', series: 4, reps: '5-8', rir: '2', descanso: '3 min', nota: 'Prioridad del día. Profundidad mínimo paralelo. Alt: hack squat.' },
      { id: 'C1-2', nombre: 'Peso muerto rumano', series: 3, reps: '6-10', rir: '2', descanso: '2.5 min', nota: 'Isquio en longitud larga. Cadera atrás, tibias verticales, barra pegada.' },
      { id: 'C1-3', nombre: 'Hip thrust con barra', series: 3, reps: '8-12', rir: '1-2', descanso: '2 min', nota: 'NUEVO v4. Glúteo en acortamiento máximo. Pausa 1s arriba, costillas abajo.' },
      { id: 'C1-4', nombre: 'Prensa 45°', series: 3, reps: '10-15', rir: '1', descanso: '90s', nota: 'Cuádriceps. Empareja con curl femoral.', bs: 'BS1', bstipo: 'ant' },
      { id: 'C1-5', nombre: 'Curl femoral SENTADO', series: 3, reps: '8-12', rir: '1', descanso: '75s', nota: 'Sentado > tumbado (Maeo 2021). Antagonista de la prensa.', bs: 'BS1', bstipo: 'ant' },
      { id: 'C1-6', nombre: 'Extensión de cuádriceps', series: 3, reps: '12-20', rir: '0-1', descanso: '45s', nota: 'Recto femoral con cadera extendida.', bs: 'BS2', bstipo: 'nc' },
      { id: 'C1-7', nombre: 'Gemelo sentado (sóleo)', series: 3, reps: '12-20', rir: '0-1', descanso: '45s', nota: 'Sóleo. Empareja con extensión.', bs: 'BS2', bstipo: 'nc' },
      { id: 'C1-8', nombre: 'Gemelo de pie (rodilla extendida)', series: 3, reps: '8-12', rir: '0-1', descanso: '45s', nota: 'Gastrocnemio. Pausa 2s abajo (Kassiano 2023).', bs: 'BS3', bstipo: 'nc' },
      { id: 'C1-9', nombre: 'Abductor en máquina', series: 3, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'Glúteo medio, estabiliza la rodilla. Empareja con gemelo de pie.', bs: 'BS3', bstipo: 'nc' },
    ]
  },
  gymC2: {
    nombre: 'Gym C2 — Pierna volumen', subtitulo: 'Apta día N · CERO torso · sin barra a la espalda', color: '#65a30d', duracion: '~66 min · 28 series',
    chequeo: 'Sin barra pesada sobre la espalda. Para entrenar 10-11am y llegar funcional a la guardia de las 18h. Come bien y siesta 14-16h.',
    ejercicios: [
      { id: 'C2-1', nombre: 'Prensa 45°', series: 4, reps: '10-15', rir: '1-2', descanso: '2.5 min', nota: 'Motor del día. Pies a media altura, ROM completo sin despegar lumbar.' },
      { id: 'C2-2', nombre: 'Peso muerto rumano con mancuernas', series: 3, reps: '8-12', rir: '2', descanso: '2 min', nota: 'Mismo patrón que RDL barra, sin carga axial.' },
      { id: 'C2-3', nombre: 'Hip thrust', series: 3, reps: '8-12', rir: '1-2', descanso: '2 min', nota: 'NUEVO v4. Glúteo directo. Pausa 1s arriba.' },
      { id: 'C2-4', nombre: 'Búlgara o zancada con mancuernas', series: 3, reps: '10-12/pierna', rir: '2', descanso: '90s', nota: 'Unilateral. Empareja con curl femoral.', bs: 'BS1', bstipo: 'ant' },
      { id: 'C2-5', nombre: 'Curl femoral SENTADO', series: 3, reps: '8-12', rir: '1', descanso: '75s', nota: 'Antagonista de la búlgara.', bs: 'BS1', bstipo: 'ant' },
      { id: 'C2-6', nombre: 'Hiperextensión 45°', series: 3, reps: '12-15', rir: '1', descanso: '60s', nota: 'NUEVO v4. Empuja con glúteo, no lumbar. Sube isquios a 10.2 series/sem.', bs: 'BS2', bstipo: 'nc' },
      { id: 'C2-7', nombre: 'Gemelo sentado (sóleo)', series: 3, reps: '12-20', rir: '0-1', descanso: '45s', nota: 'Sóleo. Empareja con hiperextensión.', bs: 'BS2', bstipo: 'nc' },
      { id: 'C2-8', nombre: 'Gemelo de pie (rodilla extendida)', series: 3, reps: '8-12', rir: '0-1', descanso: '45s', nota: 'Gastrocnemio. Pausa 2s abajo.', bs: 'BS3', bstipo: 'nc' },
      { id: 'C2-9', nombre: 'Abductor en máquina', series: 3, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'Glúteo medio. Empareja con gemelo de pie.', bs: 'BS3', bstipo: 'nc' },
    ]
  },
  gymD: {
    nombre: 'Gym D — Torso completo', subtitulo: 'Empuje + tracción · sesión de equilibrio', color: '#4ade80', duracion: '~61 min · 26 series',
    chequeo: 'La única sesión donde empuje y tracción conviven a propósito: mantiene alta la frecuencia de tus 2 puntos débiles. En ciclos alternos, cambia press inclinado por press militar sentado.',
    ejercicios: [
      { id: 'D-1', nombre: 'Press banca con barra', series: 4, reps: '5-8', rir: '2', descanso: '2.5 min', nota: 'Serie recta. Punto débil #1.' },
      { id: 'D-2', nombre: 'Dominada o jalón pesado', series: 4, reps: '6-10', rir: '1', descanso: '2.5 min', nota: 'Serie recta. SIN correas en dominada / CON en jalón. Punto débil #2.', lastre: true },
      { id: 'D-3', nombre: 'Press inclinado mancuernas 30°', series: 3, reps: '8-12', rir: '1-2', descanso: '90s', nota: 'Pectoral superior. Empareja con remo (antagonista).', bs: 'BS1', bstipo: 'ant' },
      { id: 'D-4', nombre: 'Remo con apoyo en pecho', series: 3, reps: '8-12', rir: '1-2', descanso: '90s', nota: 'Espalda media. Antagonista del press inclinado.', bs: 'BS1', bstipo: 'ant' },
      { id: 'D-5', nombre: 'Elevación lateral', series: 3, reps: '12-20', rir: '0-1', descanso: '45s', nota: 'Deltoides medio. Empareja con curl.', bs: 'BS2', bstipo: 'nc' },
      { id: 'D-6', nombre: 'Curl inclinado mancuernas', series: 3, reps: '8-12', rir: '1', descanso: '45s', nota: 'Bíceps en longitud larga.', bs: 'BS2', bstipo: 'nc' },
      { id: 'D-7', nombre: 'Face pull o pájaro', series: 3, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'Deltoides posterior. Empareja con tríceps.', bs: 'BS3', bstipo: 'nc' },
      { id: 'D-8', nombre: 'Extensión tríceps overhead', series: 3, reps: '10-15', rir: '1', descanso: '45s', nota: 'Cabeza larga del tríceps.', bs: 'BS3', bstipo: 'nc' },
    ]
  },
  calistenia: {
    nombre: 'Calistenia Full Body', subtitulo: 'Días C tarde · sostiene tu frecuencia', color: '#a855f7', duracion: '40-45 min',
    chequeo: 'NO es relleno: duplica la frecuencia de tus puntos débiles (pecho/espalda a 1.8x/sem). Progresa por DIFICULTAD (escalera), no por banda. Elige nivel de pierna según distancia a tu día de pierna.',
    ejercicios: [
      { id: 'CAL-1', nombre: 'Dominadas (nivel según escalera)', series: 3, reps: 'máx − 2', rir: '2', descanso: '2 min', nota: 'Serie recta. Escalera: neutro→pronado→pausa→ancho→una y media.' },
      { id: 'CAL-2', nombre: 'Fondos en paralelas (nivel escalera)', series: 3, reps: 'máx − 2', rir: '2', descanso: '2 min', nota: 'Serie recta. Escalera: banco→banda→completo→pausa→excéntrica 3s.' },
      { id: 'CAL-3', nombre: 'Flexiones (nivel según escalera)', series: 3, reps: 'máx − 2', rir: '2', descanso: '45s', nota: 'Escalera: rodillas→estándar→diamante→declinada→arquero.', bs: 'BS1', bstipo: 'nc' },
      { id: 'CAL-4', nombre: 'Bloque de pierna (ver nivel)', series: 3, reps: 'según nivel', rir: '2', descanso: '45s', nota: 'COMPLETO (48h+): búlgara 12-15/pierna. REDUCIDO (24h): puente 15-20. MÍNIMO (mañana pierna): movilidad.', bs: 'BS1', bstipo: 'nc' },
      { id: 'CAL-5', nombre: 'Remo con banda tubo o invertido', series: 3, reps: '12-15', rir: '1', descanso: '45s', nota: 'Espalda. Empareja con gemelo.', bs: 'BS2', bstipo: 'nc' },
      { id: 'CAL-6', nombre: 'Gemelo a una pierna en escalón', series: 3, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'ROM completo con pausa abajo.', bs: 'BS2', bstipo: 'nc' },
      { id: 'CAL-7', nombre: 'Elevación lateral con banda', series: 3, reps: '15-25', rir: '0-1', descanso: '40s', nota: 'Deltoides medio. Empareja con plancha.', bs: 'BS3', bstipo: 'nc' },
      { id: 'CAL-8', nombre: 'Plancha o hollow hold', series: 3, reps: '30-45s', rir: '1', descanso: '40s', nota: 'Core.', bs: 'BS3', bstipo: 'nc' },
      { id: 'CAL-9', nombre: 'Face pull con banda', series: 2, reps: '15-20', rir: '0-1', descanso: '40s', nota: 'Rotadores. Empareja con puente.', bs: 'BS4', bstipo: 'nc' },
      { id: 'CAL-10', nombre: 'Puente de glúteo a una pierna', series: 2, reps: '12-15', rir: '1', descanso: '40s', nota: 'Glúteo. Empareja con face pull.', bs: 'BS4', bstipo: 'nc' },
    ]
  },
  natacion: {
    nombre: 'Natación', subtitulo: 'AM antes del turno · 7am', color: '#06b6d4', duracion: '45-60 min',
    chequeo: 'Impacto cero, patrón distinto: puede ir cerca de la pierna sin interferir. Modalidad aeróbica ideal.',
    ejercicios: [
      { id: 'NAT-1', nombre: 'Calentamiento', series: 1, reps: '8-10 min', rir: '—', descanso: '—', nota: 'Estilo libre suave + técnica.' },
      { id: 'NAT-2', nombre: 'Bloque técnico', series: 4, reps: '50m', rir: '—', descanso: '20s', nota: 'Drills: catch-up, patada lateral.' },
      { id: 'NAT-3', nombre: 'Nado continuo Z2', series: 1, reps: '20-30 min', rir: '—', descanso: '—', nota: 'Ritmo conversacional.' },
      { id: 'NAT-4', nombre: 'Vuelta a la calma', series: 1, reps: '5 min', rir: '—', descanso: '—', nota: 'Nado lento + flotación.' },
    ]
  },
  running: {
    nombre: 'Running Z2', subtitulo: 'Base aeróbica', color: '#0891b2', duracion: '40-55 min',
    chequeo: 'NUNCA el día antes ni después de C1/C2 (pierna). Días N: siempre por la mañana, nunca a las 5pm antes de guardia. Z2 = 60-70% FC máx, test de conversación.',
    ejercicios: [
      { id: 'RUN-1', nombre: 'Calentamiento', series: 1, reps: '8 min', rir: '—', descanso: '—', nota: 'Movilidad + caminar a trote.' },
      { id: 'RUN-2', nombre: 'Z2 continuo', series: 1, reps: '30-45 min', rir: '—', descanso: '—', nota: '60-70% FC máx. Si no puedes hablar, no es Z2.' },
      { id: 'RUN-3', nombre: 'Vuelta a la calma', series: 1, reps: '5 min', rir: '—', descanso: '—', nota: 'Trote suave a caminata.' },
    ]
  },
  descanso: {
    nombre: 'Descanso', subtitulo: 'Recuperación sagrada', color: '#64748b', duracion: 'Día completo',
    chequeo: 'El sueño es tu factor limitante real. Los posturnos son sagrados para dormir. La constancia y el superávit sostenido pesan más que cualquier detalle de la rutina.',
    ejercicios: []
  },
};
