import { Request, Response } from 'express';
import { Doctor } from '../types/doctor';
import { readJson } from '../storage/jsonSotre';

export function listDoctors(_req: Request, res: Response): void {
    const doctors = readJson<Doctor>('doctors.json');
    res.json(doctors);
}