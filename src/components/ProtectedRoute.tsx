import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo);
    } else if (!loading && user && !userProfile?.nickname) {
      // Si el usuario está autenticado pero no tiene nickname, redirigir a configuración
      router.push('/setup-nickname');
    }
  }, [user, userProfile, loading, router, redirectTo]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cargando...</h2>
          <p className="text-gray-600">Verificando autenticación</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, no renderizar nada (se redirigirá)
  if (!user) {
    return null;
  }

  // Si hay usuario pero no tiene nickname, no renderizar (se redirigirá a setup)
  if (user && !userProfile?.nickname) {
    return null;
  }

  // Si hay usuario y tiene nickname, renderizar el contenido protegido
  return <>{children}</>;
};

// Componente para rutas públicas (solo usuarios no autenticados)
export const PublicRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/' 
}) => {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Si el usuario está autenticado pero no tiene nickname
      if (!userProfile?.nickname) {
        router.push('/setup-nickname');
      } else {
        // Si tiene nickname, ir al dashboard
        router.push(redirectTo);
      }
    }
  }, [user, userProfile, loading, router, redirectTo]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cargando...</h2>
          <p className="text-gray-600">Verificando autenticación</p>
        </div>
      </div>
    );
  }

  // Si hay usuario, no renderizar nada (se redirigirá)
  if (user) {
    return null;
  }

  // Si no hay usuario, renderizar el contenido público
  return <>{children}</>;
};