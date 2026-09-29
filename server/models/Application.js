import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  resumeUrl: { type: String },
  coverLetter: { type: String },
  status: { type: String, enum: ['Applied', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'], default: 'Applied' },
  appliedDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
