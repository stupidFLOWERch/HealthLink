import { Component, OnInit, inject, effect, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '../../services/consultation.service';
import { BookingStateService } from '../../services/booking-state.service';
import { Consultation } from '../../models/consultation.model';

@Component({
  imports: [CommonModule],
  selector: 'app-my-consultations',
  styleUrl: './my-consultations.css',
  templateUrl: './my-consultations.html',
})
export class MyConsultations implements OnInit {
  private consultationService = inject(ConsultationService);
  private bookingState = inject(BookingStateService);
  private cdr = inject(ChangeDetectorRef);

  consultations: Consultation[] = [];
  loadError = signal<string | null>(null);         // 👈 加

  constructor() {
    effect(() => {
      this.bookingState.consultationCreated();
      this.loadConsultations();
    });
  }

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {                      // 👈 改成 public，给 Retry 用
    this.loadError.set(null);                      // 👈 清旧错误
    this.consultationService.getConsultations().subscribe({
      next: (data) => {                            // 👈 对象形式
        this.consultations = data;
        this.cdr.detectChanges();
      },
      error: (err) => {                            // 👈 加 error
        console.error('Failed to load consultations:', err);
        this.loadError.set(
          err?.error?.error ?? 'Failed to load consultations. Please try again.'
        );
        this.cdr.detectChanges();                  // 👈 手动触发（因为你没换 signal 存 consultations）
      },
    });
  }

  formatTime(timeStr: string): string {
    if (!timeStr) return '';
    if (timeStr.startsWith('Today') || timeStr.startsWith('Tomorrow')) {
      return timeStr;
    }
    try {
      const date = new Date(timeStr);
      if (isNaN(date.getTime())) return timeStr;
      
      const now = new Date();
      const isToday = date.getFullYear() === now.getFullYear() &&
                      date.getMonth() === now.getMonth() &&
                      date.getDate() === now.getDate();

      const timeFormatted = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      if (isToday) {
        return `Today, ${timeFormatted}`;
      }

      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();

      return `${day} ${month} ${year}, ${timeFormatted}`;
    } catch {
      return timeStr;
    }
  }
}
