import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctor-list',
  imports: [CommonModule],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList implements OnInit {
  protected readonly doctorService = inject(DoctorService);
  doctors: Doctor[] = [];

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });
  }

  selectDoctor(doctor: Doctor): void {
    this.doctorService.selectDoctor(doctor);
  }

  bookConsultation(doctor: Doctor, event: Event): void {
    event.stopPropagation();
    this.doctorService.openBooking(doctor);
  }
}