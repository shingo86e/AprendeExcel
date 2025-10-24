'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpenIcon, PlayIcon, DocumentArrowDownIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [activeTab, setActiveTab] = useState('basico');

  const levels = {
    basico: {
      title: 'Nivel Básico',
      description: 'Aprende los fundamentos de Excel desde cero',
      color: 'bg-green-500',
      exercises: [
        { name: 'Ejercicios 1.xlsx', description: 'Introducción a las celdas y rangos', driveId: '1w_BagYyDljPZyR4HL1ZL7TqFSLEZHqq3' },
        { name: 'Ejercicios 2.xlsx', description: 'Formato básico y operaciones simples', driveId: '18rE0vhQ3sQn4-13M4y5-nQQIzI6uxoGz' }
      ],
      formulas: [
        { name: 'Fórmulas y Funciones 1.xlsx', description: 'SUMA, PROMEDIO, CONTAR', driveId: '1kdmF2fylxDeTPrSpDQs2vtMozDkYItm8' },
        { name: 'Fórmulas y Funciones 2.xlsx', description: 'Funciones básicas de texto y fecha', driveId: '145xKuLHTap3CmHpjb6Hm7dvgrDtEWDF_' }
      ],
      video: 'clase 1 - Nivel Básico.mp4'
    },
    intermedio: {
      title: 'Nivel Intermedio',
      description: 'Desarrolla habilidades avanzadas de análisis',
      color: 'bg-blue-500',
      exercises: [
        { name: 'Ejercicios 3.xlsx', description: 'Tablas dinámicas y gráficos', driveId: '1vbLOTosHwNzMvQaFlTJEJCUsQhEnH1LS' }
      ],
      formulas: [
        { name: 'Fórmulas y Funciones 3.xlsx', description: 'BUSCARV, SI, CONCATENAR', driveId: '1Y0eyL6rHU8wPoOq88T8gjndUlLIykmgz' }
      ],
      video: 'clase 2 - Nivel Intermedio.mp4'
    },
    avanzado: {
      title: 'Nivel Avanzado',
      description: 'Domina las técnicas más sofisticadas',
      color: 'bg-purple-500',
      exercises: [
        { name: 'Ejercicios 4.xlsx', description: 'Macros y automatización', driveId: '1c3SGipofmNIFfu69Pty7SCvdpF-kBqpT' }
      ],
      formulas: [
        { name: 'Fórmulas y Funciones 4.xlsx', description: 'Funciones avanzadas y matrices', driveId: '1J_m1-wooHZC5ixevwuCsyf7qeaMXhC8G' }
      ],
      video: 'Clase 3 - Nivel Avanzado.mp4'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">AprendeExcel</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#inicio" className="text-gray-600 hover:text-green-600 transition-colors">
                Inicio
              </Link>
              <Link href="#cursos" className="text-gray-600 hover:text-green-600 transition-colors">
                Cursos
              </Link>
              <Link href="/ejercicios" className="text-gray-600 hover:text-green-600 transition-colors">
                Ejercicios
              </Link>
              <Link href="/videos" className="text-gray-600 hover:text-green-600 transition-colors">
                Videos
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Domina Excel desde lo
            <span className="text-green-600"> Básico</span> hasta lo
            <span className="text-purple-600"> Avanzado</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Aprende Excel con ejercicios prácticos, fórmulas explicadas paso a paso y videos interactivos.
            Desde conceptos básicos hasta técnicas avanzadas de análisis de datos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ejercicios" className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors text-center">
              Comenzar Ahora
            </Link>
            <Link href="/videos" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors text-center">
              Ver Videos
            </Link>
          </div>
        </div>
      </section>

      {/* Course Levels */}
      <section id="cursos" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Elige tu Nivel de Aprendizaje
          </h3>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {Object.entries(levels).map(([key, level]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === key
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {level.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Ejercicios */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <DocumentArrowDownIcon className="h-6 w-6 text-blue-600 mr-2" />
                  <h4 className="text-xl font-semibold text-gray-900">Ejercicios Prácticos</h4>
                </div>
                <div className="space-y-3">
                  {levels[activeTab as keyof typeof levels].exercises.map((exercise, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-medium text-gray-900">{exercise.name}</h5>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                      {exercise.driveId ? (
                        <a 
                          href={`https://drive.google.com/file/d/${exercise.driveId}/view?usp=sharing`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm hover:text-blue-800 transition-colors mt-1"
                        >
                          Descargar →
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm mt-1">
                          Próximamente →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fórmulas */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <BookOpenIcon className="h-6 w-6 text-green-600 mr-2" />
                  <h4 className="text-xl font-semibold text-gray-900">Fórmulas y Funciones</h4>
                </div>
                <div className="space-y-3">
                  {levels[activeTab as keyof typeof levels].formulas.map((formula, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <h5 className="font-medium text-gray-900">{formula.name}</h5>
                      <p className="text-sm text-gray-600">{formula.description}</p>
                      {formula.driveId ? (
                        <a 
                          href={`https://drive.google.com/file/d/${formula.driveId}/view?usp=sharing`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 text-sm hover:text-green-800 transition-colors mt-1"
                        >
                          Descargar →
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm mt-1">
                          Próximamente →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Videos */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <PlayIcon className="h-6 w-6 text-purple-600 mr-2" />
                  <h4 className="text-xl font-semibold text-gray-900">Video Clase</h4>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <PlayIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h5 className="font-medium text-gray-900 mb-2">
                  {levels[activeTab as keyof typeof levels].video}
                </h5>
                <p className="text-sm text-gray-600 mb-4">
                  {levels[activeTab as keyof typeof levels].description}
                </p>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Reproducir Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Acceso Rápido a Recursos
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentArrowDownIcon className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Todos los Ejercicios</h4>
              <p className="text-gray-600 text-sm mb-4">Descarga todos los archivos de práctica</p>
              <Link href="/ejercicios" className="text-green-600 hover:text-green-800 transition-colors">
                Ver todos →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Biblioteca de Fórmulas</h4>
              <p className="text-gray-600 text-sm mb-4">Consulta rápida de funciones</p>
              <Link href="/formulas" className="text-blue-600 hover:text-blue-800 transition-colors">
                Explorar →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlayIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Todas las Clases</h4>
              <p className="text-gray-600 text-sm mb-4">Videos explicativos completos</p>
              <Link href="/videos" className="text-purple-600 hover:text-purple-800 transition-colors">
                Ver playlist →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Guía de Progreso</h4>
              <p className="text-gray-600 text-sm mb-4">Sigue tu avance paso a paso</p>
              <button className="text-orange-600 hover:text-orange-800 transition-colors">
                Mi progreso →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <ChartBarIcon className="h-8 w-8 text-green-500 mr-3" />
              <h3 className="text-2xl font-bold">AprendeExcel</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Tu plataforma completa para dominar Microsoft Excel
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Inicio
              </Link>
              <Link href="/ejercicios" className="text-gray-400 hover:text-white transition-colors">
                Ejercicios
              </Link>
              <Link href="/formulas" className="text-gray-400 hover:text-white transition-colors">
                Fórmulas
              </Link>
              <Link href="/videos" className="text-gray-400 hover:text-white transition-colors">
                Videos
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
              <div className="text-center space-y-2">
                <p>&copy; 2025 AprendeExcel. Todos los derechos reservados.</p>
                <p className="text-sm">
                  Videos, ejercicios y material de fórmulas desarrollados por <strong className="text-gray-300">TECLAB</strong>
                </p>
                <p className="text-xs">
                  El contenido educativo es propiedad intelectual de TECLAB y está protegido por derechos de autor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
