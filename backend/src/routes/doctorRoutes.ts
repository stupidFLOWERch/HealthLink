import { Router } from 'express';
import { listDoctors } from '../controllers/doctorController';

const router = Router();
router.get('/', listDoctors);

export default router;