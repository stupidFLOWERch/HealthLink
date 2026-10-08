import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { ConsultationService } from '../../services/consultation.service';

@Component({
  selector: 'app-booking-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingForm {
  protected readonly doctorService = inject(DoctorService);
  private readonly consultationService = inject(ConsultationService);

  readonly timeSlots = [
    'Today, 3:30 PM',
    'Today, 4:30 PM',
    'Tomorrow, 10:00 AM',
    'Tomorrow, 2:30 PM',
    'Tomorrow, 4:00 PM',
  ];

  readonly bookingSuccess = signal<boolean>(false);

  readonly bookingForm = new FormGroup({
    consultationType: new FormControl<'Chat' | 'Video'>('Chat', { nonNullable: true }),
    preferredTime: new FormControl<string>('Today, 3:30 PM', { nonNullable: true }),
    reason: new FormControl<string>('Fever and sore throat for 2 days...', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)],
    }),
  });

  setType(type: 'Chat' | 'Video'): void {
    this.bookingForm.controls.consultationType.setValue(type);
  }

  get reasonLength(): number {
    return this.bookingForm.controls.reason.value.length;
  }

  close(): void {
    this.doctorService.closeBooking();
  }

  confirmBooking(): void {
    const doctor = this.doctorService.selectedDoctor();
    if (!doctor) return;

    const values = this.bookingForm.getRawValue();
    this.consultationService.createConsultation({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      type: values.consultationType,
      preferredTime: values.preferredTime,
      reason: values.reason,
    });

    this.bookingSuccess.set(true);
    setTimeout(() => {
      this.bookingSuccess.set(false);
    }, 3000);
  }
}
