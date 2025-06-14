import React from 'react';
import { useAuth } from './useAuth';
import AuthModal from './AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6ECE9D] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <>
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-8">
              <div className="w-16 h-16 bg-[#6ECE9D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#6ECE9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
              <p className="text-gray-600 mb-6">
                Please sign in to access this feature and start creating amazing travel itineraries.
              </p>
            </div>
            
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full px-6 py-3 bg-[#6ECE9D] text-black font-medium rounded-lg hover:bg-[#6ECE9D]/90 transition-colors"
            >
              Sign In to Continue
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={(userData) => {
            login(userData);
            setShowAuthModal(false);
          }}
        />
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;