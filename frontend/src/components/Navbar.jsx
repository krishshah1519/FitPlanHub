import{useContext} from "react";
import{Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar=() =>{
  const {user, logout} = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              FitPlanHub
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            
            {user ? (
              <>
                <span className="text-gray-500">Hello, {user.name}</span>
                {user.role === 'trainer' && (
                   <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                     Dashboard
                   </Link>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;