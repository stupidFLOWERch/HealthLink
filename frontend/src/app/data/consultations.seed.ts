import { Consultation } from '../models/consultation.model';

export const CONSULTATIONS_SEED: Consultation[] = [
  {
    id: 1,
    doctorId: 1,
    doctorName: 'Dr. Sarah Lim',
    specialty: 'General Practitioner',
    type: 'Chat',
    preferredTime: '2026-10-08T15:30:00',
    reason: 'Fever and sore throat for 2 days',
    status: 'Scheduled',
  },
  {
    id: 2,
    doctorId: 2,
    doctorName: 'Dr. Aiman Rashid',
    specialty: 'Family Medicine',
    type: 'Video',
    preferredTime: '2026-09-08T10:00:00',
    reason: 'Follow-up consultation',
    status: 'Completed',
  },
  {
    id: 3,
    doctorId: 3,
    doctorName: 'Dr. Priya Nair',
    specialty: 'Internal Medicine',
    type: 'Chat',
    preferredTime: '2026-09-02T14:00:00',
    reason: 'Routine health assessment',
    status: 'Completed',
  },
];