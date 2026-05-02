import { useState } from "react";
import { FiCheck } from "react-icons/fi";

export default function QuestionCard({ question, onSelect, selectedAnswer }) {
  const options = question.options;

  return (
    <div className="space-y-4">
      {/* Question Text */}
      <div className="bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl p-6">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-medium">
          Your Question
        </p>
        <h3 className="text-white text-xl font-bold leading-relaxed">
          {question.questionText}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((opt, i) => {
          const isSelected = selectedAnswer === opt;
          const label = String.fromCharCode(65 + i); // A, B, C, D

          return (
            <button
              key={i}
              onClick={() => onSelect(opt)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 active:scale-95 group
                ${isSelected
                  ? "border-lime-500/60 bg-lime-500/10 shadow-lg shadow-lime-500/10"
                  : "border-white/10 bg-slate-900/60 hover:border-lime-500/30 hover:bg-slate-900"
                }`}
            >
              {/* Option Label */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                isSelected
                  ? "bg-gradient-to-br from-lime-500 to-amber-500 text-white shadow-lg shadow-lime-500/30"
                  : "bg-slate-800 text-slate-400 group-hover:text-white border border-white/10"
              }`}>
                {isSelected ? <FiCheck className="w-4 h-4" /> : label}
              </div>

              {/* Option Text */}
              <span className={`text-sm font-medium transition-colors ${
                isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
              }`}>
                {opt}
              </span>

              {/* Selected indicator */}
              {isSelected && (
                <span className="ml-auto text-xs text-lime-400 font-semibold flex-shrink-0">
                  Selected
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}