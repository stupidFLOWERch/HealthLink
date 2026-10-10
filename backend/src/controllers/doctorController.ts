import { Request, Response } from 'express';
import { Doctor } from '../types/doctor';
import { readJson } from '../storage/jsonSotre';

export function listDoctors(_req: Request, res: Response): void {
  try {
    const doctors = readJson<Doctor>('doctors.json');
    res.json(doctors);
  } catch (err) {
    console.error('listDoctors failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}