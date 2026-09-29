import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Users, PlusCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyRes = await axios.get('/api/companies');
        const myCompany = companyRes.data.data.find(c => c.employer === user._id);
        setCompany(myCompany);

        const jobsRes = await axios.get('/api/jobs');
        const myJobs = jobsRes.data.data.filter(j => j.postedBy === user._id);
        setJobs(myJobs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user._id]);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Employer Dashboard</h1>
            <p className="text-slate-600 mt-1">Manage your company and job postings</p>
          </div>
          <button className="btn-primary mt-4 md:mt-0 inline-flex items-center" onClick={() => navigate('/employer/jobs/new')}>
            <PlusCircle className="h-4 w-4 mr-2" /> Post New Job
          </button>
        </div>

        {!company && !loading && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl mb-8 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Complete your company profile!</h3>
              <p className="text-sm mt-1">You need to setup your company profile before posting jobs.</p>
            </div>
            <button className="btn-primary bg-blue-600 text-white text-sm" onClick={() => navigate('/employer/company/setup')}>
              Setup Profile
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<Briefcase className="text-indigo-500" />} title="Active Jobs" value={jobs.filter(j => j.status === 'Active').length} />
          <StatCard icon={<Users className="text-emerald-500" />} title="Total Jobs Posted" value={jobs.length} />
          <StatCard icon={<Briefcase className="text-slate-500" />} title="Company Status" value={company ? 'Active' : 'Pending'} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">Your Job Postings</h2>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-10">
                <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 mb-4">You haven't posted any jobs yet.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Job Title</th>
                    <th className="p-4 font-medium">Posted Date</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <Link to={`/jobs/${job._id}`} className="font-semibold text-slate-800 hover:text-indigo-600">
                          {job.title}
                        </Link>
                        <div className="text-xs text-slate-500 mt-1">{job.location}</div>
                      </td>
                      <td className="p-4 text-slate-500 text-sm">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1 rounded-md transition-colors" onClick={() => navigate(`/employer/jobs/${job._id}/applicants`)}>
                          View Applicants
                        </button>
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

export default EmployerDashboard;
