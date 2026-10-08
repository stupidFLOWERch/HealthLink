import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { DOCTORS_SEED } from '../data/doctors.seed';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  readonly selectedDoctor = signal<Doctor | null>(DOCTORS_SEED[1]);
  readonly isBookingOpen = signal<boolean>(true);

  getDoctors(): Observable<Doctor[]> {
    return of(DOCTORS_SEED);
  }

  selectDoctor(doctor: Doctor): void {
    this.selectedDoctor.set(doctor);
    this.isBookingOpen.set(true);
  }

  openBooking(doctor: Doctor): void {
    this.selectedDoctor.set(doctor);
    this.isBookingOpen.set(true);
  }

  closeBooking(): void {
    this.isBookingOpen.set(false);
  }
}