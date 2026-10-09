import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Consultation } from '../models/consultation.model';

@Injectable({ providedIn: 'root' })
export class ConsultationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}/consultations`);
  }

  createConsultation(payload: Partial<Consultation>): Observable<Consultation[]> {
    return this.http.post<Consultation[]>(`${this.apiUrl}/consultations`, payload);
  }
}