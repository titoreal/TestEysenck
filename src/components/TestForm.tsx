// src/components/TestForm.tsx
import React from "react";
import { testConfig } from "./common/TestConfig";
import { Answers, AppView, TestResult } from "./common/types";
import { BarChart3, Brain } from "lucide-react";
import {
  calculateScores,
  getPersonalityType,
  getRandomDescription,
} from "./common/utils";

interface TestFormProps {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  subjectCode: string;
  Duty: string;
  setSubjectCode: React.Dispatch<React.SetStateAction<string>>;
  setDuty: React.Dispatch<React.SetStateAction<string>>;
  processAttempts: number;
  setProcessAttempts: React.Dispatch<React.SetStateAction<number>>;
  setResults: React.Dispatch<React.SetStateAction<TestResult | null>>;
  setSavedTests: React.Dispatch<React.SetStateAction<TestResult[]>>;
  setCurrentView: (view: AppView) => void;
  resetTest: () => void;
}

const TestForm: React.FC<TestFormProps> = ({
  answers,
  setAnswers,
  subjectCode,
  setSubjectCode,
  Duty,
  setDuty,
  processAttempts,
  setProcessAttempts,
  setResults,
  setSavedTests,
  setCurrentView,
  resetTest,
}) => {
  const processTest = (): void => {
    if (!subjectCode) {
      alert("Debe ingresar un código de sujeto para procesar el test");
      return;
    }
    if (!Duty) {
      alert("Debe ingresar un cargo al que aplica el sujeto examinado");
      return;
    }

    const answeredCount = Object.keys(answers).length;
    const isComplete = answeredCount === 57;
    const completionPercentage = Math.round((answeredCount / 57) * 100);

    // Solo permite procesar si todas las preguntas están respondidas o si el usuario presionó el botón dos veces
    if (!isComplete && processAttempts < 1) {
      setProcessAttempts(processAttempts + 1);
      return;
    }

    const scores = calculateScores(answers);
    const personalityType = getPersonalityType(scores.E, scores.N);

    const result: TestResult = {
      subjectCode,
      Duty,
      scores,
      personalityType,
      description: getRandomDescription(personalityType),
      isReliable: scores.L <= 4,
      timestamp: new Date().toISOString(),
      isComplete,
      completionPercentage,
    };

    setResults(result);
    setSavedTests((prev) => [
      ...prev.filter((test) => test.subjectCode !== subjectCode),
      result,
    ]);

    setCurrentView("results");
    resetTest();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Test de Eysenck</h2>
        </div>

        <div className="flex gap-6 mb-6">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código del Sujeto *
            </label>
            <input
              type="text"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingrese el código del sujeto"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Puesto al que aplica *
            </label>
            <input
              type="text"
              value={Duty}
              onChange={(e) => setDuty(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingrese el cargo al que aplica"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Progreso:</strong> {Object.keys(answers).length}/57
              preguntas respondidas (
              {Math.round((Object.keys(answers).length / 57) * 100)}%)
            </p>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(Object.keys(answers).length / 57) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Array.from({ length: 57 }, (_, i) => i + 1).map((questionNum) => (
            <div key={questionNum} className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pregunta {questionNum}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question_${questionNum}`}
                    value="V"
                    checked={answers[questionNum] === "V"}
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [questionNum]: "V" }))
                    }
                    className="mr-2"
                  />
                  V (Verdadero)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question_${questionNum}`}
                    value="F"
                    checked={answers[questionNum] === "F"}
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [questionNum]: "F" }))
                    }
                    className="mr-2"
                  />
                  F (Falso)
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={processTest}
            disabled={!subjectCode}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BarChart3 size={20} />
            Procesar Test
          </button>
          <button
            onClick={() => {
              resetTest();
              setCurrentView("home");
            }}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
          {processAttempts > 0 && (
            <p className="text-sm text-yellow-800 mt-2">
              <strong>Esta seguro? :</strong> El test tiene respuestas
              incompletas
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestForm;
