import React, { useState, useEffect } from 'react';
import { LogIn, User, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';

interface AuthButtonProps {
  fullWidth?: boolean;
}

interface UserData {
  name: string;
  email: string;
  token: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ fullWidth = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Check for existing authentication on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.auth-dropdown')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDropdown]);

  const handleAuthSuccess = (userData: UserData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setShowDropdown(false);
    
    // Clear stored data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const getDisplayName = (name: string) => {
    // Return first name only for display
    return name.split(' ')[0];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isAuthenticated && user) {
    return (
      <div className="relative auth-dropdown">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`
            ${fullWidth ? 'w-full' : ''}
            flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2
            text-gray-700 font-medium transition-all duration-200
            hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6ECE9D]/50
          `}
        >
          {/* Avatar */}
          <div className="w-8 h-8 bg-[#6ECE9D] text-white rounded-full flex items-center justify-center text-sm font-semibold">
            {getInitials(user.name)}
          </div>
          <span className="hidden sm:inline">{getDisplayName(user.name)}</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
            {/* User info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#6ECE9D] text-white rounded-full flex items-center justify-center font-semibold">
                  {getInitials(user.name)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  // Navigate to profile or settings
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-3"
              >
                <User className="w-4 h-4" />
                Profile Settings
              </button>
              
              <button
                onClick={() => {
                  setShowDropdown(false);
                  // Navigate to user's trips
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                My Trips
              </button>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className={`
          ${fullWidth ? 'w-full' : ''}
          flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-300 px-4 py-2
          text-gray-700 font-medium transition-all duration-200
          hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6ECE9D]/50
          shadow-sm
        `}
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default AuthButton;