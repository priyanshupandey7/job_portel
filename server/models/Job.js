import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  location: { type: String, required: true },
  jobType: { type: String, enum: ['Full-Time', 'Part-Time', 'Internship', 'Remote', 'Contract'], required: true },
  category: { type: String, required: true },
  salary: { type: String },
  experienceLevel: { type: String },
  skillsRequired: [{ type: String }],
  description: { type: String, required: true },
  responsibilities: { type: String },
  vacancy: { type: Number, default: 1 },
  lastDate: { type: Date },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Active', 'Closed'], default: 'Active' }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
