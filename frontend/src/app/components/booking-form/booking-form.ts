import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BookingStateService } from '../../services/booking-state.service';
import { ConsultationService } from '../../services/consultation.service';

interface TimeSlot {
  label: string;      // 显示用: "Today, 3:30 PM"
  value: string;      // 提交时保留原样，由 resolvePreferredTime 转 ISO
  disabled: boolean;  // 是否已过期
}

@Component({
  selector: 'app-booking-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingForm {
  protected readonly bookingState = inject(BookingStateService);
  private readonly consultationService = inject(ConsultationService);

  private readonly rawTimeSlots = [
    'Today, 10:00 AM',
    'Today, 11:30 AM',
    'Today, 2:00 PM',
    'Today, 3:30 PM',
    'Today, 6:00 PM',
    'Today, 8:00 PM',
    'Tomorrow, 10:00 AM',
    'Tomorrow, 11:30 AM',
    'Tomorrow, 2:00 PM',
    'Tomorrow, 3:30 PM',
    'Tomorrow, 6:00 PM',
    'Tomorrow, 8:00 PM',
  ];

  // 计算属性：每个 slot 带 disabled 标记
  readonly timeSlots: TimeSlot[] = this.buildTimeSlots();

  private buildTimeSlots(): TimeSlot[] {
    const now = new Date();
    return this.rawTimeSlots.map(label => ({
      label,
      value: label,
      disabled: this.parseLabelToDate(label).getTime() <= now.getTime(),
    }));
  }

  readonly bookingSuccess = signal<boolean>(false);

  readonly bookingForm = new FormGroup({
    consultationType: new FormControl<'Chat' | 'Video'>('Chat', { nonNullable: true }),
    // show first available slot
    preferredTime: new FormControl<string>(this.firstAvailableSlot(), { nonNullable: true }),
    reason: new FormControl<string>('Fever and sore throat for 2 days...', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)],
    }),
  });

  private firstAvailableSlot(): string {
    return this.timeSlots.find(s => !s.disabled)?.value ?? this.rawTimeSlots[this.rawTimeSlots.length - 1];
  }

  setType(type: 'Chat' | 'Video'): void {
    this.bookingForm.controls.consultationType.setValue(type);
  }

  get reasonLength(): number {
    return this.bookingForm.controls.reason.value.length;
  }

  close(): void {
    this.bookingState.closeBooking();
  }

  confirmBooking(): void {
    const doctor = this.bookingState.selectedDoctor();
    if (!doctor) return;

    const values = this.bookingForm.getRawValue();
    this.consultationService.createConsultation({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      type: values.consultationType,
      preferredTime: this.resolvePreferredTime(values.preferredTime),
      reason: values.reason,
    }).subscribe(() => {
      this.bookingState.notifyConsultationCreated();
      this.bookingSuccess.set(true);
      setTimeout(() => {
        this.bookingSuccess.set(false);
        this.close();
      }, 3000);
    });
  }

  private parseLabelToDate(label: string): Date {
    const [dayPart, timePart] = label.split(', ');
    const base = new Date();
    if (dayPart === 'Tomorrow') base.setDate(base.getDate() + 1);

    const [time, meridiem] = timePart.split(' ');
    const [hourStr, minuteStr] = time.split(':');
    let hour = parseInt(hourStr, 10);
    if (meridiem === 'PM' && hour !== 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;

    base.setHours(hour, parseInt(minuteStr, 10), 0, 0);
    return base;
  }

  private resolvePreferredTime(label: string): string {
    return this.parseLabelToDate(label).toISOString();
  }
}