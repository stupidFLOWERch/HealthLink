import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Consultation } from '../models/consultation.model';
import { CONSULTATIONS_SEED } from '../data/consultations.seed';

@Injectable({ providedIn: 'root' })
export class ConsultationService {
  private consultations$ = new BehaviorSubject<Consultation[]>([...CONSULTATIONS_SEED]);

  getConsultations(): Observable<Consultation[]> {
    return this.consultations$.asObservable();
  }

  createConsultation(payload: Partial<Consultation>): Observable<Consultation> {
    const newConsultation: Consultation = {
      id: Date.now(),
      doctorId: payload.doctorId!,
      doctorName: payload.doctorName!,
      specialty: payload.specialty!,
      type: payload.type || 'Chat',
      preferredTime: payload.preferredTime || new Date().toISOString(),
      reason: payload.reason || '',
      status: 'Scheduled',
    };

    const current = this.consultations$.value;
    this.consultations$.next([newConsultation, ...current]);
    return new BehaviorSubject(newConsultation).asObservable();
  }
}