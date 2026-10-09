import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './components/topbar/topbar';
import { DoctorList } from './components/doctor-list/doctor-list';
import { MyConsultations } from './components/my-consultations/my-consultations';
import { BookingForm } from './components/booking-form/booking-form';
import { BookingStateService } from './services/booking-state.service';

@Component({
  imports: [RouterOutlet, Topbar, DoctorList, MyConsultations, BookingForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
  bookingStateRef = inject(BookingStateService);   // ← 加这行
}