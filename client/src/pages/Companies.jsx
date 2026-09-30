import { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, Globe, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get('/api/companies');
        setCompanies(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company => 
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.industry && company.industry.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Top Companies Hiring Now</h1>
          <p className="text-slate-600 mb-6 text-lg">Discover and connect with industry-leading organizations.</p>
          
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search companies by name or industry..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
            <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-700">No companies found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={company._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="h-16 w-16 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-100 p-1">
                    {company.logo ? (
                      <img src={company.logo} alt={company.companyName} className="h-full w-full object-contain" />
                    ) : (
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(company.companyName || 'Company')}&background=random&color=fff&size=128`} alt={company.companyName} className="h-full w-full object-cover rounded-lg" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{company.companyName}</h3>
                    {company.industry && (
                      <span className="inline-block mt-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
                        {company.industry}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3">
                  {company.description || "No description provided."}
                </p>
                
                <div className="space-y-2 text-sm text-slate-500 pt-4 border-t border-slate-50">
                  {company.address && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{company.address}</span>
                    </div>
                  )}
                  {company.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-slate-400 flex-shrink-0" />
                      <a href={company.website} target="_blank" rel="noreferrer" className="truncate hover:text-blue-600 transition-colors">
                        {company.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Companies;
