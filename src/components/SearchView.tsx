// src/components/SearchView.tsx
import React from 'react';
import { Search } from "lucide-react";
import { TestResult } from './common/types';

interface SearchViewProps {
  searchCode: string;
  setSearchCode: (code: string) => void;
  savedTests: TestResult[];
  setResults: (result: TestResult) => void;
  setCurrentView: (view: 'home' | 'test' | 'results' | 'search' | 'subjects') => void;
}

const SearchView: React.FC<SearchViewProps> = ({
  searchCode,
  setSearchCode,
  savedTests,
  setResults,
  setCurrentView
}) => {
  const handleSearch = () => {
    const foundTest = savedTests.find(test => test.subjectCode === searchCode);
    
    if (foundTest) {
      setResults(foundTest);
      setCurrentView('results');
    } else {
      alert('No se encontró un test con ese código');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Search className="text-green-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Buscar Test</h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código del Sujeto
          </label>
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ingrese el código del sujeto a buscar"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSearch}
            disabled={!searchCode.trim()}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search size={20} />
            Buscar
          </button>
          <button
            onClick={() => setCurrentView("home")}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>

        {savedTests.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Últimos tests realizados:
            </h3>
            <div className="flex flex-wrap gap-2">
              {savedTests.slice(0, 5).map(test => (
                <span 
                  key={test.subjectCode}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded cursor-pointer hover:bg-blue-200"
                  onClick={() => {
                    setSearchCode(test.subjectCode);
                    handleSearch();
                  }}
                >
                  {test.subjectCode}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;