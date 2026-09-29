import express from 'express';
import { getCompanies, getCompany, createCompany, updateCompany } from '../controllers/companyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCompanies)
  .post(protect, authorize('employer', 'admin'), createCompany);

router.route('/:id')
  .get(getCompany)
  .put(protect, authorize('employer', 'admin'), updateCompany);

export default router;
