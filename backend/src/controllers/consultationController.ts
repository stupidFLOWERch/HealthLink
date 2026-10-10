import { Request, Response } from 'express';
import { Consultation, ConsultationType } from '../types/consultation';
import { Doctor } from '../types/doctor';
import { readJson, writeJson } from '../storage/jsonSotre';

export function listConsultations(_req: Request, res: Response): void {
  try {
    const consultations = readJson<Consultation>('consultations.json');
    const sorted = [...consultations].sort(
      (a, b) => new Date(b.preferredTime).getTime() - new Date(a.preferredTime).getTime()
    );
    res.json(sorted);
  } catch (err) {
    console.error('listConsultations failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export function createConsultation(req: Request, res: Response): void {
  try {
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

    const time = new Date(preferredTime);
    if (isNaN(time.getTime())) {
      res.status(400).json({ error: 'Invalid preferredTime format' });
      return;
    }

    if (time.getTime() <= Date.now()) {
      res.status(400).json({ error: 'preferredTime must be in the future' });
      return;
    }

    if (type !== 'Chat' && type !== 'Video') {
      res.status(400).json({ error: 'Invalid consultation type' });
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
  catch (err) {
    console.error('createConsultation failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}