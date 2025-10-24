'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChartBarIcon, 
  ArrowRightOnRectangleIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';

interface NavbarProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  currentPage?: 'home' | 'ejercicios' | 'formulas' | 'videos' | 'quiz' | 'progreso';
}

export default function Navbar({ title, icon: Icon = ChartBarIcon, currentPage = 'home' }: NavbarProps) {
  const { user, userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const isCurrentPage = (page: string) => currentPage === page;

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo y título */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Icon className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </Link>

          {/* Navegación principal */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`transition-colors ${
                isCurrentPage('home') 
                  ? 'text-green-600 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Inicio
            </Link>
            <Link 
              href="/ejercicios" 
              className={`transition-colors ${
                isCurrentPage('ejercicios') 
                  ? 'text-green-600 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Ejercicios
            </Link>
            <Link 
              href="/formulas" 
              className={`transition-colors ${
                isCurrentPage('formulas') 
                  ? 'text-green-600 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Fórmulas
            </Link>
            <Link 
              href="/videos" 
              className={`transition-colors ${
                isCurrentPage('videos') 
                  ? 'text-green-600 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Videos
            </Link>
            <Link 
              href="/quiz" 
              className={`transition-colors ${
                isCurrentPage('quiz') 
                  ? 'text-green-600 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Quiz
            </Link>
            <Link 
              href="/progreso" 
              className={`transition-colors ${
                isCurrentPage('progreso') 
                  ? 'text-green-600 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Mi Progreso
            </Link>
          </nav>

          {/* Usuario y logout */}
          <div className="flex items-center space-x-4">
            {/* Información del usuario */}
            <div className="hidden sm:flex items-center space-x-2 text-gray-600">
              <UserCircleIcon className="h-5 w-5" />
              <span className="text-sm">
                {userProfile?.nickname || user?.displayName || user?.email?.split('@')[0] || 'Usuario'}
              </span>
            </div>

            {/* Botón de logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors"
              title="Cerrar Sesión"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Navegación móvil */}
        <div className="md:hidden pb-4">
          <nav className="flex space-x-4 overflow-x-auto">
            <Link 
              href="/" 
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm transition-colors ${
                isCurrentPage('home') 
                  ? 'bg-green-100 text-green-800 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Inicio
            </Link>
            <Link 
              href="/ejercicios" 
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm transition-colors ${
                isCurrentPage('ejercicios') 
                  ? 'bg-green-100 text-green-800 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Ejercicios
            </Link>
            <Link 
              href="/formulas" 
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm transition-colors ${
                isCurrentPage('formulas') 
                  ? 'bg-green-100 text-green-800 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Fórmulas
            </Link>
            <Link 
              href="/videos" 
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm transition-colors ${
                isCurrentPage('videos') 
                  ? 'bg-green-100 text-green-800 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Videos
            </Link>
            <Link 
              href="/quiz" 
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm transition-colors ${
                isCurrentPage('quiz') 
                  ? 'bg-green-100 text-green-800 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Quiz
            </Link>
            <Link 
              href="/progreso" 
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm transition-colors ${
                isCurrentPage('progreso') 
                  ? 'bg-green-100 text-green-800 font-medium' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Progreso
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}