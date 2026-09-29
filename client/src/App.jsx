import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Companies from './pages/Companies';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import SetupCompany from './pages/employer/SetupCompany';
import PostJob from './pages/employer/PostJob';
import JobApplicants from './pages/employer/JobApplicants';

// Auth Pages
import SeekerLogin from './pages/auth/SeekerLogin';
import EmployerLogin from './pages/auth/EmployerLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          
          <Route path="login/candidate" element={<SeekerLogin />} />
          <Route path="login/employer" element={<EmployerLogin />} />
          
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="companies" element={<Companies />} />
          <Route path="candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="employer/dashboard" element={<EmployerDashboard />} />
          <Route path="employer/company/setup" element={<SetupCompany />} />
          <Route path="employer/jobs/new" element={<PostJob />} />
          <Route path="employer/jobs/:jobId/applicants" element={<JobApplicants />} />
          {/* Add more routes here later */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
