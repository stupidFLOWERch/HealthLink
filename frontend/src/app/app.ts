import { Component, inject } from '@angular/core';
import { DoctorList } from './components/doctor-list/doctor-list';
import { MyConsultations } from './components/my-consultations/my-consultations';
import { Topbar } from './components/topbar/topbar';
import { BookingForm } from './components/booking-form/booking-form';
import { DoctorService } from './services/doctor.service';

@Component({
  imports: [Topbar, DoctorList, MyConsultations, BookingForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly doctorService = inject(DoctorService);
}
