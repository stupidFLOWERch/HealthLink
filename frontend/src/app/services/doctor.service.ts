import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Doctor } from '../models/doctor.model';


@Injectable({ providedIn: 'root' })
export class DoctorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/doctors`);
  }
}