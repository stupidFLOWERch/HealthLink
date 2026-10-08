import { Doctor } from '../models/doctor.model';

export const DOCTORS_SEED: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Lim',
    specialty: 'General Practitioner',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. Aiman Rashid',
    specialty: 'Family Medicine',
    available: true,
  },
  {
    id: 3,
    name: 'Dr. Priya Nair',
    specialty: 'Internal Medicine',
    available: true,
  },
];