'use client';

import { useState } from 'react';
import { PlayIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';

interface Video {
  id: number;
  titulo: string;
  duracion: string;
  nivel: string;
  descripcion: string;
  driveId: string;
  temas: string[];
}

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos = [
    {
      id: 1,
      titulo: 'Clase 1 - Nivel Básico',
      duracion: '45:30',
      nivel: 'Básico',
      descripcion: 'Introducción completa a Microsoft Excel. Aprende los conceptos fundamentales, navegación básica, tipos de datos y operaciones simples.',
      driveId: '1scCXx46mZRSWzAQtrTN416WQmjMBIy0T',
      temas: [
        'Interfaz de Excel',
        'Tipos de datos',
        'Navegación básica',
        'Fórmulas simples',
        'Formato de celdas'
      ]
    },
    {
      id: 2,
      titulo: 'Clase 2 - Nivel Intermedio',
      duracion: '52:15',
      nivel: 'Intermedio',
      descripcion: 'Desarrolla habilidades avanzadas con tablas dinámicas, gráficos y funciones de búsqueda. Perfecto para usuarios que ya dominan lo básico.',
      driveId: '17wkLlxHSEnEeNl1AC0w0YKxvJ2ZFkx7c',
      temas: [
        'Tablas dinámicas',
        'Gráficos avanzados',
        'BUSCARV y BUSCARH',
        'Funciones lógicas',
        'Filtros y ordenamiento'
      ]
    },
    {
      id: 3,
      titulo: 'Clase 3 - Nivel Avanzado',
      duracion: '58:42',
      nivel: 'Avanzado',
      descripcion: 'Domina las técnicas más sofisticadas de Excel incluyendo macros, automatización y programación VBA para maximizar tu productividad.',
      driveId: '1LcsdQGXdkTG05SFHY25BVDkvotAn2ykg',
      temas: [
        'Macros y VBA',
        'Automatización de tareas',
        'Funciones personalizadas',
        'Análisis de datos avanzado',
        'Integración con otras aplicaciones'
      ]
    }
  ];

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Básico':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          accent: 'bg-green-600'
        };
      case 'Intermedio':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          accent: 'bg-blue-600'
        };
      case 'Avanzado':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-800',
          accent: 'bg-purple-600'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          accent: 'bg-gray-600'
        };
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <Navbar title="AprendeExcel - Videos" icon={PlayIcon} currentPage="videos" />

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Videos de Clase Completos
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Aprende Excel paso a paso con nuestros videos estructurados. 
            Desde conceptos básicos hasta técnicas avanzadas de automatización.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <p className="text-sm text-blue-800 text-center">
              <strong>📚 Contenido educativo desarrollado por TECLAB</strong><br/>
              Videos instructivos y material pedagógico protegido por derechos de autor.
            </p>
          </div>
        </div>
      </section>

      {/* Video Player Section */}
      {selectedVideo && (
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-900 relative">
                {selectedVideo.driveId ? (
                  <iframe
                    src={`https://drive.google.com/file/d/${selectedVideo.driveId}/preview`}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <PlayIcon className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg">Video en configuración</p>
                      <p className="text-sm text-gray-300">
                        {selectedVideo.titulo}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        El enlace de Google Drive se configurará pronto
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedVideo.titulo}</h3>
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕ Cerrar
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{selectedVideo.descripcion}</p>
                
                {/* Temas del video */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Temas cubiertos en este video:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedVideo.temas.map((tema, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {tema}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Videos Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {videos.map((video) => {
              const colorClasses = getNivelColor(video.nivel);
              return (
                <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all transform hover:scale-110"
                      >
                        <PlayIcon className="h-8 w-8 text-gray-700 ml-1" />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses.bg} ${colorClasses.text}`}>
                        {video.nivel}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {video.duracion}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{video.titulo}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {video.descripcion}
                    </p>

                    {/* Temas cubiertos */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Temas Cubiertos
                      </h4>
                      <div className="space-y-1">
                        {video.temas.slice(0, 3).map((tema, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            {tema}
                          </div>
                        ))}
                        {video.temas.length > 3 && (
                          <div className="text-sm text-gray-500 ml-4">
                            +{video.temas.length - 3} temas más
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className={`w-full ${colorClasses.accent} text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center`}
                      >
                        <PlayIcon className="h-5 w-5 mr-2" />
                        Reproducir Video
                      </button>
                      <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors">
                        Ver Ejercicios Relacionados
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ruta de Aprendizaje Recomendada
          </h3>
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
            {videos.map((video, index) => {
              const colorClasses = getNivelColor(video.nivel);
              return (
                <div key={video.id} className="flex flex-col items-center text-center max-w-xs">
                  <div className={`w-16 h-16 ${colorClasses.accent} rounded-full text-white flex items-center justify-center mb-4 text-2xl font-bold`}>
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{video.nivel}</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Duración: {video.duracion}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <AcademicCapIcon className="h-4 w-4 mr-1" />
                    {video.temas.length} temas
                  </div>
                  {index < videos.length - 1 && (
                    <div className="hidden lg:block absolute transform translate-x-32">
                      <div className="w-8 h-8 text-gray-300">→</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Contenido del Curso
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {videos.length}
              </div>
              <div className="text-gray-600">Videos de Clase</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {videos.reduce((total, video) => {
                  const [minutes] = video.duracion.split(':');
                  return total + parseInt(minutes);
                }, 0)}min
              </div>
              <div className="text-gray-600">Duración Total</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {videos.reduce((total, video) => total + video.temas.length, 0)}
              </div>
              <div className="text-gray-600">Temas Cubiertos</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600">Niveles de Dificultad</div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </ProtectedRoute>
  );
}