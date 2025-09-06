// src/components/SubjectsView.tsx
import React from 'react';
import { User, Trash2, Eye, FileText } from "lucide-react";
import { TestResult } from './common/types';

interface SubjectsViewProps {
  savedTests: TestResult[];
  setResults: (result: TestResult) => void;
  setCurrentView: (view: 'home' | 'test' | 'results' | 'search' | 'subjects') => void;
  deleteTest: (code: string) => void;
  generatePDF: (testResult: TestResult) => void;
}

const SubjectsView: React.FC<SubjectsViewProps> = ({
  savedTests,
  setResults,
  setCurrentView,
  deleteTest,
  generatePDF
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="text-purple-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Sujetos Examinados</h2>
          <span className="ml-auto bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
            {savedTests.length} registros
          </span>
        </div>

        {savedTests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No hay tests guardados</p>
            <button
              onClick={() => setCurrentView("test")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Crear nuevo test
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confiabilidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completitud
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {savedTests.map((test) => (
                  <tr key={test.subjectCode} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {test.subjectCode}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(test.timestamp).toLocaleDateString()}
                        <br />
                        <span className="text-xs">
                          {new Date(test.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {test.personalityType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          test.isReliable
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {test.isReliable ? 'Confiable' : 'No confiable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              test.isComplete ? 'bg-blue-600' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${test.completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-500">
                          {test.completionPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setResults(test);
                            setCurrentView('results');
                          }}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                          title="Ver resultados"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => generatePDF(test)}
                          className="text-green-600 hover:text-green-900 flex items-center"
                          title="Descargar PDF"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteTest(test.subjectCode)}
                          className="text-red-600 hover:text-red-900 flex items-center"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => setCurrentView("home")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectsView;