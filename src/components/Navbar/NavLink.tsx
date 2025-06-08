import React, { useState, useRef } from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  isActive = false,
  isMobile = false,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return;

    const link = linkRef.current;
    if (!link) return;

    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setUnderlineLeft(x);
    setUnderlineWidth(20);
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      setUnderlineWidth(0);
    }
  };

  return (
    <li>
      <a
        ref={linkRef}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="link"
        tabIndex={0}
        className={`
          ${isMobile ? 'block py-2 text-lg' : 'inline-block'}
          relative font-medium transition-colors duration-300
          ${isActive 
            ? 'text-gray-900' 
            : 'text-gray-600 hover:text-gray-900'
          }
        `}
      >
        {children}
        {isHovered && (
          <span 
            className="absolute bottom-[-4px] h-0.5 bg-[#6ECE9D] transition-all duration-100"
            style={{
              left: `${underlineLeft - underlineWidth / 2}px`,
              width: `${underlineWidth}px`,
            }}
          />
        )}
      </a>
    </li>
  );
};

export default NavLink;
