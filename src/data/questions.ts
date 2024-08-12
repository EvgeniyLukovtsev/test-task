export type QuestionType = {
  id: number;
  question: string;
  type: "single" | "multiple" | "open" | "short";
  answers: string[];
  correctAnswer: string | string[];
};

const questionsData: QuestionType[] = [
  {
    id: 1,
    question: "Какое значение вернет следующий код 'typeof null'?",
    type: "single",
    answers: ["null", "object", "undefined", "boolean"],
    correctAnswer: "object",
  },
  {
    id: 2,
    question: "Как преобразовать строку в число?",
    type: "multiple",
    answers: ["parseInt()", "parseFloat()", "Number()", "+string"],
    correctAnswer: ["parseInt()", "parseFloat()", "Number()", "+string"],
  },
  {
    id: 3,
    question: "Что такое замыкание в JavaScript?",
    type: "open",
    answers: [],
    correctAnswer: "",
  },
  {
    id: 4,
    question:
      "Какой метод используется для добавления элемента в конец массива?",
    type: "single",
    answers: ["push", "pop", "unshift", "shift"],
    correctAnswer: "push",
  },
  {
    id: 5,
    question: "Какая разница между операторами '==' и '===' в JavaScript?",
    type: "short",
    answers: [],
    correctAnswer: "",
  },
  {
    id: 6,
    question:
      "Что из перечисленных является типом данных добавленных в TypeScript?",
    type: "multiple",
    answers: ["number", "never", "undefined", "any"],
    correctAnswer: ["never", "any"],
  },
  {
    id: 7,
    question:
      "Какой из нижеперечисленных операторов позволяет работать с деструкуризацией объекта?",
    type: "single",
    answers: ["..", "...", "[...]", "=>"],
    correctAnswer: "...",
  },
  {
    id: 8,
    question: "Какое значение вернет 5 + '5'?",
    type: "single",
    answers: ["10", "55", "NaN", "undefined"],
    correctAnswer: "55",
  },
];

export default questionsData;
