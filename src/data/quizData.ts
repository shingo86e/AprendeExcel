import { Question } from '@/types/quiz';

export const quizQuestions: Question[] = [
  // ========== PREGUNTAS MÚLTIPLE CHOICE (5) ==========
  {
    id: 'mc-1',
    type: 'multiple-choice',
    level: 'basico',
    question: '¿Cuál es la función correcta para sumar un rango de celdas en Excel?',
    points: 5,
    explanation: 'SUM() es la función básica para sumar rangos de celdas en Excel.',
    options: [
      { id: 'a', text: '=SUM(A1:A10)', isCorrect: true },
      { id: 'b', text: '=ADD(A1:A10)', isCorrect: false },
      { id: 'c', text: '=TOTAL(A1:A10)', isCorrect: false },
      { id: 'd', text: '=SUMA(A1:A10)', isCorrect: false }
    ]
  },
  {
    id: 'mc-2',
    type: 'multiple-choice',
    level: 'basico',
    question: '¿Qué símbolo se usa para hacer referencia absoluta a una celda?',
    points: 5,
    explanation: 'El símbolo $ convierte una referencia en absoluta, ejemplo: $A$1',
    options: [
      { id: 'a', text: '#', isCorrect: false },
      { id: 'b', text: '$', isCorrect: true },
      { id: 'c', text: '&', isCorrect: false },
      { id: 'd', text: '%', isCorrect: false }
    ]
  },
  {
    id: 'mc-3',
    type: 'multiple-choice',
    level: 'intermedio',
    question: '¿Cuál es el resultado de la función =IF(10>5,"Verdadero","Falso")?',
    points: 7,
    explanation: 'La función IF evalúa la condición 10>5 que es verdadera, por lo tanto retorna "Verdadero".',
    options: [
      { id: 'a', text: 'Verdadero', isCorrect: true },
      { id: 'b', text: 'Falso', isCorrect: false },
      { id: 'c', text: 'Error', isCorrect: false },
      { id: 'd', text: '10', isCorrect: false }
    ]
  },
  {
    id: 'mc-4',
    type: 'multiple-choice',
    level: 'intermedio',
    question: '¿Qué función usarías para buscar un valor en una tabla y devolver un valor de otra columna?',
    points: 7,
    explanation: 'VLOOKUP (BUSCARV en español) busca un valor en la primera columna y devuelve un valor de otra columna especificada.',
    options: [
      { id: 'a', text: 'FIND', isCorrect: false },
      { id: 'b', text: 'SEARCH', isCorrect: false },
      { id: 'c', text: 'VLOOKUP', isCorrect: true },
      { id: 'd', text: 'INDEX', isCorrect: false }
    ]
  },
  {
    id: 'mc-5',
    type: 'multiple-choice',
    level: 'avanzado',
    question: '¿Cuál es la función correcta para crear una tabla dinámica programáticamente?',
    points: 10,
    explanation: 'PIVOT no es una función de Excel. Las tablas dinámicas se crean desde el menú Insertar.',
    options: [
      { id: 'a', text: '=PIVOT()', isCorrect: false },
      { id: 'b', text: '=PIVOTTABLE()', isCorrect: false },
      { id: 'c', text: 'No existe una función, se usa el menú Insertar', isCorrect: true },
      { id: 'd', text: '=DYNAMIC()', isCorrect: false }
    ]
  },

  // ========== PREGUNTAS COMPLETAR (5) ==========
  {
    id: 'fib-1',
    type: 'fill-in-blank',
    level: 'basico',
    question: 'Para calcular el promedio de las celdas A1 a A10, escribo: =_______(A1:A10)',
    points: 5,
    explanation: 'AVERAGE es la función para calcular promedios en Excel.',
    correctAnswers: ['AVERAGE', 'average', 'PROMEDIO', 'promedio'],
    caseSensitive: false
  },
  {
    id: 'fib-2',
    type: 'fill-in-blank',
    level: 'basico',
    question: 'Para contar cuántas celdas contienen números en el rango B1:B20, uso: =_______(B1:B20)',
    points: 5,
    explanation: 'COUNT cuenta solo las celdas que contienen números.',
    correctAnswers: ['COUNT', 'count', 'CONTAR', 'contar'],
    caseSensitive: false
  },
  {
    id: 'fib-3',
    type: 'fill-in-blank',
    level: 'intermedio',
    question: 'Para obtener la fecha actual, escribo: =_______()',
    points: 7,
    explanation: 'TODAY() devuelve la fecha actual sin hora.',
    correctAnswers: ['TODAY', 'today', 'HOY', 'hoy'],
    caseSensitive: false
  },
  {
    id: 'fib-4',
    type: 'fill-in-blank',
    level: 'intermedio',
    question: 'Para convertir texto a mayúsculas, uso: =_______(A1)',
    points: 7,
    explanation: 'UPPER convierte todo el texto a mayúsculas.',
    correctAnswers: ['UPPER', 'upper', 'MAYUSC', 'mayusc'],
    caseSensitive: false
  },
  {
    id: 'fib-5',
    type: 'fill-in-blank',
    level: 'avanzado',
    question: 'Para concatenar texto con salto de línea, uso: ="Línea1"&_______&"Línea2"',
    points: 10,
    explanation: 'CHAR(10) genera un salto de línea en Excel.',
    correctAnswers: ['CHAR(10)', 'char(10)', 'CARACTER(10)', 'caracter(10)'],
    caseSensitive: false
  },

  // ========== PREGUNTAS VERDADERO/FALSO (5) ==========
  {
    id: 'tf-1',
    type: 'true-false',
    level: 'basico',
    question: 'En Excel, las fórmulas siempre deben comenzar con el símbolo igual (=).',
    points: 5,
    explanation: 'Verdadero. Todas las fórmulas en Excel deben comenzar con =',
    correctAnswer: true
  },
  {
    id: 'tf-2',
    type: 'true-false',
    level: 'basico',
    question: 'Es posible tener más de una hoja en un libro de Excel.',
    points: 5,
    explanation: 'Verdadero. Excel permite múltiples hojas en un mismo libro.',
    correctAnswer: true
  },
  {
    id: 'tf-3',
    type: 'true-false',
    level: 'intermedio',
    question: 'La función MAX() puede encontrar el valor máximo en múltiples rangos no continuos.',
    points: 7,
    explanation: 'Verdadero. MAX puede trabajar con rangos separados, ejemplo: =MAX(A1:A5,C1:C5)',
    correctAnswer: true
  },
  {
    id: 'tf-4',
    type: 'true-false',
    level: 'intermedio',
    question: 'VLOOKUP puede buscar valores hacia la izquierda de la columna de búsqueda.',
    points: 7,
    explanation: 'Falso. VLOOKUP solo busca hacia la derecha. Para buscar a la izquierda se usa INDEX/MATCH.',
    correctAnswer: false
  },
  {
    id: 'tf-5',
    type: 'true-false',
    level: 'avanzado',
    question: 'Las tablas dinámicas se actualizan automáticamente cuando cambian los datos fuente.',
    points: 10,
    explanation: 'Falso. Las tablas dinámicas deben actualizarse manualmente o programarse para actualizarse.',
    correctAnswer: false
  },

  // ========== PREGUNTAS ARRASTRAR Y SOLTAR (5) ==========
  {
    id: 'dd-1',
    type: 'drag-drop',
    level: 'basico',
    question: 'Arrastra cada función a su propósito correcto:',
    points: 5,
    explanation: 'Cada función tiene un propósito específico en Excel.',
    items: [
      { id: 'sum-func', content: 'SUM()', correctZone: 'sumar' },
      { id: 'avg-func', content: 'AVERAGE()', correctZone: 'promedio' },
      { id: 'max-func', content: 'MAX()', correctZone: 'maximo' },
      { id: 'min-func', content: 'MIN()', correctZone: 'minimo' }
    ],
    zones: [
      { id: 'sumar', label: 'Sumar valores', acceptsItems: ['sum-func'] },
      { id: 'promedio', label: 'Calcular promedio', acceptsItems: ['avg-func'] },
      { id: 'maximo', label: 'Encontrar máximo', acceptsItems: ['max-func'] },
      { id: 'minimo', label: 'Encontrar mínimo', acceptsItems: ['min-func'] }
    ]
  },
  {
    id: 'dd-2',
    type: 'drag-drop',
    level: 'basico',
    question: 'Relaciona cada operador con su símbolo:',
    points: 5,
    explanation: 'Los operadores matemáticos básicos en Excel.',
    items: [
      { id: 'suma-op', content: '+', correctZone: 'suma' },
      { id: 'resta-op', content: '-', correctZone: 'resta' },
      { id: 'mult-op', content: '*', correctZone: 'multiplicacion' },
      { id: 'div-op', content: '/', correctZone: 'division' }
    ],
    zones: [
      { id: 'suma', label: 'Suma', acceptsItems: ['suma-op'] },
      { id: 'resta', label: 'Resta', acceptsItems: ['resta-op'] },
      { id: 'multiplicacion', label: 'Multiplicación', acceptsItems: ['mult-op'] },
      { id: 'division', label: 'División', acceptsItems: ['div-op'] }
    ]
  },
  {
    id: 'dd-3',
    type: 'drag-drop',
    level: 'intermedio',
    question: 'Organiza los elementos de una función VLOOKUP en el orden correcto:',
    points: 7,
    explanation: 'VLOOKUP tiene 4 parámetros en orden específico: valor_buscado, matriz_tabla, indicador_columna, ordenado.',
    items: [
      { id: 'lookup-value', content: 'Valor a buscar', correctZone: 'param1' },
      { id: 'table-array', content: 'Rango de tabla', correctZone: 'param2' },
      { id: 'col-index', content: 'Número de columna', correctZone: 'param3' },
      { id: 'range-lookup', content: 'Coincidencia exacta (FALSE)', correctZone: 'param4' }
    ],
    zones: [
      { id: 'param1', label: '1er Parámetro', acceptsItems: ['lookup-value'] },
      { id: 'param2', label: '2do Parámetro', acceptsItems: ['table-array'] },
      { id: 'param3', label: '3er Parámetro', acceptsItems: ['col-index'] },
      { id: 'param4', label: '4to Parámetro', acceptsItems: ['range-lookup'] }
    ]
  },
  {
    id: 'dd-4',
    type: 'drag-drop',
    level: 'intermedio',
    question: 'Relaciona cada función de texto con su propósito:',
    points: 7,
    explanation: 'Funciones comunes para manipular texto en Excel.',
    items: [
      { id: 'len-func', content: 'LEN()', correctZone: 'longitud' },
      { id: 'left-func', content: 'LEFT()', correctZone: 'izquierda' },
      { id: 'right-func', content: 'RIGHT()', correctZone: 'derecha' },
      { id: 'mid-func', content: 'MID()', correctZone: 'medio' }
    ],
    zones: [
      { id: 'longitud', label: 'Contar caracteres', acceptsItems: ['len-func'] },
      { id: 'izquierda', label: 'Extraer desde la izquierda', acceptsItems: ['left-func'] },
      { id: 'derecha', label: 'Extraer desde la derecha', acceptsItems: ['right-func'] },
      { id: 'medio', label: 'Extraer del medio', acceptsItems: ['mid-func'] }
    ]
  },
  {
    id: 'dd-5',
    type: 'drag-drop',
    level: 'avanzado',
    question: 'Ordena los pasos para crear una tabla dinámica:',
    points: 10,
    explanation: 'Proceso correcto para crear una tabla dinámica en Excel.',
    items: [
      { id: 'step1', content: 'Seleccionar datos fuente', correctZone: 'paso1' },
      { id: 'step2', content: 'Insertar > Tabla dinámica', correctZone: 'paso2' },
      { id: 'step3', content: 'Elegir ubicación', correctZone: 'paso3' },
      { id: 'step4', content: 'Arrastrar campos a áreas', correctZone: 'paso4' }
    ],
    zones: [
      { id: 'paso1', label: 'Paso 1', acceptsItems: ['step1'] },
      { id: 'paso2', label: 'Paso 2', acceptsItems: ['step2'] },
      { id: 'paso3', label: 'Paso 3', acceptsItems: ['step3'] },
      { id: 'paso4', label: 'Paso 4', acceptsItems: ['step4'] }
    ]
  }
];

// Utilidades para trabajar con preguntas
export const getQuestionsByLevel = (level: 'basico' | 'intermedio' | 'avanzado') => {
  return quizQuestions.filter(q => q.level === level);
};

export const getQuestionsByType = (type: 'multiple-choice' | 'fill-in-blank' | 'drag-drop' | 'true-false') => {
  return quizQuestions.filter(q => q.type === type);
};

export const shuffleQuestions = (questions: Question[]): Question[] => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getTotalPoints = () => {
  return quizQuestions.reduce((total, question) => total + question.points, 0);
};