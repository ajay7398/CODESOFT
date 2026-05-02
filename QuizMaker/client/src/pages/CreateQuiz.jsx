import { useState, useContext } from "react";
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
      await createQuiz({title,questions})
      alert("Quiz Created!");
      navigate("/quizzes");
    } catch (error) {
      alert("Error creating quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Quiz
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Quiz Title</label>
            <input
              type="text"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Questions */}
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="border p-4 rounded bg-gray-50"
            >
              <h3 className="font-semibold mb-2">
                Question {qIndex + 1}
              </h3>

              {/* Question text */}
              <input
                type="text"
                placeholder="Enter question"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(qIndex, e.target.value)
                }
                className="w-full border p-2 rounded mb-3"
              />

              {/* Options */}
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    className="flex-1 border p-2 rounded"
                  />

                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    onChange={() =>
                      handleCorrectAnswer(qIndex, opt)
                    }
                  />
                  <span className="text-sm">Correct</span>
                </div>
              ))}
            </div>
          ))}

          {/* Add Question */}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Question
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
}