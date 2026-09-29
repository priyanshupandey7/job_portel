import express from 'express';
import { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, authorize('seeker'), applyForJob);
router.get('/me', protect, authorize('seeker'), getMyApplications);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);
router.put('/:id', protect, authorize('employer', 'admin'), updateApplicationStatus);

export default router;
