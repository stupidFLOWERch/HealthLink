import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '../../services/consultation.service';
import { Consultation } from '../../models/consultation.model';

@Component({
  imports: [CommonModule],
  selector: 'app-my-consultations',
  styleUrl: './my-consultations.css',
  templateUrl: './my-consultations.html',
})
export class MyConsultations implements OnInit {
  private consultationService = inject(ConsultationService);
  private cdr = inject(ChangeDetectorRef);

  consultations: Consultation[] = [];

  ngOnInit(): void {
    this.consultationService.getConsultations().subscribe({
      next: (data) => {
        console.log('consultations from API:', data);
        this.consultations = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('API error:', err);
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
