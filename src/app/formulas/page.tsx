'use client';

import { useState } from 'react';
import { BookOpenIcon, MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';

export default function Formulas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const categorias = [
    { id: 'todas', nombre: 'Todas', count: 24 },
    { id: 'matematicas', nombre: 'Matemáticas', count: 8 },
    { id: 'texto', nombre: 'Texto', count: 6 },
    { id: 'fecha', nombre: 'Fecha y Hora', count: 5 },
    { id: 'busqueda', nombre: 'Búsqueda', count: 3 },
    { id: 'logicas', nombre: 'Lógicas', count: 2 }
  ];

  const formulas = [
    {
      id: 1,
      nombre: 'SUMA',
      categoria: 'matematicas',
      descripcion: 'Suma todos los números en un rango de celdas',
      sintaxis: '=SUMA(número1, [número2], ...)',
      ejemplo: '=SUMA(A1:A10)',
      resultado: 'Suma todos los valores del rango A1 a A10',
      nivel: 'Básico',
      archivo: 'Fórmulas y Funciones 1.xlsx',
      driveId: '1kdmF2fylxDeTPrSpDQs2vtMozDkYItm8'
    },
    {
      id: 2,
      nombre: 'PROMEDIO',
      categoria: 'matematicas',
      descripcion: 'Calcula el promedio aritmético de los números en un rango',
      sintaxis: '=PROMEDIO(número1, [número2], ...)',
      ejemplo: '=PROMEDIO(B1:B5)',
      resultado: 'Promedio de los valores en B1 a B5',
      nivel: 'Básico',
      archivo: 'Fórmulas y Funciones 1.xlsx',
      driveId: '1kdmF2fylxDeTPrSpDQs2vtMozDkYItm8'
    },
    {
      id: 3,
      nombre: 'CONTAR',
      categoria: 'matematicas',
      descripcion: 'Cuenta el número de celdas que contienen números',
      sintaxis: '=CONTAR(valor1, [valor2], ...)',
      ejemplo: '=CONTAR(C1:C20)',
      resultado: 'Cuenta las celdas con números en C1 a C20',
      nivel: 'Básico',
      archivo: 'Fórmulas y Funciones 1.xlsx',
      driveId: '1kdmF2fylxDeTPrSpDQs2vtMozDkYItm8'
    },
    {
      id: 4,
      nombre: 'BUSCARV',
      categoria: 'busqueda',
      descripcion: 'Busca un valor en la primera columna y devuelve un valor en la misma fila',
      sintaxis: '=BUSCARV(valor_buscado, matriz_tabla, núm_índice_col, [ordenado])',
      ejemplo: '=BUSCARV("Juan", A1:D10, 3, FALSO)',
      resultado: 'Busca "Juan" y devuelve el valor de la columna 3',
      nivel: 'Intermedio',
      archivo: 'Fórmulas y Funciones 3.xlsx',
      driveId: '1Y0eyL6rHU8wPoOq88T8gjndUlLIykmgz'
    },
    {
      id: 5,
      nombre: 'SI',
      categoria: 'logicas',
      descripcion: 'Realiza una prueba lógica y devuelve un valor si es verdadero, otro si es falso',
      sintaxis: '=SI(prueba_lógica, valor_si_verdadero, valor_si_falso)',
      ejemplo: '=SI(A1>10, "Mayor", "Menor")',
      resultado: 'Devuelve "Mayor" si A1>10, sino "Menor"',
      nivel: 'Intermedio',
      archivo: 'Fórmulas y Funciones 3.xlsx',
      driveId: '1Y0eyL6rHU8wPoOq88T8gjndUlLIykmgz'
    },
    {
      id: 6,
      nombre: 'CONCATENAR',
      categoria: 'texto',
      descripcion: 'Une varias cadenas de texto en una sola',
      sintaxis: '=CONCATENAR(texto1, [texto2], ...)',
      ejemplo: '=CONCATENAR(A1, " ", B1)',
      resultado: 'Une el contenido de A1, un espacio y B1',
      nivel: 'Intermedio',
      archivo: 'Fórmulas y Funciones 3.xlsx',
      driveId: '1Y0eyL6rHU8wPoOq88T8gjndUlLIykmgz'
    },
    {
      id: 7,
      nombre: 'FECHA',
      categoria: 'fecha',
      descripcion: 'Crea una fecha con año, mes y día específicos',
      sintaxis: '=FECHA(año, mes, día)',
      ejemplo: '=FECHA(2024, 12, 25)',
      resultado: 'Crea la fecha 25 de diciembre de 2024',
      nivel: 'Básico',
      archivo: 'Fórmulas y Funciones 2.xlsx',
      driveId: '145xKuLHTap3CmHpjb6Hm7dvgrDtEWDF_'
    },
    {
      id: 8,
      nombre: 'MAYUSC',
      categoria: 'texto',
      descripcion: 'Convierte el texto a mayúsculas',
      sintaxis: '=MAYUSC(texto)',
      ejemplo: '=MAYUSC("hola mundo")',
      resultado: 'Devuelve "HOLA MUNDO"',
      nivel: 'Básico',
      archivo: 'Fórmulas y Funciones 2.xlsx',
      driveId: '145xKuLHTap3CmHpjb6Hm7dvgrDtEWDF_'
    },
    {
      id: 9,
      nombre: 'INDICE',
      categoria: 'busqueda',
      descripcion: 'Devuelve el valor de un elemento en una tabla o matriz',
      sintaxis: '=INDICE(matriz, núm_fila, [núm_columna])',
      ejemplo: '=INDICE(A1:C10, 5, 2)',
      resultado: 'Devuelve el valor en fila 5, columna 2',
      nivel: 'Avanzado',
      archivo: 'Fórmulas y Funciones 4.xlsx',
      driveId: '1J_m1-wooHZC5ixevwuCsyf7qeaMXhC8G'
    },
    {
      id: 10,
      nombre: 'SUMAPRODUCTO',
      categoria: 'matematicas',
      descripcion: 'Multiplica matrices correspondientes y devuelve la suma de productos',
      sintaxis: '=SUMAPRODUCTO(matriz1, [matriz2], ...)',
      ejemplo: '=SUMAPRODUCTO(A1:A5, B1:B5)',
      resultado: 'Suma de productos de rangos correspondientes',
      nivel: 'Avanzado',
      archivo: 'Fórmulas y Funciones 4.xlsx',
      driveId: '1J_m1-wooHZC5ixevwuCsyf7qeaMXhC8G'
    }
  ];

  const formulasFiltradas = formulas.filter(formula => {
    const matchesSearch = formula.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formula.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || formula.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Básico':
        return 'bg-green-100 text-green-800';
      case 'Intermedio':
        return 'bg-blue-100 text-blue-800';
      case 'Avanzado':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <Navbar title="AprendeExcel - Fórmulas" icon={BookOpenIcon} currentPage="formulas" />

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Biblioteca de Fórmulas y Funciones
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Explora nuestra colección completa de fórmulas de Excel con ejemplos prácticos, 
            sintaxis detallada y archivos de ejercicios para descargar.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <p className="text-sm text-orange-800 text-center">
              <strong>📊 Fórmulas y funciones desarrolladas por TECLAB</strong><br/>
              Material didáctico y ejemplos educativos protegidos por derechos de autor.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar fórmulas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categorias.map((categoria) => (
                  <button
                    key={categoria.id}
                    onClick={() => setSelectedCategory(categoria.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === categoria.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {categoria.nombre} ({categoria.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulas Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {formulasFiltradas.map((formula) => (
              <div key={formula.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">{formula.nombre}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getNivelColor(formula.nivel)}`}>
                      {formula.nivel}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {formula.descripcion}
                  </p>

                  {/* Sintaxis */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                      Sintaxis
                    </h4>
                    <code className="block bg-gray-100 p-3 rounded-lg text-sm font-mono text-gray-800">
                      {formula.sintaxis}
                    </code>
                  </div>

                  {/* Ejemplo */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                      Ejemplo
                    </h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <code className="text-green-800 font-mono text-sm block mb-1">
                        {formula.ejemplo}
                      </code>
                      <p className="text-green-700 text-sm">
                        {formula.resultado}
                      </p>
                    </div>
                  </div>

                  {/* Archivo asociado */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                      {formula.archivo}
                    </div>
                    {formula.driveId ? (
                      <a 
                        href={`https://drive.google.com/file/d/${formula.driveId}/view?usp=sharing`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Descargar Archivo
                      </a>
                    ) : (
                      <button 
                        disabled
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                      >
                        Enlace en configuración
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results */}
          {formulasFiltradas.length === 0 && (
            <div className="text-center py-12">
              <BookOpenIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron fórmulas
              </h3>
              <p className="text-gray-600">
                Intenta con diferentes términos de búsqueda o selecciona otra categoría.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Referencia Rápida
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-gray-600">Funciones Matemáticas</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-gray-600">Funciones de Texto</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
              <div className="text-gray-600">Funciones de Fecha</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600">Funciones de Búsqueda</div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </ProtectedRoute>
  );
}