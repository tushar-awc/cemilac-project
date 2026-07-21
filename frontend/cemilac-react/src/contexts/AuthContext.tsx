import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkExistingAuth = () => {
      try {
        const storedUser = localStorage.getItem('cemilac_user');
        const justLoggedIn = sessionStorage.getItem('just_logged_in');
        
        if (storedUser && justLoggedIn) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('cemilac_user');
        sessionStorage.removeItem('just_logged_in');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingAuth();
  }, []);

  const login = async (token: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // This will be called from the Login component after successful backend authentication
      // The actual API call is now handled in the Login component
      
      // Determine user role based on token prefix
      const upperToken = token.toUpperCase();
      let role: 'DA' | 'QA' = 'DA';
      let agencyId = 'DA0000000001';
      let agencyName = 'CEMILAC';

      if (upperToken.startsWith('QA')) {
        role = 'QA';
        agencyId = 'QA0000000001';
        agencyName = 'Quality Assurance Agency';
      }

      // Create user object
      const newUser: User = {
        id: `${role.toLowerCase()}_${Date.now()}`,
        token: upperToken,
        role,
        agencyId,
        agencyName
      };

      // Store user data
      localStorage.setItem('cemilac_user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    
    // Clear all stored data
    localStorage.removeItem('cemilac_user');
    localStorage.removeItem('da_company_name');
    localStorage.removeItem('just_logged_in');
    localStorage.removeItem('da_observation_pending');
    localStorage.removeItem('da_observation_downloaded');
    localStorage.removeItem('qa_doc_downloaded');
    
    // Clear session storage as well
    sessionStorage.clear();
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;