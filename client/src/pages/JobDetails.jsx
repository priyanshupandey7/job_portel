import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Briefcase, IndianRupee, Clock, Building2, ChevronLeft, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/jobs/${id}`);
        setJob(res.data.data);
      } catch (error) {
        toast.error('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      toast.error('Please login to apply');
      return;
    }
    setApplying(true);
    try {
      await axios.post('/api/applications', {
        job: id,
        // In a real app, we'd open a modal for resumeUrl and coverLetter
        resumeUrl: user.resumeUrl || 'Not provided',
        coverLetter: 'I am interested in this role.'
      });
      toast.success('Successfully applied for this job!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Application failed');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return <div className="text-center py-20">Job not found</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/jobs" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Jobs
        </Link>
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
          <div className="px-8 pb-8 relative">
            <div className="flex justify-between items-end -mt-12 mb-6">
              <div className="h-24 w-24 bg-white rounded-2xl shadow-md border-4 border-white flex items-center justify-center overflow-hidden">
                {job.company?.logo ? (
                  <img src={job.company.logo} alt={job.company.companyName} className="h-full w-full object-cover" />
                ) : (
                  <Building2 className="h-10 w-10 text-slate-300" />
                )}
              </div>
              <div>
                {user?.role === 'seeker' && (
                  <button 
                    onClick={handleApply}
                    disabled={applying}
                    className="btn-primary px-8 py-3 shadow-lg shadow-blue-500/30"
                  >
                    {applying ? 'Applying...' : 'Apply Now'}
                  </button>
                )}
              </div>
            </div>
            
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{job.title}</h1>
            <p className="text-lg text-slate-600 font-medium mb-6">{job.company?.companyName}</p>
            
            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
              <span className="flex items-center bg-slate-100 px-3 py-1 rounded-full"><MapPin className="h-4 w-4 mr-2 text-slate-400" /> {job.location}</span>
              <span className="flex items-center bg-slate-100 px-3 py-1 rounded-full"><Briefcase className="h-4 w-4 mr-2 text-slate-400" /> {job.jobType}</span>
              {job.salary && <span className="flex items-center bg-slate-100 px-3 py-1 rounded-full"><IndianRupee className="h-4 w-4 mr-2 text-slate-400" /> {job.salary}</span>}
              <span className="flex items-center bg-slate-100 px-3 py-1 rounded-full"><Calendar className="h-4 w-4 mr-2 text-slate-400" /> Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Job Description</h3>
              <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap">
                {job.description}
              </div>
            </div>
            
            {job.responsibilities && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Responsibilities</h3>
                <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap">
                  {job.responsibilities}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Job Overview</h3>
              <ul className="space-y-4">
                <li>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Category</span>
                  <span className="text-slate-700 font-medium">{job.category}</span>
                </li>
                {job.experienceLevel && (
                  <li>
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Experience</span>
                    <span className="text-slate-700 font-medium">{job.experienceLevel}</span>
                  </li>
                )}
                <li>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Vacancy</span>
                  <span className="text-slate-700 font-medium">{job.vacancy} position(s)</span>
                </li>
              </ul>
            </div>
            
            {job.skillsRequired && job.skillsRequired.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
