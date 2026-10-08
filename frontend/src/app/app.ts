import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoctorList } from './components/doctor-list/doctor-list';
import { MyConsultations } from './components/my-consultations/my-consultations'

@Component({
  imports: [RouterOutlet, DoctorList, MyConsultations],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
