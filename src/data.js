// ═══════════════ PLAN v5 · DATOS ═══════════════
// Arquitectura: algoritmo anclado al ciclo de turno L→C→N→P (microciclo 12 días)
// Turnos: L=libre, C=turno dia, N=noche, P=posturno
export const TURNO_INFO = {
  L: { label: 'Libre',    color: '#22c55e', bg: '#0d2818', desc: 'Día libre · cualquier hora' },
  C: { label: 'Turno día', color: '#f59e0b', bg: '#2a1f0a', desc: '12h · entrena tarde' },
  N: { label: 'Noche',    color: '#3b82f6', bg: '#0a1a2e', desc: 'Guardia · entrena 7-11h' },
  P: { label: 'Posturno', color: '#64748b', bg: '#1a1f26', desc: 'Tras dormir ≥5h · tarde' },
};

// Colas circulares del algoritmo v5 (una por tipo de turno, contadores independientes)
export const COLAS = {
  L: ['gymC1', 'gymA', 'gymB'],
  C: ['calistenia', 'descanso', 'calistenia'],
  N: ['running', 'gymC2', 'running'],
  P: ['natacion', 'natacion', 'gymD'],
};

// Sesiones: etiquetas cortas para el calendario
export const SESION_INFO = {
  gymC1: { label: 'Gym C1', color: '#15803d', icon: 'dumbbell', tipo: 'Pierna pesada' },
  gymC2: { label: 'Gym C2', color: '#65a30d', icon: 'dumbbell', tipo: 'Pierna volumen' },
  gymA:  { label: 'Gym A',  color: '#22c55e', icon: 'dumbbell', tipo: 'Empuje superior' },
  gymB:  { label: 'Gym B',  color: '#16a34a', icon: 'dumbbell', tipo: 'Tracción superior' },
  gymD:  { label: 'Gym D',  color: '#4ade80', icon: 'dumbbell', tipo: 'Torso completo' },
  calistenia: { label: 'Calistenia', color: '#a855f7', icon: 'home', tipo: 'Full body + gesto' },
  natacion:   { label: 'Natación', color: '#06b6d4', icon: 'waves', tipo: 'Aeróbico' },
  running:    { label: 'Running', color: '#0891b2', icon: 'run', tipo: 'Z2' },
  descanso:   { label: 'Descanso', color: '#64748b', icon: 'moon', tipo: 'Recuperación' },
};

export const CALENDARIO_DEFAULT = [
  { dia: 1, sem: 'Sáb', turno: 'L', sesion: 'gymC1' },
  { dia: 2, sem: 'Dom', turno: 'C', sesion: 'calistenia' },
  { dia: 3, sem: 'Lun', turno: 'N', sesion: 'running' },
  { dia: 4, sem: 'Mar', turno: 'P', sesion: 'natacion' },
  { dia: 5, sem: 'Mié', turno: 'L', sesion: 'gymA' },
  { dia: 6, sem: 'Jue', turno: 'C', sesion: 'descanso' },
  { dia: 7, sem: 'Vie', turno: 'N', sesion: 'gymC2', festivo: true },
  { dia: 8, sem: 'Sáb', turno: 'P', sesion: 'natacion' },
  { dia: 9, sem: 'Dom', turno: 'L', sesion: 'gymB' },
  { dia: 10, sem: 'Lun', turno: 'C', sesion: 'calistenia' },
  { dia: 11, sem: 'Mar', turno: 'N', sesion: 'running' },
  { dia: 12, sem: 'Mié', turno: 'P', sesion: 'gymD' },
  { dia: 13, sem: 'Jue', turno: 'C', sesion: 'calistenia' },
  { dia: 14, sem: 'Vie', turno: 'C', sesion: 'descanso' },
  { dia: 15, sem: 'Sáb', turno: 'N', sesion: 'running' },
  { dia: 16, sem: 'Dom', turno: 'P', sesion: 'natacion' },
  { dia: 17, sem: 'Lun', turno: 'L', sesion: 'gymC1', festivo: true },
  { dia: 18, sem: 'Mar', turno: 'C', sesion: 'calistenia' },
  { dia: 19, sem: 'Mié', turno: 'N', sesion: 'gymC2' },
  { dia: 20, sem: 'Jue', turno: 'P', sesion: 'natacion' },
  { dia: 21, sem: 'Vie', turno: 'L', sesion: 'gymA' },
  { dia: 22, sem: 'Sáb', turno: 'C', sesion: 'calistenia' },
  { dia: 23, sem: 'Dom', turno: 'N', sesion: 'running' },
  { dia: 24, sem: 'Lun', turno: 'P', sesion: 'gymD' },
  { dia: 25, sem: 'Mar', turno: 'L', sesion: 'gymB' },
  { dia: 26, sem: 'Mié', turno: 'C', sesion: 'descanso' },
  { dia: 27, sem: 'Jue', turno: 'N', sesion: 'running' },
  { dia: 28, sem: 'Vie', turno: 'P', sesion: 'natacion' },
  { dia: 29, sem: 'Sáb', turno: 'L', sesion: 'gymC1' },
  { dia: 30, sem: 'Dom', turno: 'C', sesion: 'calistenia' },
  { dia: 31, sem: 'Lun', turno: 'N', sesion: 'gymC2' },
];

