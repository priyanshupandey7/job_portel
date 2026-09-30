import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Clock, FileText, CheckCircle, XCircle } from 'lucide-react';

const CandidateDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('/api/applications/me');
        setApplications(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Shortlisted': return 'bg-purple-100 text-purple-800';
      case 'Interview Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Selected': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
            <p className="text-slate-600 mt-1">Welcome back, {user?.fullName}</p>
          </div>
          <Link to="/jobs" className="btn-primary mt-4 md:mt-0 inline-flex items-center">
            <SearchIcon className="h-4 w-4 mr-2" /> Find More Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<FileText className="text-blue-500" />} title="Total Applications" value={applications.length} />
          <StatCard icon={<CheckCircle className="text-green-500" />} title="Shortlisted" value={applications.filter(a => a.status === 'Shortlisted' || a.status === 'Selected' || a.status === 'Interview Scheduled').length} />
          <StatCard icon={<XCircle className="text-red-500" />} title="Rejected" value={applications.filter(a => a.status === 'Rejected').length} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Recent Applications</h2>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-10">
                <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">You haven't applied to any jobs yet.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Job Title</th>
                    <th className="p-4 font-medium">Company</th>
                    <th className="p-4 font-medium">Applied Date</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <Link to={`/jobs/${app.job?._id}`} className="font-semibold text-slate-800 hover:text-blue-600">
                          {app.job?.title}
                        </Link>
                      </td>
                      <td className="p-4 text-slate-600">
                        <div className="flex items-center">
                          {app.job?.company?.logo ? (
                            <img src={app.job.company.logo} alt={app.job.company.companyName} className="h-6 w-6 rounded-full object-cover mr-2 border border-slate-200" />
                          ) : (
                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(app.job?.company?.companyName || 'C')}&background=random&color=fff&size=64`} alt={app.job?.company?.companyName} className="h-6 w-6 rounded-full object-cover mr-2 border border-slate-200" />
                          )}
                          {app.job?.company?.companyName}
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-slate-400" />
                          {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
    <div className="p-3 bg-slate-50 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-slate-500 font-medium text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export default CandidateDashboard;
