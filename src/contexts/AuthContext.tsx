import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
  uid: string;
  email: string;
  nickname?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ needsNickname: boolean }>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  updateNickname: (nickname: string) => Promise<void>;
  checkUserProfile: (uid: string) => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          uid: data.uid || uid,
          email: data.email || '',
          nickname: data.nickname,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        } as UserProfile;
      }
      return null;
    } catch (error: any) {
      console.error('Error checking user profile:', error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Cargar perfil del usuario desde Firestore
        const profile = await checkUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<{ needsNickname: boolean }> => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      // Verificar si el usuario tiene perfil y nickname
      const profile = await checkUserProfile(user.uid);
      const needsNickname = !profile || !profile.nickname;
      
      // Si no tiene perfil, crear uno básico
      if (!profile) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      return { needsNickname };
    } catch (error: any) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName && user) {
        await updateProfile(user, { displayName });
      }
    } catch (error: any) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error('Error al cerrar sesión');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const updateUserProfile = async (displayName: string) => {
    if (!user) throw new Error('Usuario no autenticado');
    
    try {
      await updateProfile(user, { displayName });
    } catch (error: any) {
      throw new Error('Error al actualizar perfil');
    }
  };

  const updateNickname = async (nickname: string) => {
    if (!user) throw new Error('Usuario no autenticado');
    
    try {
      const userDocRef = doc(db, 'users', user.uid);
      
      // Primero verificar si el documento existe
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        // Si existe, actualizar
        await updateDoc(userDocRef, {
          nickname: nickname,
          updatedAt: serverTimestamp()
        });
      } else {
        // Si no existe, crear el documento completo
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email || '',
          nickname: nickname,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      // Actualizar el estado local
      const updatedProfile = await checkUserProfile(user.uid);
      setUserProfile(updatedProfile);
    } catch (error: any) {
      throw new Error('Error al actualizar nickname');
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
    updateNickname,
    checkUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Función para manejar mensajes de error de Firebase Auth
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No existe una cuenta con este email';
    case 'auth/wrong-password':
      return 'Contraseña incorrecta';
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con este email';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres';
    case 'auth/invalid-email':
      return 'Email inválido';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Intenta más tarde';
    case 'auth/network-request-failed':
      return 'Error de conexión. Verifica tu internet';
    default:
      return 'Error de autenticación. Intenta nuevamente';
  }
};