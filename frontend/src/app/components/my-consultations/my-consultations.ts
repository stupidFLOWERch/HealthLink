import { Component, OnInit, inject, effect, ChangeDetectorRef } from '@angular/core';
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

  constructor() {
    // 监听「提交成功」信号，每次变化就重新拉数据
    effect(() => {
      this.bookingState.consultationCreated();   // 读一下，建立依赖
      this.loadConsultations();
    });
  }

  ngOnInit(): void {
    this.loadConsultations();
  }

  private loadConsultations(): void {
    this.consultationService.getConsultations().subscribe((data) => {
      this.consultations = data;
      this.cdr.detectChanges();
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
