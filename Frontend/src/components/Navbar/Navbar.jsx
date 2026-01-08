import React, { useEffect, useState } from 'react';
import { GiForkKnifeSpoon, GiChefToque } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiBook,
  FiStar,
  FiPhone,
  FiShoppingCart,
  FiLogOut,
  FiKey,
  FiPackage
} from 'react-icons/fi';
import { useCart } from '../../CartContext/CartContext';
import Login from '../Login/Login';
import { AuthService } from '../../services/AuthService'; // ONLY CHANGE: Added this import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ONLY CHANGE: Use AuthService instead of localStorage directly
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );

  useEffect(() => {
    setShowLoginModal(location.pathname === '/login');
    // ONLY CHANGE: Use AuthService
    setIsAuthenticated(AuthService.isAuthenticated());
  }, [location.pathname]);

  const handleLoginSuccess = () => {
    // ONLY CHANGE: Use AuthService instead of localStorage
    AuthService.login({ loggedIn: true });
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    // ONLY CHANGE: Use AuthService instead of localStorage
    AuthService.logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  const renderDesktopAuthButton = () => {
    return isAuthenticated ? (
      <button onClick={handleLogout} className='px-3 md:px-3 lg:px-6 py-1.5 md:py-2 lg:py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D1B0E] rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-600/40 transition-all transform hover:scale-[1.02] border-2 border-amber-600/20 flex items-center space-x-2 shadow-md shadow-amber-900/20 text-xs md:text-sm lg:text-sm'>
        <FiLogOut className='text-base md:text-lg lg:text-lg' />
        <span className='text-shadow'> Logout </span>
      </button>
    ) : (
      <button onClick={() => navigate('/login')} className='px-3 md:px-3 lg:px-6 py-1.5 md:py-2 lg:py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D1B0E] rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-600/40 transition-all transform hover:scale-[1.02] border-2 border-amber-600/20 flex items-center space-x-2 shadow-md shadow-amber-900/20 text-xs md:text-sm lg:text-sm'>
        <FiKey className='text-base md:text-lg lg:text-lg' />
        <span className='text-shadow'> Login </span>
      </button>
    );
  };

  const renderMobileAuthButton = () => {
    return isAuthenticated ? (
      <button onClick={handleLogout} className='w-full px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D1B0E] rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm'>
        <FiLogOut />
        <span>Logout</span>
      </button>
    ) : (
      <button onClick={() => {
        navigate('/login');
        setIsOpen(false);
      }} className='w-full px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D1B0E] rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm'>
        <FiKey />
        <span>Login</span>
      </button>
    );
  };

  const navLinks = [
    { name: 'Home', to: '/', icon: <FiHome /> },
    { name: 'Menu', to: '/menu', icon: <FiBook /> },
    { name: 'About', to: '/about', icon: <FiStar /> },
    { name: 'Contact', to: '/contact', icon: <FiPhone /> },
    ...(isAuthenticated ? [
      { name: 'My Orders', to: '/myorder', icon: <FiPackage /> }
    ] : [])
  ];

  return (
    <nav className='bg-[#2D1B0E] border-amber-900/30 sticky top-0 z-50 shadow-[0_25px_50px_-12px] font-vibes group/nav overflow-x-hidden'>
      {/* TOP DECORATION */}
      <div className='absolute top-3 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 pointer-events-none'>
        <div className='h-[6px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent shadow-[0_0_20px] shadow-amber-500/30' />
        <div className='flex justify-between px-6'>
          <GiForkKnifeSpoon className='text-amber-500/40 -mt-4 -ml-2 rotate-45' size={32} />
          <GiForkKnifeSpoon className='text-amber-500/40 -mt-4 -mr-2 rotate-45' size={32} />
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 relative'>
        <div className='flex justify-between items-center h-16 md:h-20 lg:h-24'>
          {/* LOGO SECTION */}
          <div className='flex-shrink-0 flex items-center space-x-2 group relative md:-translate-x-4 lg:-translate-x-6'>
            <GiChefToque className='text-3xl md:text-4xl lg:text-5xl text-amber-500 transition-all group-hover:rotate-12 group-hover:text-amber-400' />
            <div className='flex flex-col ml-2'>
              <NavLink to='/' className='text-2xl md:text-xl lg:text-4xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-monsieur tracking-wider'>
                FoodHub
              </NavLink>
              <div className='h-[3px] bg-gradient-to-r from-amber-600/30 via-amber-400/50 to-amber-600/30 w-full mt-1' />
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className='hidden md:flex items-center space-x-1 lg:space-x-4'>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `group px-3 lg:px-4 py-2 text-sm lg:text-base relative transition-all duration-300 flex items-center rounded-3xl border-2 
                  ${isActive ? 'border-amber-600/50 bg-amber-900/20 shadow-inner' : 'border-transparent hover:border-amber-600/50'}`
                }
              >
                <span className='mr-2 text-amber-500'>{link.icon}</span>
                <span className='text-amber-100 group-hover:text-amber-300'>{link.name}</span>
              </NavLink>
            ))}

            <div className='flex items-center space-x-2 ml-4'>
              <NavLink to='/cart' className='p-2 text-amber-100 relative border-2 border-amber-900/30 hover:border-amber-600/50 rounded-xl'>
                <FiShoppingCart className='text-lg' />
                {totalItems > 0 && (
                  <span className='absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center'>
                    {totalItems}
                  </span>
                )}
              </NavLink>
              {renderDesktopAuthButton()}
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <div className='md:hidden flex items-center'>
            <button className='text-amber-500 p-2' onClick={() => setIsOpen(!isOpen)}>
              <div className='space-y-1.5'>
                <span className={`block w-6 h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION MENU */}
      {isOpen && (
        <div className='md:hidden bg-[#2D1B0E] border-t border-amber-900/40 px-4 py-4 space-y-2'>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl border-2 transition-all
                ${isActive ? 'bg-amber-600/20 border-amber-600/50 text-amber-400' : 'border-transparent text-amber-100'}`
              }
            >
              <span className='mr-3 text-amber-500'>{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
          <div className='pt-4 border-t border-amber-900/30 space-y-2'>
            <NavLink to='/cart' onClick={() => setIsOpen(false)} className='flex items-center justify-center p-3 border-2 border-amber-900/30 rounded-xl text-amber-100'>
              <FiShoppingCart className='mr-2' /> Cart ({totalItems})
            </NavLink>
            {renderMobileAuthButton()}
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4'>
          <div className='bg-[#2D1B0E] rounded-xl p-6 w-full max-w-[480px] relative border-4 border-amber-700/30'>
            <button onClick={() => navigate('/')} className='absolute top-4 right-4 text-amber-500 text-3xl'>&times;</button>
            <h2 className='text-2xl font-bold text-amber-500 mb-6 text-center'>Food Hub</h2>
            <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate('/')} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;