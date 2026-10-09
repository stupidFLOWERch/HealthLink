import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);   // ← 加

  doctors: Doctor[] = [];
  bookingStateRef = this.bookingState;

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        console.log('doctors from API:', data);
        this.doctors = data;
        this.cdr.detectChanges();   // ← 加
      },
      error: (err) => {
        console.error('API error:', err);
      },
    });
  }

  onBook(doctor: Doctor): void {
    this.bookingState.openBooking(doctor);
  }
}