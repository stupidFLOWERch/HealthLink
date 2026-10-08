export type ConsultationType = 'Chat' | 'Video';
export type ConsultationStatus = 'Scheduled' | 'Completed';

export interface Consultation {
  id: number;
  doctorId: number;
  doctorName: string;
  specialty: string;
  type: ConsultationType;
  preferredTime: string;
  reason: string;
  status: ConsultationStatus;
}