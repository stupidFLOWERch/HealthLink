import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { BookingStateService } from '../../services/booking-state.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctor-list',
  imports: [CommonModule],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList implements OnInit {
  private doctorService = inject(DoctorService);
  private bookingState = inject(BookingStateService);

  doctors = signal<Doctor[]>([]);
  loadError = signal<string | null>(null);

  bookingStateRef = this.bookingState;

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loadError.set(null);
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors.set(data);
      },
      error: (err) => {
        console.error('Failed to load doctors:', err);
        this.loadError.set(
          err?.error?.error ?? 'Failed to load doctors. Please try again.'
        );
      },
    });
  }

  onBook(doctor: Doctor): void {
    this.bookingState.openBooking(doctor);
  }
}