import { motion } from 'framer-motion';
import { Search, Briefcase, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
            >
              Find Your Dream Job Today
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg lg:text-xl text-slate-600 mb-10"
            >
              Connect with top employers and discover opportunities that match your skills. Your next career move starts here.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2"
            >
              <div className="flex-grow flex items-center bg-slate-50 rounded-xl px-4 py-3 w-full">
                <Search className="text-slate-400 mr-3 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Job title or keyword" 
                  className="bg-transparent border-none outline-none w-full text-slate-700"
                />
              </div>
              <button className="btn-primary w-full md:w-auto py-3 px-8 rounded-xl">
                Search Jobs
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-3xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={<Briefcase className="h-8 w-8 text-blue-500" />} number="10,000+" label="Active Jobs" />
            <StatCard icon={<Building2 className="h-8 w-8 text-indigo-500" />} number="2,500+" label="Companies" />
            <StatCard icon={<Users className="h-8 w-8 text-purple-500" />} number="50,000+" label="Candidates" />
            <StatCard icon={<Search className="h-8 w-8 text-emerald-500" />} number="1M+" label="Searches" />
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon, number, label }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center transition-all shadow-sm hover:shadow-md"
  >
    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-800">{number}</h3>
    <p className="text-slate-500 font-medium mt-1">{label}</p>
  </motion.div>
);

export default Home;
