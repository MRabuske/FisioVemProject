import { Patient, Physiotherapist, Appointment, Review } from '@/types';

export const mockPatients: Patient[] = [
  {
    id: 'pat_001',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 99999-0001',
    address: 'Rua das Flores, 123, São Paulo - SP',
    userType: 'patient',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    medicalHistory: 'Recuperação pós-cirúrgica do joelho',
    emergencyContact: {
      name: 'João Silva',
      phone: '(11) 88888-0001',
      relationship: 'Esposo'
    },
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'pat_002',
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    phone: '(11) 99999-0002',
    address: 'Av. Paulista, 456, São Paulo - SP',
    userType: 'patient',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    medicalHistory: 'Dores crônicas nas costas',
    createdAt: new Date('2024-02-10'),
  }
];

export const mockPhysiotherapists: Physiotherapist[] = [
  {
    id: 'physio_001',
    name: 'Dr. Ana Beatriz',
    email: 'ana.beatriz@fisiovem.com',
    phone: '(11) 99999-1001',
    address: 'Clínica FisioVem, São Paulo - SP',
    userType: 'physiotherapist',
    profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    specialties: ['Ortopedia', 'Geriatria', 'Neurologia'],
    credentials: ['CREFITO-3: 12345-F', 'Especialização em Gerontologia'],
    experience: 8,
    pricePerSession: 120.00,
    rating: 4.8,
    totalReviews: 147,
    availability: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '18:00' },
      { dayOfWeek: 2, startTime: '08:00', endTime: '18:00' },
      { dayOfWeek: 3, startTime: '08:00', endTime: '18:00' },
      { dayOfWeek: 4, startTime: '08:00', endTime: '18:00' },
      { dayOfWeek: 5, startTime: '08:00', endTime: '17:00' }
    ],
    isVerified: true,
    bio: 'Especialista em tratamento fisioterapeutico com foco em idosos e pacientes em recuperação pós-operatória, Realizo atendimento domiciliar.',
    createdAt: new Date('2023-06-01'),
  },
  {
    id: 'physio_002',
    name: 'Dr. Rafael Costa',
    email: 'rafael.costa@fisiovem.com',
    phone: '(11) 99999-1002',
    address: 'Clínica FisioVem, São Paulo - SP',
    userType: 'physiotherapist',
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    specialties: ['Esportiva', 'Ortopedia', 'RPG'],
    credentials: ['CREFITO-3: 23456-F', 'Especialização em Fisioterapia Esportiva'],
    experience: 5,
    pricePerSession: 100.00,
    rating: 4.6,
    totalReviews: 89,
    availability: [
      { dayOfWeek: 0, startTime: '09:00', endTime: '16:00' },
      { dayOfWeek: 2, startTime: '08:00', endTime: '18:00' },
      { dayOfWeek: 4, startTime: '08:00', endTime: '18:00' },
      { dayOfWeek: 6, startTime: '08:00', endTime: '14:00' }
    ],
    isVerified: true,
    bio: 'Fisioterapeuta especializado em lesões esportivas e reabilitação ortopédica.',
    createdAt: new Date('2023-08-15'),
  },
  {
    id: 'physio_003',
    name: 'Dra. Letícia Oliveira',
    email: 'leticia.oliveira@fisiovem.com',
    phone: '(11) 99999-1003',
    address: 'Clínica FisioVem, São Paulo - SP',
    userType: 'physiotherapist',
    profileImage: 'https://images.unsplash.com/photo-1594824375474-87549b7d6638?w=150&h=150&fit=crop&crop=face',
    specialties: ['Neurologia', 'Pediatria', 'Respiratória'],
    credentials: ['CREFITO-3: 34567-F', 'Mestrado em Neuroreabilitação'],
    experience: 12,
    pricePerSession: 150.00,
    rating: 4.9,
    totalReviews: 203,
    availability: [
      { dayOfWeek: 1, startTime: '07:00', endTime: '19:00' },
      { dayOfWeek: 3, startTime: '07:00', endTime: '19:00' },
      { dayOfWeek: 5, startTime: '07:00', endTime: '17:00' }
    ],
    isVerified: true,
    bio: 'Neurofisioterapeuta com vasta experiência em reabilitação neurológica, Realizo atendimento domiciliar.',
    createdAt: new Date('2023-03-10'),
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'app_001',
    patientId: 'pat_001',
    physiotherapistId: 'physio_001',
    date: new Date('2024-09-30T10:00:00'),
    duration: 60,
    status: 'scheduled',
    price: 120.00,
    address: 'Rua das Flores, 123, São Paulo - SP',
    notes: 'Primeira sessão - avaliação completa',
    createdAt: new Date('2024-09-27'),
  },
  {
    id: 'app_002',
    patientId: 'pat_002',
    physiotherapistId: 'physio_002',
    date: new Date('2024-09-28T14:30:00'),
    duration: 45,
    status: 'completed',
    price: 100.00,
    address: 'Av. Paulista, 456, São Paulo - SP',
    notes: 'Sessão de fortalecimento muscular',
    createdAt: new Date('2024-09-25'),
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev_001',
    appointmentId: 'app_002',
    patientId: 'pat_002',
    physiotherapistId: 'physio_002',
    rating: 5,
    comment: 'Excelente profissional! Muito atencioso e competente. Recomendo!',
    createdAt: new Date('2024-09-28'),
  }
];

export const specialties = [
  'Ortopedia',
  'Geriatria',
  'Neurologia',
  'Esportiva',
  'RPG',
  'Pediatria',
  'Respiratória',
  'Cardiorrespiratória',
  'Aquática',
  'Pilates Clínico'
];