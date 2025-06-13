import { useState, useEffect } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import NavLink from './NavLink';
import NavButton from './NavButton';
import AuthButton from '../Auth/AuthButton';

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
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
            <MapPin size={28} className="fill-[#6ECE9D]/10" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-800">
            Evora
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            <NavLink href="/" isActive>Home</NavLink>
            <NavLink href="#features" onClick={() => scrollToSection('features')}>Features</NavLink>
            <NavLink href="#pricing" onClick={() => scrollToSection('pricing')}>Pricing</NavLink>
            <NavLink href="#testimonials" onClick={() => scrollToSection('testimonials')}>Testimonials</NavLink>
            <NavLink href="/browse">Browse Trips</NavLink>
          </ul>
          <div className="flex items-center gap-3">
            <AuthButton />
            <NavButton>Create Trip</NavButton>
          </div>
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
            <NavLink href="#features" isMobile onClick={() => scrollToSection('features')}>Features</NavLink>
            <NavLink href="#pricing" isMobile onClick={() => scrollToSection('pricing')}>Pricing</NavLink>
            <NavLink href="#testimonials" isMobile onClick={() => scrollToSection('testimonials')}>Testimonials</NavLink>
            <NavLink href="/browse" isMobile>Browse Trips</NavLink>
            <li className="pt-4 space-y-3">
              <AuthButton fullWidth />
              <NavButton fullWidth>Create Trip</NavButton>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;