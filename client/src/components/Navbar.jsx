import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User as UserIcon, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                JobPortal
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/jobs" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Find Jobs</Link>
            <Link to="/companies" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Companies</Link>
            
            {!user ? (
              <div className="flex items-center space-x-4 ml-4">
                <div className="relative group">
                  <button className="text-slate-600 hover:text-blue-600 font-medium transition-colors py-2 flex items-center">
                    Login
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                    <div className="py-1">
                      <Link to="/login/candidate" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Candidate Login</Link>
                      <Link to="/login/employer" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Employer Login</Link>
                    </div>
                  </div>
                </div>
                <Link to="/register" className="btn-primary">Sign Up</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link to={user.role === 'employer' ? '/employer/dashboard' : '/candidate/dashboard'} className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 transition-colors">
                  <UserIcon className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
