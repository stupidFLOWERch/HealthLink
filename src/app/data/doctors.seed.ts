import { Doctor } from '../models/doctor.model';

export const DOCTORS_SEED: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Lim',
    specialty: 'General Practitioner',
    available: true,
    photoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23dbeafe"/><stop offset="100%" stop-color="%23e0f2fe"/></linearGradient></defs><rect width="100" height="100" rx="50" fill="url(%23bg1)"/><circle cx="50" cy="42" r="20" fill="%23fed7aa"/><path d="M30 38 Q50 20 70 38 Q68 22 50 22 Q32 22 30 38Z" fill="%231e293b"/><path d="M30 40 Q28 55 35 60 Q32 45 35 40" fill="%231e293b"/><path d="M70 40 Q72 55 65 60 Q68 45 65 40" fill="%231e293b"/><circle cx="43" cy="40" r="2.2" fill="%231e293b"/><circle cx="57" cy="40" r="2.2" fill="%231e293b"/><path d="M46 48 Q50 52 54 48" stroke="%23b45309" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22 96 C22 75 35 68 50 68 C65 68 78 75 78 96 Z" fill="%23ffffff"/><path d="M42 68 L50 78 L58 68 Z" fill="%230284c7"/><path d="M38 72 Q36 85 45 88 Q50 89 54 86" stroke="%230369a1" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="55" cy="86" r="3.5" fill="%2364748b"/></svg>',
  },
  {
    id: 2,
    name: 'Dr. Aiman Rashid',
    specialty: 'Family Medicine',
    available: true,
    photoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23fed7aa"/><stop offset="100%" stop-color="%23ffedd5"/></linearGradient></defs><rect width="100" height="100" rx="50" fill="url(%23bg2)"/><circle cx="50" cy="42" r="19" fill="%23fed7aa"/><path d="M32 34 Q50 20 68 34 Q66 23 50 23 Q34 23 32 34Z" fill="%230f172a"/><rect x="37" y="36" width="10" height="8" rx="2" stroke="%23334155" stroke-width="1.8" fill="none"/><rect x="53" y="36" width="10" height="8" rx="2" stroke="%23334155" stroke-width="1.8" fill="none"/><line x1="47" y1="40" x2="53" y2="40" stroke="%23334155" stroke-width="1.8"/><circle cx="42" cy="40" r="1.5" fill="%230f172a"/><circle cx="58" cy="40" r="1.5" fill="%230f172a"/><path d="M45 48 Q50 52 55 48" stroke="%239a3412" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22 96 C22 75 35 66 50 66 C65 66 78 75 78 96 Z" fill="%23ffffff"/><polygon points="46,66 54,66 52,80 50,83 48,80" fill="%230284c7"/><path d="M35 66 L50 82 L65 66" stroke="%23cbd5e1" stroke-width="1.5" fill="none"/></svg>',
  },
  {
    id: 3,
    name: 'Dr. Priya Nair',
    specialty: 'Internal Medicine',
    available: true,
    photoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23e0e7ff"/><stop offset="100%" stop-color="%23ede9fe"/></linearGradient></defs><rect width="100" height="100" rx="50" fill="url(%23bg3)"/><circle cx="50" cy="42" r="19" fill="%23fcd34d"/><path d="M28 42 C28 20 72 20 72 42 C68 25 32 25 28 42 Z" fill="%2318181b"/><path d="M28 40 Q26 56 32 62 Q30 50 32 40" fill="%2318181b"/><path d="M72 40 Q74 56 68 62 Q70 50 68 40" fill="%2318181b"/><circle cx="43" cy="41" r="2.2" fill="%2318181b"/><circle cx="57" cy="41" r="2.2" fill="%2318181b"/><circle cx="50" cy="37" r="1.5" fill="%23dc2626"/><path d="M45 49 Q50 53 55 49" stroke="%23b45309" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22 96 C22 75 35 68 50 68 C65 68 78 75 78 96 Z" fill="%23ffffff"/><path d="M36 70 Q34 85 45 89 Q52 89 56 86" stroke="%231e3a8a" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="56" cy="86" r="3.5" fill="%23475569"/></svg>',
  },
];