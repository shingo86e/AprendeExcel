'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EnvelopeIcon, LockClosedIcon, UserIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { PublicRoute } from '@/components/ProtectedRoute';
import { emailService } from '@/lib/emailService';

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { resetPassword } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono) {
      setError('Por favor completa todos los campos');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return false;
    }

    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.telefono)) {
      setError('Por favor ingresa un teléfono válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setError('');
      setLoading(true);

      // Enviar solicitud de recuperación al administrador
      const emailResult = await emailService.sendPasswordRecoveryNotification({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono
      });

      if (!emailResult.success) {
        setError('Error enviando la solicitud. Por favor intenta nuevamente.');
        return;
      }

      setSuccess(true);
    } catch (error: any) {
      setError('Error enviando la solicitud. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <PublicRoute>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center">
                <EnvelopeIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Email Enviado
              </h2>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  Se ha enviado tu solicitud de recuperación al administrador.
                </p>
                <p className="text-sm text-green-600 mt-2">
                  Te contactaremos pronto al email <strong>{formData.email}</strong> o a tu teléfono para brindarte una nueva contraseña.
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <Link 
                  href="/login" 
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Volver al Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PublicRoute>
    );
  }

  return (
    <PublicRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo y título */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-orange-600 rounded-full flex items-center justify-center">
              <LockClosedIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Recuperar Contraseña
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ingresa tus datos para solicitar recuperación de contraseña
            </p>
          </div>

          {/* Formulario */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Apellido */}
              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Tu apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono Celular
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="+54 9 11 1234-5678"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>
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
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Recuperar Contraseña'
                )}
              </button>
            </div>

            {/* Links */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                ¿Recordaste tu contraseña?{' '}
                <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
                  Inicia sesión aquí
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
                  Regístrate aquí
                </Link>
              </p>
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
    </PublicRoute>
  );
}