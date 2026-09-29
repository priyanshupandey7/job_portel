import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  logo: { type: String },
  website: { type: String },
  industry: { type: String },
  description: { type: String },
  address: { type: String },
  email: { type: String },
  phone: { type: String }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
export default Company;
