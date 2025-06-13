import React, { useState } from 'react';
import { LogIn, User, LogOut } from 'lucide-react';

interface AuthButtonProps {
  fullWidth?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ fullWidth = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      // Simulate Google authentication
      // In a real app, this would integrate with Google OAuth
      setIsAuthenticated(true);
      setUser({ name: 'John Doe', email: 'john@example.com' });
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setShowDropdown(false);
  };

  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`
            ${fullWidth ? 'w-full' : ''}
            flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2
            text-gray-700 font-medium transition-all duration-200
            hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6ECE9D]/50
          `}
        >
          <User className="size-4" />
          <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleAuth}
      className={`
        ${fullWidth ? 'w-full' : ''}
        flex items-center justify-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2
        text-gray-700 font-medium transition-all duration-200
        hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6ECE9D]/50
        shadow-sm
      `}
    >
      <LogIn className="size-4" />
      Sign In
    </button>
  );
};

export default AuthButton;