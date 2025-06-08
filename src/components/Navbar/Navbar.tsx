import { useState, useEffect } from 'react';
import { BeakerIcon, Menu, X } from 'lucide-react';
import NavLink from './NavLink';
import NavButton from './NavButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`
        fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all duration-300
        ${isScrolled ? 'shadow-md' : 'shadow-sm'}
      `}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="text-[#6ECE9D]">
            <BeakerIcon size={24} className="fill-[#6ECE9D]/10" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">
            HEX<span className="font-extrabold">LAB</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            <NavLink href="/" isActive>Home</NavLink>
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/testimonials">Testimonials</NavLink>
            <NavLink href="/final-itinerary">FAQ</NavLink>
          </ul>
          <NavButton>Try It For Free</NavButton>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          fixed top-16 left-0 right-0 z-40 h-[calc(100vh-4rem)] overflow-y-auto bg-white
          px-6 py-8 shadow-lg transition-transform duration-300 ease-in-out md:hidden
          ${isMenuOpen ? 'translate-y-0' : '-translate-y-[110%]'}
        `}
      >
        <nav>
          <ul className="flex flex-col gap-6">
            <NavLink href="/" isActive isMobile>Home</NavLink>
            <NavLink href="/features" isMobile>Features</NavLink>
            <NavLink href="/pricing" isMobile>Pricing</NavLink>
            <NavLink href="/testimonials" isMobile>Testimonials</NavLink>
            <NavLink href="/final-itinerary" isMobile>FAQ</NavLink>
            <li className="pt-4">
              <NavButton fullWidth>Try It For Free</NavButton>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;