export const MES_INFO = { nombre: 'Agosto', anio: 2026, mesIdx: 7, primerDiaSemana: 5 };
export const DIAS_SEMANA = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

// ═══════════════ SESIONES v5 ═══════════════
// Campos de ejercicio: id, nombre, series, reps, rir, descanso, nota
//   [nuevo:true]  = ejercicio nuevo/modificado v5 (badge 🟢)
//   [opcional:true] = ejercicio con * (se recorta sin culpa)
//   [lastre:true] = registro de carga en mochila/cinturón
//   [acarreo:true] = registro de distancia + carga
//   [iso:true]    = registro de segundos (isométrico)
//   [bs:'BS1', bstipo:'nc'|'ant'] = biserie

export const SESIONES = {
  gymC1: {
    nombre: 'Gym C1 — Pierna pesada', subtitulo: 'Día L · CERO torso', color: '#15803d',
    duracion: '~110 min · 31 series (25 recortada)',
    chequeo: 'Sentadilla pesada SOLO en día libre, nunca antes de guardia. Sem 1-3: Zercher y acarreos DELIBERADAMENTE LIGEROS, deben sentirse fáciles. Regla: Prensa* O Extensión*, nunca ambas (techo 10 series de cuádriceps).',
    ejercicios: [
      { id: 'C1-1', nombre: 'Sentadilla trasera con barra', series: 4, reps: '5-8', rir: '2', descanso: '3 min', nota: 'Prioridad del día. Profundidad mínimo paralelo. Alt: hack squat.' },
      { id: 'C1-2', nombre: 'Sentadilla Zercher', series: 3, reps: '6-8', rir: '2-3', descanso: '2.5 min', nota: 'Barra en pliegue del codo, pegada al pecho. Codos SIEMPRE contra costillas. Busca el patrón, no la carga. Usa pad.', nuevo: true, lastre: true },
      { id: 'C1-3', nombre: 'Peso muerto rumano', series: 3, reps: '6-10', rir: '2', descanso: '2.5 min', nota: 'Isquio en longitud larga. Cadera atrás, tibias verticales, barra pegada al muslo. NUNCA se recorta este.' },
      { id: 'C1-4', nombre: 'Hip thrust con barra', series: 3, reps: '8-12', rir: '1-2', descanso: '2 min', nota: 'Glúteo en acortamiento máximo. Pausa 1s arriba, costillas abajo.', opcional: true },
      { id: 'C1-5', nombre: 'Prensa 45°', series: 3, reps: '10-15', rir: '1', descanso: '90s', nota: 'Cuádriceps. Empareja con curl femoral. NO si haces extensión.', opcional: true, bs: 'BS1', bstipo: 'ant' },
      { id: 'C1-6', nombre: 'Curl femoral SENTADO', series: 3, reps: '8-12', rir: '1', descanso: '75s', nota: 'Sentado > tumbado. Antagonista de la prensa.', bs: 'BS1', bstipo: 'ant' },
      { id: 'C1-7', nombre: 'Extensión de cuádriceps', series: 3, reps: '12-20', rir: '0-1', descanso: '45s', nota: 'Recto femoral con cadera extendida. NO si haces prensa.', opcional: true, bs: 'BS2', bstipo: 'nc' },
      { id: 'C1-8', nombre: 'Gemelo sentado (sóleo)', series: 3, reps: '12-20', rir: '0-1', descanso: '45s', nota: 'Sóleo. Empareja con extensión.', bs: 'BS2', bstipo: 'nc' },
      { id: 'C1-9', nombre: 'Gemelo de pie (rodilla extendida)', series: 3, reps: '8-12', rir: '0-1', descanso: '45s', nota: 'Gastrocnemio. Pausa 2s abajo.', bs: 'BS3', bstipo: 'nc' },
      { id: 'C1-10', nombre: 'Abductor en máquina', series: 3, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'Glúteo medio, estabiliza rodilla. Empareja con gemelo de pie.', bs: 'BS3', bstipo: 'nc' },
    ]
  },
  gymA: {
    nombre: 'Gym A — Empuje superior', subtitulo: 'Pecho · hombro · tríceps · anti-rotación', color: '#22c55e',
    duracion: '~90 min · 31 series (28 recortada)',
    chequeo: 'Los presses van primero: aquí vive tu punto débil #1 y la señal debe ser limpia. Si el calentamiento se siente anormalmente pesado, baja 10-15% hoy.',
    ejercicios: [
      { id: 'A-1', nombre: 'Press banca con barra', series: 4, reps: '5-8', rir: '2', descanso: '3 min', nota: 'PRIORIDAD #1. Excéntrica 3s, sin rebote, escápulas retraídas. Alt: press mancuernas.' },
      { id: 'A-2', nombre: 'Press inclinado mancuernas 30°', series: 3, reps: '8-12', rir: '1-2', descanso: '2.5 min', nota: '30° no más: si subes el banco, el trabajo se va al hombro.' },
      { id: 'A-3', nombre: 'Press militar sentado mancuernas', series: 3, reps: '8-12', rir: '1-2', descanso: '2 min', nota: 'Deltoides anterior. Mantenimiento: no esperes progresión aquí.', opcional: true },
      { id: 'A-4', nombre: 'Pallof press', series: 3, reps: '10-12/lado', rir: '1', descanso: '45s', nota: 'Core ANTI-ROTACIÓN. Banda/polea al pecho, empuja recto, no dejes que el torso gire ni un grado. Sem 1-4 en serie recta.', nuevo: true },
      { id: 'A-5', nombre: 'Aperturas en polea (longitud larga)', series: 3, reps: '12-15', rir: '0-1', descanso: '45s', nota: 'Pectoral en estiramiento profundo.', bs: 'BS1', bstipo: 'nc' },
      { id: 'A-6', nombre: 'Elevación lateral en polea', series: 3, reps: '12-20', rir: '0-1', descanso: '45s', nota: 'Deltoides medio (tu déficit). Empareja con aperturas.', bs: 'BS1', bstipo: 'nc' },
      { id: 'A-7', nombre: 'Extensión tríceps overhead (polea)', series: 3, reps: '10-15', rir: '1', descanso: '60s', nota: 'Cabeza larga en longitud larga.', bs: 'BS2', bstipo: 'ant' },
      { id: 'A-8', nombre: 'Face pull o pájaro', series: 3, reps: '15-20', rir: '0-1', descanso: '60s', nota: 'Contrapeso OBLIGATORIO a 10 series de press. Salud de hombro.', bs: 'BS2', bstipo: 'ant' },
      { id: 'A-9', nombre: 'Elevación lateral mancuerna/máquina', series: 3, reps: '15-25', rir: '0-1', descanso: '45s', nota: 'Segunda dosis de deltoides medio.', bs: 'BS3', bstipo: 'nc' },
      { id: 'A-10', nombre: 'Extensión tríceps en polea (cuerda)', series: 3, reps: '12-15', rir: '0-1', descanso: '45s', nota: 'Segunda dosis de tríceps, rango alto.', bs: 'BS3', bstipo: 'nc' },
    ]
  },
  gymC2: {
    nombre: 'Gym C2 — Pierna volumen', subtitulo: 'Día N mañana · sin barra a la espalda', color: '#65a30d',
    duracion: '~102 min · 31 series (28 recortada)',
    chequeo: 'Sin carga axial. Entrena 10-11h, siesta 14-16h, guardia 18h. Secuencia: prensa → bear hug → RDL (el bear hug necesita erectores frescos). Sem 1-3: bear hug ligero.',
    ejercicios: [
      { id: 'C2-1', nombre: 'Prensa 45°', series: 4, reps: '10-15', rir: '1-2', descanso: '2.5 min', nota: 'Motor del día. Pies a media altura, ROM completo sin despegar lumbar.' },
      { id: 'C2-2', nombre: 'Complejo bear hug', series: 3, reps: '6 sent + 30-40m', rir: '2', descanso: '2 min', nota: 'Lo más parecido a cargar a una persona. Saco/disco abrazado AL ESTERNÓN. Si baja del ombligo, para y recolócalo.', nuevo: true, acarreo: true },
      { id: 'C2-3', nombre: 'Peso muerto rumano con mancuernas', series: 3, reps: '8-12', rir: '2', descanso: '2 min', nota: 'Mismo patrón que RDL barra, sin carga axial.' },
      { id: 'C2-4', nombre: 'Hip thrust', series: 3, reps: '8-12', rir: '1-2', descanso: '2 min', nota: 'Glúteo directo. Pausa 1s arriba.', opcional: true },
      { id: 'C2-5', nombre: 'Step-up cajón alto goblet ⇄ Búlgara', series: 3, reps: '8-10/pierna', rir: '2', descanso: '90s', nota: 'ALTERNAN por sesión: una C2 step-up, la siguiente búlgara. Step-up: pie completo, empuja talón de arriba, sin impulso, bajada 3s.', nuevo: true, bs: 'BS1', bstipo: 'ant' },
      { id: 'C2-6', nombre: 'Curl femoral SENTADO', series: 3, reps: '8-12', rir: '1', descanso: '75s', nota: 'Antagonista del step-up/búlgara.', bs: 'BS1', bstipo: 'ant' },
      { id: 'C2-7', nombre: 'Hiperextensión 45°', series: 3, reps: '12-15', rir: '1', descanso: '60s', nota: 'Empuja con glúteo, no con lumbar.', bs: 'BS2', bstipo: 'nc' },
      { id: 'C2-8', nombre: 'Gemelo sentado (sóleo)', series: 3, reps: '12-20', rir: '0-1', descanso: '45s', nota: 'Sóleo. Empareja con hiperextensión.', bs: 'BS2', bstipo: 'nc' },
      { id: 'C2-9', nombre: 'Gemelo de pie (rodilla extendida)', series: 3, reps: '8-12', rir: '0-1', descanso: '45s', nota: 'Gastrocnemio. Pausa 2s abajo.', bs: 'BS3', bstipo: 'nc' },
      { id: 'C2-10', nombre: 'Abductor en máquina', series: 3, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'Glúteo medio. Empareja con gemelo de pie.', bs: 'BS3', bstipo: 'nc' },
    ]
  },
  gymB: {
    nombre: 'Gym B — Tracción superior', subtitulo: 'Espalda · bíceps · braquial', color: '#16a34a',
    duracion: '~95 min · 32 series (29 recortada)',
    chequeo: 'Progreso de dominadas en CARGA, no en reps. Correas en remo y jalón, NO en dominadas. El agarre directo va al final. El isométrico de curl es tu métrica clave: ANOTA EL TIEMPO.',
    ejercicios: [
      { id: 'B-1', nombre: 'Dominada lastrada (o jalón pesado)', series: 4, reps: '5-8', rir: '1-2', descanso: '3 min', nota: 'PRIORIDAD #2. Nunca al fallo. Alterna pronado/neutro. SIN correas. Progresa en CARGA.', lastre: true },
      { id: 'B-2', nombre: 'Remo con apoyo en pecho', series: 4, reps: '8-12', rir: '1-2', descanso: '2.5 min', nota: 'Espalda media sin carga lumbar. CON correas.' },
      { id: 'B-3', nombre: 'Jalón al pecho (agarre neutro)', series: 3, reps: '10-15', rir: '1', descanso: '2 min', nota: 'Vehículo de progresión fina. CON correas. Escápulas abajo, luego tira.' },
      { id: 'B-4', nombre: 'Suitcase carry', series: 3, reps: '30m/lado', rir: '—', descanso: '90s', nota: 'Sustituye al dead hang. Torso 100% vertical, hombros nivelados. Si te inclinas, pesa demasiado. Limitado por agarre → va al final.', nuevo: true, acarreo: true },
      { id: 'B-5', nombre: 'Pullover en polea alta (brazo recto)', series: 3, reps: '12-15', rir: '0-1', descanso: '45s', nota: 'Dorsal SIN que el bíceps intervenga.', bs: 'BS1', bstipo: 'nc' },
      { id: 'B-6', nombre: 'Curl inclinado mancuernas 45-60°', series: 3, reps: '8-12', rir: '1', descanso: '45s', nota: 'Bíceps en longitud larga. Empareja con pullover.', bs: 'BS1', bstipo: 'nc' },
      { id: 'B-7', nombre: 'Pájaro o face pull', series: 3, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'Deltoides posterior.', bs: 'BS2', bstipo: 'nc' },
      { id: 'B-8', nombre: 'Curl martillo + final isométrico 90°', series: 3, reps: '10-15', rir: '0-1', descanso: '45s', nota: 'Braquial y braquiorradial. En la ÚLTIMA serie, al terminar quédate con codos a 90° y aguanta al fallo. ANOTA EL TIEMPO.', nuevo: true, iso: true, bs: 'BS2', bstipo: 'nc' },
      { id: 'B-9', nombre: 'Encogimiento mancuernas/polea', series: 3, reps: '10-15', rir: '0-1', descanso: '45s', nota: 'Trapecio. Con suitcase y farmer\'s ya recibe carga sobrada.', opcional: true, bs: 'BS3', bstipo: 'nc' },
      { id: 'B-10', nombre: 'Rueda abdominal o plancha', series: 3, reps: '8-12 / 30-45s', rir: '1', descanso: '45s', nota: 'Core anti-extensión. Aquí vive TODO tu trabajo anti-extensión — no lo recortes.', bs: 'BS3', bstipo: 'nc' },
      { id: 'B-11', nombre: 'Dead hang', series: 1, reps: '30-45s', rir: '—', descanso: '—', nota: 'Solo descompresión de columna, no trabajo de agarre.', opcional: true },
    ]
  },
  gymD: {
    nombre: 'Gym D — Torso completo', subtitulo: 'Empuje + tracción · equilibrio', color: '#4ade80',
    duracion: '~88 min · 29 series',
    chequeo: 'Única sesión donde empuje y tracción conviven a propósito: mantiene alta la frecuencia de tus 2 puntos débiles. En ciclos alternos, cambia press inclinado por press militar.',
    ejercicios: [
      { id: 'D-1', nombre: 'Press banca con barra', series: 4, reps: '5-8', rir: '2', descanso: '2.5 min', nota: 'Serie recta. Punto débil #1.' },
      { id: 'D-2', nombre: 'Dominada o jalón pesado', series: 4, reps: '6-10', rir: '1', descanso: '2.5 min', nota: 'Serie recta. SIN correas en dominada / CON en jalón. Punto débil #2.', lastre: true },
      { id: 'D-3', nombre: 'Press inclinado mancuernas 30°', series: 3, reps: '8-12', rir: '1-2', descanso: '90s', nota: 'Pectoral superior. Empareja con remo (antagonista).', bs: 'BS1', bstipo: 'ant' },
      { id: 'D-4', nombre: 'Remo con apoyo en pecho', series: 3, reps: '8-12', rir: '1-2', descanso: '90s', nota: 'Espalda media. Antagonista del press inclinado.', bs: 'BS1', bstipo: 'ant' },
      { id: 'D-5', nombre: 'Elevación lateral', series: 3, reps: '12-20', rir: '0-1', descanso: '45s', nota: 'Deltoides medio. Empareja con curl.', bs: 'BS2', bstipo: 'nc' },
      { id: 'D-6', nombre: 'Curl inverso', series: 3, reps: '12-15', rir: '0-1', descanso: '45s', nota: 'Sustituye al curl inclinado (que vive en B). Braquiorradial + extensores del antebrazo. Muñeca firme. Usa 50-60% del peso de tu curl normal.', nuevo: true, bs: 'BS2', bstipo: 'nc' },
      { id: 'D-7', nombre: 'Face pull o pájaro', series: 3, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'Deltoides posterior. Empareja con tríceps.', bs: 'BS3', bstipo: 'nc' },
      { id: 'D-8', nombre: 'Extensión tríceps overhead', series: 3, reps: '10-15', rir: '1', descanso: '45s', nota: 'Cabeza larga del tríceps.', bs: 'BS3', bstipo: 'nc' },
      { id: 'D-9', nombre: "Farmer's walk", series: 3, reps: '40m', rir: '—', descanso: '90s', nota: 'FINISHER. Pesado de verdad. Hombros atrás y abajo, pecho alto, pasos cortos. Si puedes conversar, pesa poco. Limitado por agarre → al final.', nuevo: true, acarreo: true },
    ]
  },
  calistenia: {
    nombre: 'Calistenia Full Body', subtitulo: 'Días C tarde · sostiene frecuencia + gesto', color: '#a855f7',
    duracion: '~60 min',
    chequeo: 'NO es relleno: duplica la frecuencia de tus puntos débiles. Progresa por DIFICULTAD (escalera), no por banda. El bloque de pierna cambia de nivel según distancia a tu día de pierna. La Parte 3 (práctica real) vale más que 3 meses de gym.',
    ejercicios: [
      { id: 'CAL-1', nombre: 'Dominadas (nivel escalera)', series: 3, reps: 'máx − 2', rir: '2', descanso: '2 min', nota: 'Escalera: neutro → pronado → pausa → ancho → una y media.' },
      { id: 'CAL-2', nombre: 'Fondos en paralelas (nivel escalera)', series: 3, reps: 'máx − 2', rir: '2', descanso: '2 min', nota: 'Escalera: banco → banda → completo → pausa → excéntrica 3s.' },
      { id: 'CAL-3', nombre: 'Flexiones (nivel escalera)', series: 3, reps: 'máx − 2', rir: '2', descanso: '45s', nota: 'Escalera: rodillas → estándar → diamante → declinada → arquero.', bs: 'BS1', bstipo: 'nc' },
      { id: 'CAL-4', nombre: 'Bloque de pierna (nivel auto)', series: 3, reps: 'según nivel', rir: '2', descanso: '45s', nota: 'COMPLETO (día 10, 48h+): búlgara 12-15/pierna. REDUCIDO (día 2, 24h): puente 15-20. MÍNIMO (pierna esa mañana): movilidad.', bs: 'BS1', bstipo: 'nc' },
      { id: 'CAL-5', nombre: 'Remo con banda o invertido', series: 3, reps: '12-15', rir: '1', descanso: '45s', nota: 'Espalda. Empareja con gemelo.', bs: 'BS2', bstipo: 'nc' },
      { id: 'CAL-6', nombre: 'Gemelo a una pierna en escalón', series: 3, reps: '15-20', rir: '0-1', descanso: '45s', nota: 'ROM completo con pausa abajo.', bs: 'BS2', bstipo: 'nc' },
      { id: 'CAL-7', nombre: 'Elevación lateral con banda', series: 3, reps: '15-25', rir: '0-1', descanso: '40s', nota: 'Deltoides medio. Empareja con plancha.', bs: 'BS3', bstipo: 'nc' },
      { id: 'CAL-8', nombre: 'Plancha o hollow hold', series: 3, reps: '30-45s', rir: '1', descanso: '40s', nota: 'Core.', bs: 'BS3', bstipo: 'nc' },
      { id: 'CAL-9', nombre: 'Face pull con banda', series: 2, reps: '15-20', rir: '0-1', descanso: '40s', nota: 'Rotadores. Empareja con puente.', bs: 'BS4', bstipo: 'nc' },
      { id: 'CAL-10', nombre: 'Puente de glúteo a una pierna', series: 2, reps: '12-15', rir: '1', descanso: '40s', nota: 'Glúteo. Empareja con face pull.', bs: 'BS4', bstipo: 'nc' },
      { id: 'CAL-11', nombre: 'Práctica de carga real', series: 4, reps: '20-45s', rir: '—', descanso: '2-3 min', nota: 'PARTE 3. Levanta desde sentadilla, pégala al pecho, codos contra costillas. Vale más que 3 meses de gym. Ver protocolo.', nuevo: true, iso: true },
      { id: 'CAL-12', nombre: 'Escaleras cargando', series: 1, reps: '1 tramo', rir: '—', descanso: '2 min', nota: 'Solo cuando el bloque de 45s se sienta cómodo.', nuevo: true, opcional: true },
    ]
  },
  natacion: {
    nombre: 'Natación', subtitulo: 'Tarde tras dormir · impacto cero', color: '#06b6d4', duracion: '45-60 min',
    chequeo: 'Impacto cero, patrón motor distinto: puede ir junto a un día de pierna sin interferir. Modalidad aeróbica ideal.',
    ejercicios: [
      { id: 'NAT-1', nombre: 'Calentamiento', series: 1, reps: '8-10 min', rir: '—', descanso: '—', nota: 'Estilo libre suave + técnica.' },
      { id: 'NAT-2', nombre: 'Bloque técnico', series: 4, reps: '50m', rir: '—', descanso: '20s', nota: 'Drills: catch-up, patada lateral.' },
      { id: 'NAT-3', nombre: 'Nado continuo Z2', series: 1, reps: '20-30 min', rir: '—', descanso: '—', nota: 'Ritmo conversacional.' },
      { id: 'NAT-4', nombre: 'Vuelta a la calma', series: 1, reps: '5 min', rir: '—', descanso: '—', nota: 'Nado lento + flotación.' },
    ]
  },
  running: {
    nombre: 'Running Z2', subtitulo: 'Mañana de día N · base aeróbica', color: '#0891b2', duracion: '40-55 min',
    chequeo: 'NUNCA el día antes ni después de pierna (el algoritmo ya lo evita cambiando a natación). Días N: siempre por la mañana 7-11h, nunca a las 5pm antes de guardia. Z2 = test de conversación.',
    ejercicios: [
      { id: 'RUN-1', nombre: 'Calentamiento', series: 1, reps: '8 min', rir: '—', descanso: '—', nota: 'Movilidad + caminar a trote.' },
      { id: 'RUN-2', nombre: 'Z2 continuo', series: 1, reps: '30-45 min', rir: '—', descanso: '—', nota: '60-70% FC máx. Si no puedes hablar, no es Z2.' },
      { id: 'RUN-3', nombre: 'Vuelta a la calma', series: 1, reps: '5 min', rir: '—', descanso: '—', nota: 'Trote suave a caminata.' },
    ]
  },
  descanso: {
    nombre: 'Descanso', subtitulo: 'Recuperación', color: '#64748b', duracion: 'Día completo',
    chequeo: 'El sueño es tu factor limitante real. Si en posturno dormiste <5h, este día es descanso completo. La constancia y el superávit sostenido pesan más que cualquier detalle de la rutina.',
    ejercicios: []
  },
};
