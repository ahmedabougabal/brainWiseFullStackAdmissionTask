import { createContext, useContext, useState, useEffect} from "react";
import {AuthState, LoginCredentials} from "../types/auth.types";
import {authService} from "../services/auth.services";

interface AuthContextType extends AuthState {
    login:(credentials: LoginCredentials) => Promise<void>;
    logout:()=> void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
    children
}) => {
    const [state,setState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        loading:true,
        error : null,
    });
  useEffect(() => {
    const user = authService.getCurrentUser();
    setState(prev => ({
      ...prev,
      isAuthenticated: !!user,
      user,
      loading: false,
    }));
  }, []);
  const login = async (credentials: LoginCredentials) => {
      try {
          setState(prev=> ({...prev, loading:true, error:null}));
          const response = await authService.login(credentials);
          setState({
              isAuthenticated:true,
              user: response.user,
              loading:false,
              error:null,
          });
      } catch (error) {
          setState(prev=>({
              ...prev,
              loading:false,
              error: "invalid credentials",
          }));
      }
  }
  const logout =() =>{
      authService.logout();
      setState({
          isAuthenticated:false,
          user:null,
          loading: false,
          error:null
      });
  };
  return (
      <AuthContext.Provider value={{...state, login, logout}}>
          {children}
      </AuthContext.Provider>
  )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a useAuthProvider');
    }
    return context;
};
