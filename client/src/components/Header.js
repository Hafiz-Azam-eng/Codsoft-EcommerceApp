import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useCart } from './cartContext';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Header() {
  const { cartItemCount } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Add any additional logout logic here (e.g., redirecting to a login page)
  };

  return (
    <>
      <div className='bg-white-500 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1)] border-t w-11/12'>
        <div className="flex justify-center">
          <div className="flex justify-between w-9/12 pt-4">
            <div className="text-[#e94863] text-2xl font-bold italic">CodSoft</div>
            <input
              type="text"
              placeholder="Search and hit Enter.."
              className="w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="relative text-3xl">
              <Link to={"addToCart"}>
                <FaShoppingCart />
              </Link>

              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItemCount}</span>
              )}
            </div>
            
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className='rounded-full px-8 py-2 text-black font-bold hover:text-[#e94863]'>
                Logout
              </button>
            ) : (
              <>
                <Link to={"Login"}>
                  <button className='rounded-full px-8 py-2 text-black font-bold hover:text-[#e94863]'>Sign in</button>
                </Link>
                <Link to="signup">
                  <button className='bg-[#e94863] rounded-full px-8 py-2 text-white font-bold'>Sign up</button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className='flex justify-end'>
          <Navbar />
        </div>
      </div>
    </>
  );
}

export default Header;
