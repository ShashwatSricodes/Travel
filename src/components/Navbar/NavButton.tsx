import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavButtonProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ children, fullWidth = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create-trip');
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${fullWidth ? 'w-full' : ''}
        flex items-center justify-center gap-2 rounded-md bg-[#6ECE9D] px-4 py-2
        text-black font-medium capitalize transition-all duration-200
        hover:opacity-95 active:opacity-80 shadow-xs
        focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#6ECE9D]/50
        disabled:pointer-events-none disabled:opacity-50
      `}
    >
      {children}
      <ArrowRight className="size-4 shrink-0" />
    </button>
  );
};

export default NavButton;