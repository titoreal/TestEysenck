// src/components/HomeView.tsx
import React from 'react';
import { 
  Brain, 
  User, 
  Search, 
  BarChart3, 
  FileText, 
  Eye
} from "lucide-react";
import { TestResult } from './common/types';

interface HomeViewProps {
  setCurrentView: (view: 'home' | 'test' | 'results' | 'search' | 'subjects') => void;
  savedTests: TestResult[];
  results: TestResult | null;
  setResults: React.Dispatch<React.SetStateAction<TestResult | null>>;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  setCurrentView, 
  savedTests, 
  results,
  setResults 
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">
              Inventario de Personalidad TR - Formato A
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Sistematizado por el Dr. Tito Real - Psicólogo Industrial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setCurrentView("test")}
            className="flex items-center gap-3 p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FileText className="text-blue-600" size={24} />
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Nuevo Test</h3>
              <p className="text-gray-600 text-sm">
                Realizar evaluación de personalidad
              </p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("search")}
            className="flex items-center gap-3 p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Search className="text-green-600" size={24} />
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Buscar Test</h3>
              <p className="text-gray-600 text-sm">
                Buscar por código de sujeto
              </p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("subjects")}
            className="flex items-center gap-3 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <User className="text-purple-600" size={24} />
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">
                Sujetos Examinados
              </h3>
              <p className="text-gray-600 text-sm">
                Ver lista completa ({savedTests.length})
              </p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("results")}
            disabled={!results}
            className="flex items-center gap-3 p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BarChart3 className="text-orange-600" size={24} />
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Último Resultado</h3>
              <p className="text-gray-600 text-sm">
                Ver resultado más reciente
              </p>
            </div>
          </button>
        </div>

        {savedTests.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Tests Recientes</h3>
            <div className="space-y-2">
              {savedTests
                .slice(-3)
                .reverse()
                .map((test) => (
                  <div
                    key={test.subjectCode}
                    className="flex items-center justify-between bg-white p-3 rounded border"
                  >
                    <div>
                      <span className="font-medium">{test.subjectCode}</span>
                      <span className="text-gray-500 ml-2">
                        {new Date(test.timestamp).toLocaleDateString()}
                      </span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          test.isReliable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {test.isReliable ? "Confiable" : "No Confiable"}
                      </span>
                      {!test.isComplete && (
                        <span className="ml-2 px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          {test.completionPercentage}%
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setResults(test);
                        setCurrentView("results");
                      }}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Eye size={16} />
                      Ver
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;