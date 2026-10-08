import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Consultation } from '../models/consultation.model';
import { CONSULTATIONS_SEED } from '../data/consultations.seed';

@Injectable({ providedIn: 'root' })
export class ConsultationService {
  getConsultations(): Observable<Consultation[]> {
    return of(CONSULTATIONS_SEED);
  }

  createConsultation(payload: Partial<Consultation>): Observable<Consultation> {
    const newConsultation: Consultation = {
      id: Date.now(),
      doctorId: payload.doctorId!,
      doctorName: payload.doctorName!,
      specialty: payload.specialty!,
      type: payload.type!,
      preferredTime: payload.preferredTime!,
      reason: payload.reason!,
      status: 'Scheduled',
    };
    return of(newConsultation);
  }
}