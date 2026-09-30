import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, MapPin, IndianRupee, Clock, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ keyword: '', location: '', category: '' });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axios.get(`/api/jobs?${queryParams}`);
      setJobs(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Find Your Next Role</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="keyword"
                placeholder="Job title or keyword"
                className="input-field pl-10"
                value={filters.keyword}
                onChange={handleFilterChange}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="location"
                placeholder="Mumbai, Bangalore, or remote"
                className="input-field pl-10"
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-slate-400" />
              </div>
              <select
                name="category"
                className="input-field pl-10 bg-white"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
              <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-slate-700">No jobs found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            jobs.map((job, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={job._id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between"
              >
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                  <div className="h-16 w-16 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-200">
                    {job.company?.logo ? (
                      <img src={job.company.logo} alt={job.company.companyName} className="h-full w-full object-cover" />
                    ) : (
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(job.company?.companyName || 'Job')}&background=random&color=fff&size=128`} alt={job.company?.companyName || 'Company'} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      <Link to={`/jobs/${job._id}`} className="hover:text-blue-600 transition-colors">
                        {job.title}
                      </Link>
                    </h3>
                    <p className="text-slate-600 font-medium mb-2">{job.company?.companyName}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                      <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {job.location}</span>
                      <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1" /> {job.jobType}</span>
                      {job.salary && <span className="flex items-center"><IndianRupee className="h-4 w-4 mr-1" /> {job.salary}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full">
                  <span className="flex items-center text-xs text-slate-400 mb-4 md:mb-0">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  <Link to={`/jobs/${job._id}`} className="btn-secondary w-full md:w-auto text-center mt-auto">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
