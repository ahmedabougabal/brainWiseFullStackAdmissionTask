import { createContext, useContext, useState, useEffect} from "react";
import {AuthState, LoginCredentials} from "../types/auth.types";
import {authService} from "../services/auth.services";
import { toast } from 'react-toastify';

interface AuthContextType extends AuthState {
    login:(credentials: LoginCredentials) => Promise<void>;
    signOut:()=> void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
            
            // Only show welcome message if user is accessing the appropriate portal
            const isAdminRoute = window.location.pathname.includes('/admin');
            const isEmployeeRoute = window.location.pathname.includes('/employee');
            
            if ((isAdminRoute && response.user.role === 'ADMIN') || 
                (isEmployeeRoute && response.user.role === 'USER') ||
                (!isAdminRoute && !isEmployeeRoute)) {
                toast.success(`Welcome ${response.user.email}!`, {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            setState(prev=>({
                ...prev,
                loading:false,
                error: "invalid credentials",
            }));
            toast.error('Invalid credentials. Please try again.', {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const signOut =() =>{
        authService.logout();
        setState({
            isAuthenticated:false,
            user:null,
            loading:false,
            error:null,
        });
        toast.info('You have been signed out.', {
            position: "top-right",
            autoClose: 3000,
        });
    };

    return (
        <AuthContext.Provider value={{...state, login, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
