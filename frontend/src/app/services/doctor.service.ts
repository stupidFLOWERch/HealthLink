import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { DOCTORS_SEED } from '../data/doctors.seed';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  getDoctors(): Observable<Doctor[]> {
    return of(DOCTORS_SEED);
  }
}