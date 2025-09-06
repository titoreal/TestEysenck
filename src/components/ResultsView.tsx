// src/components/ResultsView.tsx
import React from 'react';
import { 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  FileText 
} from "lucide-react";
import { TestResult } from './common/types';

interface ResultsViewProps {
  results: TestResult | null;
  setCurrentView: (view: 'home' | 'test' | 'results' | 'search' | 'subjects') => void;
  generatePDF: (testResult: TestResult) => void;
  resetTest: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ 
  results, 
  setCurrentView, 
  generatePDF,
  resetTest
}) => {
  if (!results) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <p className="text-gray-600">No hay resultados disponibles</p>
          <button
            onClick={() => setCurrentView("home")}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="text-green-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">
            Resultados del Test
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">
              Información del Sujeto :
            </h3>
            <p>
              <strong>Código:</strong> {results.subjectCode}
            </p>
            <p>
              <strong>Cargo al que aplica: </strong> {results.Duty}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(results.timestamp).toLocaleDateString()}
            </p>
            <p>
              <strong>Hora:</strong>{" "}
              {new Date(results.timestamp).toLocaleTimeString()}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Puntajes</h3>
             <p>
                <strong>L (Mentiras):</strong> {results.scores.L}/9
              </p>
              <p>
                <strong>E (Extroversión):</strong> {results.scores.E}/24
              </p>
              <p>
                <strong>N (Neuroticismo):</strong> {results.scores.N}/24
              </p>
              <p>
                <strong>Examinador :</strong> Dr. Tito Real
              </p>
            </div>
          </div>

          <div className="mb-6">
          <div
            className={`p-4 rounded-lg flex items-center gap-2 ${
              results.isReliable
                ? "bg-green-100 border border-green-300"
                : "bg-red-100 border border-red-300"
            }`}
          >
            {results.isReliable ? (
              <CheckCircle className="text-green-600" size={20} />
            ) : (
              <XCircle className="text-red-600" size={20} />
            )}
            <span
              className={`font-semibold ${
                results.isReliable ? "text-green-800" : "text-red-800"
              }`}
            >
              {results.isReliable ? "Test Confiable" : "Test No Confiable"}
            </span>
            {!results.isReliable && (
              <span className="text-red-700 ml-2">
                (Puntaje L mayor a 4 - Posible falta de sinceridad)
              </span>
            )}
          </div>
        </div>

        {!results.isComplete && (
          <div className="mb-6">
            <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg flex items-center gap-2">
              <XCircle className="text-yellow-600" size={20} />
              <span className="font-semibold text-yellow-800">
                Test Incompleto ({results.completionPercentage}% de respuestas)
              </span>
              <span className="text-yellow-700 ml-2">
                (El test fue procesado con respuestas incompletas)
              </span>
            </div>
          </div>
        )}

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-4 text-purple-800">
            Tipo de Personalidad: {results.personalityType}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {results.description}
          </p>
          {!results.isReliable && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Nota:</strong> Aunque el test no sea confiable debido
                al puntaje en la escala de mentiras, se muestra el tipo de
                personalidad basado en las respuestas proporcionadas.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => generatePDF(results)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <FileText size={20} />
            Descargar PDF
          </button>
          <button
            onClick={() => setCurrentView("home")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Volver al Inicio
          </button>
          <button
            onClick={() => {
              resetTest();
              setCurrentView("test");
            }}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Nuevo Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;