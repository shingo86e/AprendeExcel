'use client';

import Link from 'next/link';
import { CheckCircleIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import { PublicRoute } from '@/components/ProtectedRoute';

export default function RegisterConfirmation() {
  return (
    <PublicRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              ¡Solicitud Enviada!
            </h2>
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <EnvelopeIcon className="h-8 w-8 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800">
                  Tu solicitud está en proceso
                </h3>
              </div>
              <p className="text-sm text-green-700 mb-4">
                Hemos enviado tus datos al administrador de AprendeExcel. 
                Te contactaremos pronto para brindarte tu contraseña de acceso.
              </p>
              
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <div className="flex items-start">
                  <ClockIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Próximos pasos:
                    </h4>
                    <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                      <li>El administrador revisará tu solicitud</li>
                      <li>Te contactará por email o teléfono</li>
                      <li>Recibirás tu contraseña de acceso</li>
                      <li>Podrás ingresar a la plataforma</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Link 
                href="/login" 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Ir al Login
              </Link>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                ¿Tienes dudas?{' '}
                <a href="mailto:exequielsony@gmail.com" className="font-medium text-green-600 hover:text-green-500">
                  Contáctanos
                </a>
              </p>
            </div>
          </div>

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