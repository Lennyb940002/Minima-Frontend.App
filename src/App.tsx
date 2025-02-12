import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthForm } from './components/auth/AuthForm';
import { Header } from './components/layout/Header';
import { EcommerceDashboard } from './components/dashboard/EcommerceDashboard';
import SeanceSport from './components/sport/SeanceSport';
import { SubscriptionPlans } from './components/auth/SubscriptionPlans';
import PaymentForm from './components/auth/PaymentForm';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { Plan } from './types';

/** CONTEXTE AUTHENTIFICATION **/
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan | null) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  hasPaid: boolean;
  setHasPaid: (value: boolean) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  selectedPlan: null,
  setSelectedPlan: () => {},
  userEmail: '',
  setUserEmail: () => {},
  hasPaid: false,
  setHasPaid: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

/** ROUTE PROTÉGÉE **/
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, hasPaid, isLoading } = useAuth();
  if (isLoading) return <div>Chargement...</div>;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (!hasPaid) return <Navigate to="/subscription" replace />;
  return <>{children}</>;
};

/** CONTENU PRINCIPAL **/
const MainContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isPublicPage = ['/auth', '/subscription', '/payment', '/loading'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-black text-white fade-in">
      {!isPublicPage && isAuthenticated && <Header />}
      <main className="max-w-7xl mx-auto py-8">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/ecommerce" : "/auth"} replace />} />
          <Route path="/subscription" element={<SubscriptionPlans />} />
          <Route path="/auth" element={<AuthFormContainer />} />
          <Route path="/payment" element={<ProtectedPaymentForm />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/ecommerce" element={<ProtectedRoute><EcommerceDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
};

/** FORMULAIRE D'AUTHENTIFICATION **/
const AuthFormContainer = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('register');
  const { setIsAuthenticated, setUserEmail, hasPaid } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <AuthForm
        type={authType}
        onSwitch={() => setAuthType(authType === 'login' ? 'register' : 'login')}
        onSubmit={(email) => {
          setIsAuthenticated(true);
          setUserEmail(email);
          navigate(hasPaid ? '/ecommerce' : '/subscription');
        }}
      />
    </div>
  );
};

/** FORMULAIRE DE PAIEMENT **/
const ProtectedPaymentForm = () => {
  const { selectedPlan, userEmail } = useAuth();
  if (!selectedPlan || !userEmail) return <Navigate to="/subscription" replace />;

  return <PaymentForm />;
};

/** APPLICATION PRINCIPALE **/
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [hasPaid, setHasPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('App useEffect triggered');
    const token = localStorage.getItem('token');
    const paymentStatus = localStorage.getItem('hasPaid');

    console.log('Initial token:', token);
    console.log('Initial hasPaid status:', paymentStatus);

    setIsAuthenticated(!!token);
    setHasPaid(paymentStatus === 'true');
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      setIsAuthenticated, 
      selectedPlan, 
      setSelectedPlan, 
      userEmail, 
      setUserEmail, 
      hasPaid, 
      setHasPaid, 
      isLoading 
    }}>
      <Router>
        <MainContent />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
