import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api/quizAPI";

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  // Handle question
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  // Handle options
  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  // Correct answer
  const handleCorrectAnswer = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  // Add question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuiz({ title, questions });
      alert("Quiz Created!");
      navigate("/quizzes");
    } catch (error) {
      alert("Error creating quiz");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10">

      {/* Background blob */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-lime-400 to-amber-400 bg-clip-text text-transparent">
            Create Quiz
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Fill in the details and add your questions below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div className="bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl p-6">
            <label className="block text-sm text-slate-400 font-medium mb-1.5">
              Quiz Title
            </label>
            <input
              type="text"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-lime-500/60 focus:bg-slate-800 transition-all"
            />
          </div>

          {/* Questions */}
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl p-6 space-y-4"
            >
              {/* Question header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-500 to-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {qIndex + 1}
                </div>
                <h3 className="font-semibold text-white">
                  Question {qIndex + 1}
                </h3>
              </div>

              {/* Question text */}
              <input
                type="text"
                placeholder="Enter your question"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-lime-500/60 focus:bg-slate-800 transition-all"
              />

              {/* Options */}
              <div className="space-y-2">
                <p className="text-xs text-slate-500 font-medium">
                  Options — select the correct answer
                </p>
                {q.options.map((opt, oIndex) => {
                  const isCorrect = q.correctAnswer === opt && opt !== "";
                  return (
                    <div
                      key={oIndex}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isCorrect
                          ? "border-lime-500/50 bg-lime-500/10"
                          : "border-white/10 bg-slate-800/40"
                      }`}
                    >
                      {/* Option label */}
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isCorrect
                          ? "bg-gradient-to-br from-lime-500 to-amber-500 text-white"
                          : "bg-slate-700 text-slate-400"
                      }`}>
                        {String.fromCharCode(65 + oIndex)}
                      </span>

                      {/* Option input */}
                      <input
                        type="text"
                        placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                        value={opt}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
                      />

                      {/* Radio + label */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          onChange={() => handleCorrectAnswer(qIndex, opt)}
                          className="accent-lime-500 w-4 h-4 cursor-pointer"
                        />
                        <span className={`text-xs font-medium ${isCorrect ? "text-lime-400" : "text-slate-500"}`}>
                          {isCorrect ? "✓ Correct" : "Correct"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Add Question */}
          <button
            type="button"
            onClick={addQuestion}
            className="w-full py-3 rounded-2xl border border-dashed border-lime-500/30 text-lime-400 hover:bg-lime-500/5 hover:border-lime-500/50 text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            + Add Question
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-lime-600 to-amber-600 hover:from-lime-500 hover:to-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-lime-500/25 transition-all active:scale-95"
          >
            Create Quiz
          </button>

        </form>
      </div>
    </div>
  );
}