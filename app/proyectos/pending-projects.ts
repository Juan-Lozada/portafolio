export const pendingProjects = {
  ruta: {
    name: 'Ruta',
    category: ['Operación de flota', 'Fleet operations'],
    description: [
      'Una operación más clara, desde el vehículo hasta su próximo mantenimiento.',
      'Clearer operations, from each vehicle to its next maintenance service.',
    ],
    modules: [
      ['Vehículos', 'Vehicles'],
      ['Mantenimiento', 'Maintenance'],
      ['Seguimiento', 'Tracking'],
    ],
    skills: [
      ['Flujos administrativos', 'Administrative workflows'],
      ['Visualización geográfica', 'Geographic visualization'],
      ['Gestión de estados', 'State management'],
    ],
  },
  mesa: {
    name: 'Mesa',
    category: ['Pagos con QR', 'QR payments'],
    description: [
      'Una experiencia móvil para consultar, dividir y pagar una cuenta con claridad.',
      'A mobile experience to view, split and pay a bill with confidence.',
    ],
    modules: [
      ['Menú digital', 'Digital menu'],
      ['División de cuenta', 'Bill splitting'],
      ['Confirmación de pago', 'Payment confirmation'],
    ],
    skills: [
      ['Diseño móvil', 'Mobile design'],
      ['Validación de formularios', 'Form validation'],
      ['Estados asíncronos', 'Async states'],
    ],
  },
} as const;

export type PendingProjectId = keyof typeof pendingProjects;
