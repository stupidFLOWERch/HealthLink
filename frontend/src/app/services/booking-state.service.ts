import { Injectable, signal } from '@angular/core';
import { Doctor } from '../models/doctor.model';

@Injectable({ providedIn: 'root' })
export class BookingStateService {
  selectedDoctor = signal<Doctor | null>(null);
  isBookingOpen = signal<boolean>(false);

  consultationCreated = signal<number>(0);

  openBooking(doctor: Doctor): void {
    this.selectedDoctor.set(doctor);
    this.isBookingOpen.set(true);
  }

  closeBooking(): void {
    this.isBookingOpen.set(false);
    this.selectedDoctor.set(null);
  }

  notifyConsultationCreated(): void {        
    this.consultationCreated.update((n) => n + 1);
  }
}