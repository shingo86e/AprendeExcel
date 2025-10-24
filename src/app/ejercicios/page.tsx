'use client';

import { DocumentArrowDownIcon, FolderIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useStudentProgress, useExerciseProgress } from '@/hooks/useProgress';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';

export default function Ejercicios() {
  const { progress, loading } = useStudentProgress();
  const { markExerciseDownloaded, markExerciseCompleted } = useExerciseProgress();
  
  const handleDownload = async (ejercicio: any) => {
    await markExerciseDownloaded(ejercicio.id.toString(), ejercicio.nombre, ejercicio.nivel);
    // Abrir el archivo en una nueva pestaña
    window.open(`https://drive.google.com/file/d/${ejercicio.driveId}/view?usp=sharing`, '_blank');
  };

  const handleMarkCompleted = async (ejercicio: any) => {
    await markExerciseCompleted(ejercicio.id.toString(), ejercicio.nombre, ejercicio.nivel, 30); // 30 min estimado
  };

  const isExerciseCompleted = (ejercicioId: string) => {
    return progress?.exercises[ejercicioId]?.completed || false;
  };

  const isExerciseDownloaded = (ejercicioId: string) => {
    return progress?.exercises[ejercicioId]?.downloadedAt || false;
  };
  
  const ejercicios = [
    {
      id: 1,
      nombre: 'Ejercicios 1.xlsx',
      nivel: 'Básico',
      descripcion: 'Introducción a las celdas y rangos. Aprende a navegar por Excel, seleccionar celdas y entender la estructura básica de una hoja de cálculo.',
      temas: ['Navegación básica', 'Selección de celdas', 'Tipos de datos', 'Formato de celdas'],
      color: 'green',
      driveId: '1w_BagYyDljPZyR4HL1ZL7TqFSLEZHqq3'
    },
    {
      id: 2,
      nombre: 'Ejercicios 2.xlsx',
      nivel: 'Básico',
      descripcion: 'Formato básico y operaciones simples. Practica el formato de texto, números y realiza tus primeros cálculos.',
      temas: ['Formato de texto', 'Formato numérico', 'Operaciones básicas', 'Autocompletar'],
      color: 'green',
      driveId: '18rE0vhQ3sQn4-13M4y5-nQQIzI6uxoGz'
    },
    {
      id: 3,
      nombre: 'Ejercicios 3.xlsx',
      nivel: 'Intermedio',
      descripcion: 'Tablas dinámicas y gráficos. Aprende a crear visualizaciones y análisis de datos más complejos.',
      temas: ['Tablas dinámicas', 'Gráficos', 'Filtros avanzados', 'Ordenamiento'],
      color: 'blue',
      driveId: '1vbLOTosHwNzMvQaFlTJEJCUsQhEnH1LS'
    },
    {
      id: 4,
      nombre: 'Ejercicios 4.xlsx',
      nivel: 'Avanzado',
      descripcion: 'Macros y automatización. Domina la automatización de tareas y programación en Excel.',
      temas: ['Grabación de macros', 'VBA básico', 'Automatización', 'Funciones personalizadas'],
      color: 'purple',
      driveId: '1c3SGipofmNIFfu69Pty7SCvdpF-kBqpT'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-200',
        button: 'bg-green-600 hover:bg-green-700'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <Navbar title="AprendeExcel - Ejercicios" icon={FolderIcon} currentPage="ejercicios" />

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ejercicios Prácticos de Excel
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Descarga y practica con nuestros ejercicios diseñados paso a paso. 
            Cada archivo incluye instrucciones detalladas y soluciones.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <p className="text-sm text-green-800 text-center">
              <strong>📝 Ejercicios desarrollados por TECLAB</strong><br/>
              Material de práctica y planillas educativas protegidas por derechos de autor.
            </p>
          </div>
        </div>
      </section>

      {/* Ejercicios Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {ejercicios.map((ejercicio) => {
              const colorClasses = getColorClasses(ejercicio.color);
              return (
                <div key={ejercicio.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Header del ejercicio */}
                  <div className={`${colorClasses.bg} ${colorClasses.border} border-b px-6 py-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DocumentArrowDownIcon className="h-6 w-6 text-gray-600 mr-3" />
                        <h3 className="text-xl font-bold text-gray-900">{ejercicio.nombre}</h3>
                        {isExerciseCompleted(ejercicio.id.toString()) && (
                          <CheckCircleIcon className="h-6 w-6 text-green-600 ml-2" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses.bg} ${colorClasses.text}`}>
                          {ejercicio.nivel}
                        </span>
                        {isExerciseCompleted(ejercicio.id.toString()) && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            Completado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contenido del ejercicio */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {ejercicio.descripcion}
                    </p>

                    {/* Temas cubiertos */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Temas Cubiertos
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {ejercicio.temas.map((tema, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tema}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {ejercicio.driveId ? (
                        <>
                          <button 
                            onClick={() => handleDownload(ejercicio)}
                            className={`flex-1 ${colorClasses.button} text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center text-center hover:opacity-90`}
                            disabled={loading}
                          >
                            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                            {isExerciseDownloaded(ejercicio.id.toString()) ? 'Descargar Nuevamente' : 'Descargar Ejercicio'}
                          </button>
                          
                          {isExerciseDownloaded(ejercicio.id.toString()) && (
                            <button 
                              onClick={() => handleMarkCompleted(ejercicio)}
                              className={`flex-1 ${isExerciseCompleted(ejercicio.id.toString()) 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-gray-600 hover:bg-gray-700'
                              } text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center text-center`}
                              disabled={loading}
                            >
                              <CheckCircleIcon className="h-5 w-5 mr-2" />
                              {isExerciseCompleted(ejercicio.id.toString()) ? 'Completado ✓' : 'Marcar Completado'}
                            </button>
                          )}
                        </>
                      ) : (
                        <button 
                          disabled
                          className="flex-1 bg-gray-400 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center text-center cursor-not-allowed"
                        >
                          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                          Enlace en configuración
                        </button>
                      )}
                      <button className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors">
                        Ver Instrucciones
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Instrucciones adicionales */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              ¿Cómo usar los ejercicios?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Descarga</h4>
                <p className="text-gray-600">
                  Descarga el archivo de ejercicios correspondiente a tu nivel
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Practica</h4>
                <p className="text-gray-600">
                  Sigue las instrucciones paso a paso en el archivo
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Verifica</h4>
                <p className="text-gray-600">
                  Compara tu resultado con la solución proporcionada
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </ProtectedRoute>
  );
}