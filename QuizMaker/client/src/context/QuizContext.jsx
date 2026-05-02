import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
   const [quiz, setQuiz] = useState(null);
   const [answers, setAnswers] = useState([]);

  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes,quiz, setQuiz,answers, setAnswers }}>
      {children}
    </QuizContext.Provider>
  );
};