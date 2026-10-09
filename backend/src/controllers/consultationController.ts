import { Request, Response } from 'express';
import { Consultation, ConsultationType } from '../types/consultation';
import { Doctor } from '../types/doctor';
import { readJson, writeJson } from '../storage/jsonSotre';

export function listConsultations(_req:Request, res:Response): void {
    const consultations = readJson<Consultation>('consultations.json');
    const sorted = [...consultations].sort((a, b) => b.id - a.id);   // ← 按 id 降序
    res.json(sorted);
}

export function createConsultation(req: Request, res: Response): void {
    const { doctorId, type, preferredTime, reason } = req.body as {
      doctorId?: number;
      type?: ConsultationType;
      preferredTime?: string;
      reason?: string;
    };
  
    if (!doctorId || !type || !preferredTime || !reason) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
  
    const doctors = readJson<Doctor>('doctors.json');
    const doctor = doctors.find((d) => d.id === Number(doctorId));
    if (!doctor) {
      res.status(404).json({ error: 'Doctor not found' });
      return;
    }
  
    const consultations = readJson<Consultation>('consultations.json');
    const nextId = consultations.length
      ? Math.max(...consultations.map((c) => c.id)) + 1
      : 1;
  
    const newConsultation: Consultation = {
      id: nextId,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      type,
      preferredTime,
      reason,
      status: 'Scheduled',
    };
  
    consultations.push(newConsultation);
    writeJson('consultations.json', consultations);
  
    res.status(201).json(newConsultation);
  }