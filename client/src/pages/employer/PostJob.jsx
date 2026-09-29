import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Briefcase, MapPin, IndianRupee, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    jobType: 'Full-Time',
    category: '',
    salary: '',
    experienceLevel: '',
    skillsRequired: '',
    description: '',
    responsibilities: '',
    vacancy: 1,
    company: '' // Will be set before submit
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // First get the company ID
      const companyRes = await axios.get('/api/companies');
      const myCompany = companyRes.data.data.find(c => c.employer === user._id);
      
      if (!myCompany) {
        toast.error('You must setup a company profile first');
        navigate('/employer/company/setup');
        return;
      }

      // Convert skills to array
      const skillsArray = formData.skillsRequired.split(',').map(skill => skill.trim()).filter(skill => skill);

      const jobData = {
        ...formData,
        company: myCompany._id,
        skillsRequired: skillsArray
      };

      await axios.post('/api/jobs', jobData);
      toast.success('Job posted successfully!');
      navigate('/employer/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Post a New Job</h1>
            <p className="text-slate-600">Fill out the details below to attract top talent.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    required
                    className="input-field pl-10"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    required
                    className="input-field pl-10"
                    placeholder="e.g. Bangalore, Karnataka or Remote"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Type *</label>
                <select
                  name="jobType"
                  required
                  className="input-field"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                <select
                  name="category"
                  required
                  className="input-field"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Product">Product</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vacancy</label>
                <input
                  type="number"
                  name="vacancy"
                  min="1"
                  className="input-field"
                  value={formData.vacancy}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Salary Range</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="salary"
                    className="input-field pl-10"
                    placeholder="e.g. ₹8LPA - ₹12LPA"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Experience Level</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="experienceLevel"
                    className="input-field pl-10"
                    placeholder="e.g. 3-5 Years"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Skills Required (comma separated)</label>
              <input
                type="text"
                name="skillsRequired"
                className="input-field"
                placeholder="e.g. React, Node.js, TypeScript"
                value={formData.skillsRequired}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Job Description *</label>
              <textarea
                name="description"
                required
                rows="5"
                className="input-field resize-none"
                placeholder="Describe the role in detail..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Key Responsibilities</label>
              <textarea
                name="responsibilities"
                rows="4"
                className="input-field resize-none"
                placeholder="List the day-to-day responsibilities..."
                value={formData.responsibilities}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate('/employer/dashboard')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? 'Posting...' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
