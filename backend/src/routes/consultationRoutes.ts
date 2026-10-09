import { Router } from 'express';
import {
  listConsultations,
  createConsultation,
} from '../controllers/consultationController';

const router = Router();
router.get('/', listConsultations);
router.post('/', createConsultation);

export default router;