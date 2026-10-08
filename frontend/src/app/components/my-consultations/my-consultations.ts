import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '../../services/consultation.service';
import { Consultation } from '../../models/consultation.model';

@Component({
  imports: [CommonModule],
  selector: 'app-my-consultations',
  styleUrl: './my-consultations.css',
  templateUrl: './my-consultations.html',
})
export class MyConsultations implements OnInit{
  private consultationService = inject(ConsultationService);
  consultations: Consultation[] = [];

  ngOnInit(): void {
    this.consultationService.getConsultations().subscribe((data) => {
      this.consultations = data;
    });
  }
}
