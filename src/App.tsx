// src/App.tsx
import React, { useState } from "react";
import HomeView from "./components/HomeView";
import TestForm from "./components/TestForm";
import ResultsView from "./components/ResultsView";
import SearchView from "./components/SearchView";
import SubjectsView from "./components/SubjectsView";
import { Answers, AppView, TestResult } from "./components/common/types";
import { generatePDF } from "./components/common/utils"; // Importación añadida

const EysenckTestApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [answers, setAnswers] = useState<Answers>({});
  const [subjectCode, setSubjectCode] = useState<string>("");
  const [Duty, setDuty] = useState<string>("");
  const [results, setResults] = useState<TestResult | null>(null);
  const [savedTests, setSavedTests] = useState<TestResult[]>([]);
  const [searchCode, setSearchCode] = useState<string>("");
  const [processAttempts, setProcessAttempts] = useState<number>(0);

  const resetTest = () => {
    setAnswers({});
    setSubjectCode("");
    setDuty("");
    setResults(null);
    setProcessAttempts(0);
    setCurrentView("home");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === "home" && (
        <HomeView 
          setCurrentView={setCurrentView}
          savedTests={savedTests}
          results={results}
          setResults={setResults} // Corregido: quitada la función throw error
        />
      )}
      {currentView === "test" && (
        <TestForm
          answers={answers}
          setAnswers={setAnswers}
          subjectCode={subjectCode}
          setSubjectCode={setSubjectCode}
          Duty={Duty}
          setDuty={setDuty}
          processAttempts={processAttempts}
          setProcessAttempts={setProcessAttempts}
          setResults={setResults}
          setSavedTests={setSavedTests}
          setCurrentView={setCurrentView}
          resetTest={resetTest}
        />
      )}
      {currentView === "results" && (
        <ResultsView
          results={results}
          setCurrentView={setCurrentView}
          generatePDF={generatePDF} // Función correctamente pasada
          resetTest={resetTest}
        />
      )}
      {currentView === "search" && (
        <SearchView
          searchCode={searchCode}
          setSearchCode={setSearchCode}
          savedTests={savedTests}
          setResults={setResults}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === "subjects" && (
        <SubjectsView
          savedTests={savedTests}
          setResults={setResults}
          setCurrentView={setCurrentView}
          deleteTest={(code) => {
            setSavedTests(prev => prev.filter(test => test.subjectCode !== code));
            if (results?.subjectCode === code) setResults(null);
          }}
          generatePDF={generatePDF} // Función correctamente pasada
        />
      )}
    </div>
  );
};

export default EysenckTestApp;