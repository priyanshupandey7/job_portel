import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ChevronLeft, UserCircle, Mail, Download, Clock } from 'lucide-react';

const JobApplicants = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        // Fetch job details for header
        const jobRes = await axios.get(`/api/jobs/${jobId}`);
        setJob(jobRes.data.data);

        // Fetch applications for this job
        const appRes = await axios.get(`/api/applications/job/${jobId}`);
        setApplications(appRes.data.data);
      } catch (error) {
        toast.error('Failed to load applicants');
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await axios.put(`/api/applications/${appId}`, { status: newStatus });
      setApplications(applications.map(app => 
        app._id === appId ? { ...app, status: newStatus } : app
      ));
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

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
        
        <Link to="/employer/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        
        {/* Header Section */}
        {job && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Applicants for: {job.title}</h1>
              <p className="text-slate-500 mt-1 flex items-center">
                <span className="font-medium">{applications.length}</span> &nbsp;Total Application{applications.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-sm">
              <span className={`px-3 py-1 rounded-full font-semibold ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                {job.status}
              </span>
            </div>
          </div>
        )}

        {/* Applicants List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-16">
              <UserCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700">No applicants yet</h3>
              <p className="text-slate-500 mt-1">When candidates apply, they will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-100">
                    <th className="p-4 font-medium">Candidate</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Resume</th>
                    <th className="p-4 font-medium">Applied Date</th>
                    <th className="p-4 font-medium text-right">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                            {app.applicant?.fullName?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{app.applicant?.fullName}</p>
                            <p className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">{app.coverLetter}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 text-sm">
                        <div className="flex flex-col space-y-1">
                          <a href={`mailto:${app.applicant?.email}`} className="flex items-center hover:text-indigo-600">
                            <Mail className="h-3 w-3 mr-1" /> {app.applicant?.email}
                          </a>
                        </div>
                      </td>
                      <td className="p-4">
                        <a href={app.resumeUrl !== 'Not provided' ? app.resumeUrl : '#'} target="_blank" rel="noreferrer" className={`inline-flex items-center text-sm ${app.resumeUrl !== 'Not provided' ? 'text-indigo-600 hover:text-indigo-800' : 'text-slate-400 cursor-not-allowed'}`}>
                          <Download className="h-4 w-4 mr-1" /> Resume
                        </a>
                      </td>
                      <td className="p-4 text-slate-500 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <select
                          className={`text-sm border-0 bg-transparent font-semibold cursor-pointer outline-none ${getStatusColor(app.status)} px-3 py-1.5 rounded-full`}
                          value={app.status}
                          onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        >
                          <option value="Applied" className="bg-white text-slate-800">Applied</option>
                          <option value="Shortlisted" className="bg-white text-slate-800">Shortlisted</option>
                          <option value="Interview Scheduled" className="bg-white text-slate-800">Interview Scheduled</option>
                          <option value="Selected" className="bg-white text-slate-800">Selected</option>
                          <option value="Rejected" className="bg-white text-slate-800">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicants;
