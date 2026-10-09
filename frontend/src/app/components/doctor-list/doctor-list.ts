import { Component, OnInit, inject } from '@angular/core';
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

  doctors: Doctor[] = [];

  bookingStateRef = this.bookingState;
  
  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });
  }

  onBook(doctor: Doctor): void {
    this.bookingState.openBooking(doctor);
  }
}