// import React, { useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserCircle } from "lucide-react";
// import { UserContext } from "../Context/userContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn, logout } = useContext(UserContext);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };
//   return (
//     <nav className="text-orange-900">
//       <div className="w-full px-10 py-4 flex justify-between items-center">
//         <div className="text-3xl font-bold">
//           <Link to="/">
//             Next<span className="font-stretch-50% font-semibold">step</span>
//           </Link>
//         </div>

//         <div className="hidden md:flex space-x-10 font-sans">
//           {isLoggedIn ? (
//             <>
//               <Link to="/governmentPolicies" className="hover:scale-105">
//                 Government Scheme
//               </Link>
//               <Link to="/institute" className="hover:scale-105">
//                 Education
//               </Link>
//               <Link to="/healthCareSearch" className="hover:scale-105">
//                 Healthcare
//               </Link>
//               <Link to="/jobListings" className="hover:scale-105">
//                 Jobs
//               </Link>
//               <Link to="/employers" className="hover:scale-105">
//                 Employers
//               </Link>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="hover:scale-105"
//               >
//                 Government Scheme
//               </button>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="hover:scale-105"
//               >
//                 Education
//               </button>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="hover:scale-105"
//               >
//                 Healthcare
//               </button>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="hover:scale-105"
//               >
//                 Jobs
//               </button>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="hover:scale-105"
//               >
//                 Employers
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex items-center space-x-6">
//           {isLoggedIn ? (
//             <div className="flex items-center">
//               <Link to="/profile" className="hover:scale-105">
//                 <UserCircle size={32} />
//               </Link>
//               <button
//                 className="px-4 py-2 hover:scale-105 cursor-pointer rounded-lg"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <button
//               className="px-4 py-2 hover:scale-105 cursor-pointer rounded-lg"
//               onClick={() => navigate("/login")}
//             >
//               LogIn
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useContext } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(UserContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const menuItems = isLoggedIn
    ? [
        { label: "Home", href: "/" },
        { label: "Jobs", href: "/jobListings" },
        { label: "Institutes", href: "/institute" },
        { label: "Policies", href: "/governmentPolicies" },
        { label: "Healthcare", href: "/healthCareSearch" },
        { label: "Employers", href: "/employers" },
      ]
    : [];

  return (
    <nav className=" pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <span className="text-2xl font-bold text-yellow-900">
                Next<span className="font-semibold">step</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-gray-700 hover:text-yellow-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section - Profile & Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="hover:text-yellow-900 transition-colors"
                >
                  <UserCircle size={32} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                LogIn
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-yellow-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-3 py-2 text-gray-700 hover:bg-yellow-100 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="px-3 py-2 border-t border-gray-200 mt-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 hover:bg-yellow-100 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:bg-yellow-100 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-700 transition-colors"
                >
                  LogIn
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
