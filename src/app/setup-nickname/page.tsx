'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

const SetupProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cargando...</h2>
          <p className="text-gray-600">Verificando autenticación</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default function SetupNickname() {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, updateNickname } = useAuth();
  const router = useRouter();

  const validateNickname = () => {
    if (!nickname.trim()) {
      setError('Por favor ingresa un nickname');
      return false;
    }

    if (nickname.length < 2) {
      setError('El nickname debe tener al menos 2 caracteres');
      return false;
    }

    if (nickname.length > 20) {
      setError('El nickname no puede tener más de 20 caracteres');
      return false;
    }

    const nicknameRegex = /^[a-zA-Z0-9_\s]+$/;
    if (!nicknameRegex.test(nickname)) {
      setError('El nickname solo puede contener letras, números, espacios y guiones bajos');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateNickname()) return;

    try {
      setError('');
      setLoading(true);
      
      await updateNickname(nickname.trim());
      router.push('/');
    } catch (error: any) {
      setError(error.message || 'Error guardando el nickname');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SetupProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo y título */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              ¡Casi listo!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Elige un nickname para personalizar tu experiencia
            </p>
          </div>

          {/* Información del usuario */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Bienvenido:</strong> {user?.email}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Tu nickname aparecerá en la plataforma y será cómo te identifiques
            </p>
          </div>

          {/* Formulario */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                Tu Nickname
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  required
                  maxLength={20}
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Ej: Juan123, María_Excel, etc."
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {nickname.length}/20 caracteres
              </p>
            </div>

            {/* Reglas del nickname */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Reglas del nickname:</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Entre 2 y 20 caracteres</li>
                <li>• Solo letras, números, espacios y guiones bajos (_)</li>
                <li>• Será visible en tu perfil y progreso</li>
                <li>• Puedes cambiarlo más tarde en tu perfil</li>
              </ul>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={loading || !nickname.trim()}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-5 w-5 mr-2" />
                    Continuar a AprendeExcel
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Contenido educativo desarrollado por TECLAB
            </p>
          </div>
        </div>
      </div>
    </SetupProtectedRoute>
  );
}