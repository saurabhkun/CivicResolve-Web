// Enterprise GovTech Data Model with Multi-Ward Datasets and Detailed Case Dossiers

export const ADMINISTRATIVE_ROLES = [
  {
    id: 'commissioner',
    name: 'Municipal Commissioner',
    jurisdiction: 'City-wide Executive Clearance',
    clearance: 'Tier-1 Executive',
    permissions: {
      canReassign: true,
      canOverrideSLA: true,
      canCertifyResolution: true,
      canExportAudit: true,
      canEscalate: true
    }
  },
  {
    id: 'triage_officer',
    name: 'Zonal Triage Officer (Ward 01 - 04)',
    jurisdiction: 'Zonal Intake & Dispatch',
    clearance: 'Tier-2 Operational',
    permissions: {
      canReassign: true,
      canOverrideSLA: false,
      canCertifyResolution: false,
      canExportAudit: true,
      canEscalate: true
    }
  },
  {
    id: 'crew_supervisor',
    name: 'Field Crew Supervisor (Public Works)',
    jurisdiction: 'Field Work Orders & Execution',
    clearance: 'Tier-3 Field Ops',
    permissions: {
      canReassign: false,
      canOverrideSLA: false,
      canCertifyResolution: true,
      canExportAudit: false,
      canEscalate: false
    }
  },
  {
    id: 'auditor',
    name: 'Public Records Inspector & Auditor',
    jurisdiction: 'Transparency & Oversight',
    clearance: 'Independent Audit',
    permissions: {
      canReassign: false,
      canOverrideSLA: false,
      canCertifyResolution: false,
      canExportAudit: true,
      canEscalate: false
    }
  }
];

export const WARDS_DIRECTORY = [
  { id: 'all', name: 'All Wards (City-wide)', totalCases: 1842, activeCases: 180, slaBreaches: 14 },
  { id: 'ward-1', name: 'Ward 01: Downtown Commercial', totalCases: 540, activeCases: 52, slaBreaches: 4 },
  { id: 'ward-2', name: 'Ward 02: North Industrial Corridor', totalCases: 480, activeCases: 48, slaBreaches: 5 },
  { id: 'ward-3', name: 'Ward 03: Westside Residential & Parks', totalCases: 460, activeCases: 44, slaBreaches: 3 },
  { id: 'ward-4', name: 'Ward 04: South Riverfront Logistics', totalCases: 362, activeCases: 36, slaBreaches: 2 }
];

export const CONTRACTOR_UNITS = [
  { id: 'pru-alpha', name: 'Public Works Division Alpha (Heavy Machinery)' },
  { id: 'elec-grid-02', name: 'Municipal Grid & High-Voltage Unit 02' },
  { id: 'san-team-04', name: 'Sanitation Logistics & Solid Waste Fleet 04' },
  { id: 'water-rapid', name: 'Emergency Water Board Rapid Response Team' },
  { id: 'parks-forestry', name: 'Urban Forestry & Hazard Removal Brigade' }
];

export const INITIAL_METRICS_BY_WARD = {
  all: [
    { id: 'total', title: 'Total Lodged Complaints', value: 1842, change: '+14.2%', changeType: 'positive', timeframe: 'Fiscal Period 2026-Q3' },
    { id: 'pending', title: 'Pending Triage & Intake', value: 38, change: '-5.1%', changeType: 'positive', timeframe: 'Under 24h SLA' },
    { id: 'progress', title: 'Active Work Orders', value: 142, change: '+8.3%', changeType: 'neutral', timeframe: 'Field Crew Dispatch' },
    { id: 'resolved', title: 'Closed & Certified Cases', value: 1662, change: '90.2%', changeType: 'positive', timeframe: 'Compliance Target' },
    { id: 'urgent', title: 'SLA Risk & Breaches', value: 14, change: '4 Past 48h', changeType: 'negative', timeframe: 'Immediate Action' },
    { id: 'today', title: 'Daily Submissions Log', value: 27, change: '+6.4%', changeType: 'positive', timeframe: 'Recorded Today' }
  ],
  'ward-1': [
    { id: 'total', title: 'Total Lodged Complaints', value: 540, change: '+11.0%', changeType: 'positive', timeframe: 'Ward 01 Central' },
    { id: 'pending', title: 'Pending Triage & Intake', value: 12, change: '-3.2%', changeType: 'positive', timeframe: 'Under 24h SLA' },
    { id: 'progress', title: 'Active Work Orders', value: 40, change: '+5.0%', changeType: 'neutral', timeframe: 'Field Crew Dispatch' },
    { id: 'resolved', title: 'Closed & Certified Cases', value: 488, change: '90.4%', changeType: 'positive', timeframe: 'Compliance Target' },
    { id: 'urgent', title: 'SLA Risk & Breaches', value: 4, change: '1 Past 48h', changeType: 'negative', timeframe: 'Immediate Action' },
    { id: 'today', title: 'Daily Submissions Log', value: 9, change: '+4.1%', changeType: 'positive', timeframe: 'Recorded Today' }
  ],
  'ward-2': [
    { id: 'total', title: 'Total Lodged Complaints', value: 480, change: '+16.5%', changeType: 'positive', timeframe: 'Ward 02 Industrial' },
    { id: 'pending', title: 'Pending Triage & Intake', value: 11, change: '-2.0%', changeType: 'positive', timeframe: 'Under 24h SLA' },
    { id: 'progress', title: 'Active Work Orders', value: 37, change: '+9.2%', changeType: 'neutral', timeframe: 'Field Crew Dispatch' },
    { id: 'resolved', title: 'Closed & Certified Cases', value: 432, change: '90.0%', changeType: 'positive', timeframe: 'Compliance Target' },
    { id: 'urgent', title: 'SLA Risk & Breaches', value: 5, change: '2 Past 48h', changeType: 'negative', timeframe: 'Immediate Action' },
    { id: 'today', title: 'Daily Submissions Log', value: 8, change: '+7.3%', changeType: 'positive', timeframe: 'Recorded Today' }
  ],
  'ward-3': [
    { id: 'total', title: 'Total Lodged Complaints', value: 460, change: '+8.2%', changeType: 'positive', timeframe: 'Ward 03 Residential' },
    { id: 'pending', title: 'Pending Triage & Intake', value: 9, change: '-6.4%', changeType: 'positive', timeframe: 'Under 24h SLA' },
    { id: 'progress', title: 'Active Work Orders', value: 35, change: '+4.1%', changeType: 'neutral', timeframe: 'Field Crew Dispatch' },
    { id: 'resolved', title: 'Closed & Certified Cases', value: 416, change: '90.4%', changeType: 'positive', timeframe: 'Compliance Target' },
    { id: 'urgent', title: 'SLA Risk & Breaches', value: 3, change: '1 Past 48h', changeType: 'negative', timeframe: 'Immediate Action' },
    { id: 'today', title: 'Daily Submissions Log', value: 6, change: '+3.2%', changeType: 'positive', timeframe: 'Recorded Today' }
  ],
  'ward-4': [
    { id: 'total', title: 'Total Lodged Complaints', value: 362, change: '+12.1%', changeType: 'positive', timeframe: 'Ward 04 Riverfront' },
    { id: 'pending', title: 'Pending Triage & Intake', value: 6, change: '-8.0%', changeType: 'positive', timeframe: 'Under 24h SLA' },
    { id: 'progress', title: 'Active Work Orders', value: 30, change: '+6.5%', changeType: 'neutral', timeframe: 'Field Crew Dispatch' },
    { id: 'resolved', title: 'Closed & Certified Cases', value: 326, change: '90.1%', changeType: 'positive', timeframe: 'Compliance Target' },
    { id: 'urgent', title: 'SLA Risk & Breaches', value: 2, change: '0 Past 48h', changeType: 'positive', timeframe: 'Immediate Action' },
    { id: 'today', title: 'Daily Submissions Log', value: 4, change: '+2.0%', changeType: 'positive', timeframe: 'Recorded Today' }
  ]
};

export const WEEKLY_ACTIVITY_DATA_BY_WARD = {
  all: [
    { day: 'Mon', date: 'Aug 11', submitted: 42, resolved: 36 },
    { day: 'Tue', date: 'Aug 12', submitted: 58, resolved: 49 },
    { day: 'Wed', date: 'Aug 13', submitted: 65, resolved: 54 },
    { day: 'Thu', date: 'Aug 14', submitted: 52, resolved: 60 },
    { day: 'Fri', date: 'Aug 15', submitted: 74, resolved: 68 },
    { day: 'Sat', date: 'Aug 16', submitted: 38, resolved: 45 },
    { day: 'Sun', date: 'Aug 17', submitted: 31, resolved: 39 }
  ],
  'ward-1': [
    { day: 'Mon', date: 'Aug 11', submitted: 12, resolved: 10 },
    { day: 'Tue', date: 'Aug 12', submitted: 18, resolved: 15 },
    { day: 'Wed', date: 'Aug 13', submitted: 20, resolved: 16 },
    { day: 'Thu', date: 'Aug 14', submitted: 15, resolved: 18 },
    { day: 'Fri', date: 'Aug 15', submitted: 22, resolved: 20 },
    { day: 'Sat', date: 'Aug 16', submitted: 11, resolved: 14 },
    { day: 'Sun', date: 'Aug 17', submitted: 9, resolved: 12 }
  ],
  'ward-2': [
    { day: 'Mon', date: 'Aug 11', submitted: 11, resolved: 9 },
    { day: 'Tue', date: 'Aug 12', submitted: 15, resolved: 13 },
    { day: 'Wed', date: 'Aug 13', submitted: 17, resolved: 14 },
    { day: 'Thu', date: 'Aug 14', submitted: 14, resolved: 16 },
    { day: 'Fri', date: 'Aug 15', submitted: 20, resolved: 18 },
    { day: 'Sat', date: 'Aug 16', submitted: 10, resolved: 12 },
    { day: 'Sun', date: 'Aug 17', submitted: 8, resolved: 10 }
  ],
  'ward-3': [
    { day: 'Mon', date: 'Aug 11', submitted: 10, resolved: 9 },
    { day: 'Tue', date: 'Aug 12', submitted: 14, resolved: 12 },
    { day: 'Wed', date: 'Aug 13', submitted: 16, resolved: 13 },
    { day: 'Thu', date: 'Aug 14', submitted: 13, resolved: 15 },
    { day: 'Fri', date: 'Aug 15', submitted: 18, resolved: 17 },
    { day: 'Sat', date: 'Aug 16', submitted: 9, resolved: 11 },
    { day: 'Sun', date: 'Aug 17', submitted: 8, resolved: 9 }
  ],
  'ward-4': [
    { day: 'Mon', date: 'Aug 11', submitted: 9, resolved: 8 },
    { day: 'Tue', date: 'Aug 12', submitted: 11, resolved: 9 },
    { day: 'Wed', date: 'Aug 13', submitted: 12, resolved: 11 },
    { day: 'Thu', date: 'Aug 14', submitted: 10, resolved: 11 },
    { day: 'Fri', date: 'Aug 15', submitted: 14, resolved: 13 },
    { day: 'Sat', date: 'Aug 16', submitted: 8, resolved: 8 },
    { day: 'Sun', date: 'Aug 17', submitted: 6, resolved: 8 }
  ]
};

export const STATUS_DISTRIBUTION_DATA = [
  { id: 'urgent', label: 'Urgent / SLA Breach', count: 38, color: '#DC2626' },
  { id: 'progress', label: 'Active Field Execution', count: 142, color: '#1D4ED8' },
  { id: 'review', label: 'Zonal Review & Audit', count: 52, color: '#D97706' },
  { id: 'resolved', label: 'Resolved & Certified', count: 1240, color: '#16A34A' }
];

export const RECENT_REPORTS_DETAILED = [
  {
    id: 'CR-2026-8942',
    wardId: 'ward-1',
    wardName: 'Ward 01: Downtown Commercial',
    title: 'Severe Pavement Cavity & Asphalt Structural Subsidence',
    category: 'Road Infrastructure',
    status: 'urgent',
    priority: 'High',
    location: 'Sector 4, 5th Avenue Main Commercial Intersection',
    geoCoordinates: '40.7128° N, 74.0060° W (Plot 14-B)',
    timestamp: '2026-08-17 17:15:22 UTC',
    reporter: 'Marcus Vance',
    reporterUid: 'CIT-NY-8841',
    reporterPhone: '+1 (555) 019-8841 (Verified Citizen ID)',
    assignedDepartment: 'Public Works Dept (Div 1)',
    assignedContractor: 'Public Works Division Alpha (Heavy Machinery)',
    contractorUnitId: 'pru-alpha',
    slaRemaining: '3h 45m',
    slaTargetHours: 24,
    description: 'A deep road cavity measuring approximately 1.4m across and 25cm deep has formed following subterranean stormwater pipe leakage. High vehicular risk during evening transit peak.',
    evidencePhotos: [
      {
        id: 'ev-1',
        title: 'Initial Citizen Photographic Submission',
        timestamp: '2026-08-17 17:15 UTC',
        exifData: 'GPS: 40.7128, -74.0060 | Shutter: 1/500s | Verified Non-Tampered',
        caption: 'Cavity perimeter with visible sub-base collapse along bus lane.'
      },
      {
        id: 'ev-2',
        title: 'Field Triage Survey Confirmation',
        timestamp: '2026-08-17 17:30 UTC',
        exifData: 'GPS: 40.7128, -74.0060 | Officer ID: SEC-8012',
        caption: 'Municipal safety bollards deployed; road barrier perimeter established.'
      }
    ],
    auditTrail: [
      {
        id: 'aud-1',
        timestamp: '2026-08-17 17:15:22 UTC',
        actor: 'Citizen Mobile App Gateway',
        actorRole: 'Automated Inflow',
        action: 'Grievance Intake Registered',
        details: 'Grievance lodged via mobile GPS intake. Ticket token CR-2026-8942 generated.'
      },
      {
        id: 'aud-2',
        timestamp: '2026-08-17 17:22:10 UTC',
        actor: 'Officer J. Higgins (UID: OFF-4412)',
        actorRole: 'Zonal Triage Officer',
        action: 'Severity Upgraded to High / Urgent',
        details: 'Assessed traffic hazard rating: Class A. SLA response window set to 24h.'
      },
      {
        id: 'aud-3',
        timestamp: '2026-08-17 17:45:00 UTC',
        actor: 'Officer J. Higgins (UID: OFF-4412)',
        actorRole: 'Zonal Triage Officer',
        action: 'Work Order Dispatched to Contractor',
        details: 'Dispatched to Public Works Division Alpha. Asphalt milling & hot-mix crew notified.'
      }
    ]
  },
  {
    id: 'CR-2026-8941',
    wardId: 'ward-1',
    wardName: 'Ward 01: Downtown Commercial',
    title: 'Non-Functional Sodium Vapor Streetlights (6 Consecutive Units)',
    category: 'Public Lighting',
    status: 'progress',
    priority: 'Medium',
    location: 'Westside Promenade, Block C Corridor',
    geoCoordinates: '40.7145° N, 74.0082° W (Poles #104-110)',
    timestamp: '2026-08-17 16:30:15 UTC',
    reporter: 'Elena Rostova',
    reporterUid: 'CIT-NY-4120',
    reporterPhone: '+1 (555) 014-4120 (Verified Citizen ID)',
    assignedDepartment: 'Municipal Electrical Board',
    assignedContractor: 'Municipal Grid & High-Voltage Unit 02',
    contractorUnitId: 'elec-grid-02',
    slaRemaining: '18h 20m',
    slaTargetHours: 48,
    description: 'Complete blackout of 6 consecutive light poles along pedestrian promenade. Feeder circuit breaker tripping reported by neighborhood security patrol.',
    evidencePhotos: [
      {
        id: 'ev-1',
        title: 'Corridor Night Lighting Survey',
        timestamp: '2026-08-17 16:30 UTC',
        exifData: 'GPS: 40.7145, -74.0082 | Sensor: Lux Level 0.2',
        caption: 'Dark pedestrian walkway between 4th and 6th cross streets.'
      }
    ],
    auditTrail: [
      {
        id: 'aud-1',
        timestamp: '2026-08-17 16:30:15 UTC',
        actor: 'Citizen Web Portal',
        actorRole: 'Automated Inflow',
        action: 'Grievance Intake Registered',
        details: 'Report registered under Public Lighting category.'
      },
      {
        id: 'aud-2',
        timestamp: '2026-08-17 16:45:00 UTC',
        actor: 'Dispatcher D. Vance (UID: OFF-3390)',
        actorRole: 'Triage Dispatcher',
        action: 'Assigned to Municipal Grid Unit',
        details: 'Assigned to Electrical Board Unit 02 for transformer and underground conduit diagnostic.'
      }
    ]
  },
  {
    id: 'CR-2026-8940',
    wardId: 'ward-3',
    wardName: 'Ward 03: Westside Residential & Parks',
    title: 'Uncollected Municipal Solid Waste Accumulation & Spillage',
    category: 'Sanitation & Waste',
    status: 'pending',
    priority: 'Medium',
    location: 'Greenwood Park Block B, Community Recreation Gate',
    geoCoordinates: '40.7290° N, 74.0120° W (Bin Complex 3)',
    timestamp: '2026-08-17 15:45:00 UTC',
    reporter: 'Devon Keith',
    reporterUid: 'CIT-NY-9022',
    reporterPhone: '+1 (555) 018-9022 (Verified Citizen ID)',
    assignedDepartment: 'Sanitation Unit 04',
    assignedContractor: 'Sanitation Logistics & Solid Waste Fleet 04',
    contractorUnitId: 'san-team-04',
    slaRemaining: '7h 10m',
    slaTargetHours: 24,
    description: 'Overflowing commercial waste receptacles blocking pedestrian ramp. Two scheduled collection cycles missed due to fleet route maintenance.',
    evidencePhotos: [
      {
        id: 'ev-1',
        title: 'Waste Bin Receptacle Overflow',
        timestamp: '2026-08-17 15:45 UTC',
        exifData: 'GPS: 40.7290, -74.0120 | Geo-Tag Verified',
        caption: 'Overfilled public refuse containers adjacent to recreation boundary.'
      }
    ],
    auditTrail: [
      {
        id: 'aud-1',
        timestamp: '2026-08-17 15:45:00 UTC',
        actor: 'Citizen Mobile App',
        actorRole: 'Automated Inflow',
        action: 'Grievance Intake Registered',
        details: 'Report filed with geo-tagged photographic evidence.'
      },
      {
        id: 'aud-2',
        timestamp: '2026-08-17 16:00:12 UTC',
        actor: 'System Auto-Triage Ruleset',
        actorRole: 'Automated Queue',
        action: 'Categorized to Ward 03 Sanitation',
        details: 'Routed to Sanitation Logistics Fleet 04 for evening collection queue.'
      }
    ]
  },
  {
    id: 'CR-2026-8939',
    wardId: 'ward-2',
    wardName: 'Ward 02: North Industrial Corridor',
    title: 'Potable Water Distribution Main Pipe Rupture & Sub-Base Washout',
    category: 'Water Supply',
    status: 'urgent',
    priority: 'High',
    location: 'Civic Center Boulevard & 3rd Industrial Avenue',
    geoCoordinates: '40.7380° N, 74.0200° W (Main Valve Box 8)',
    timestamp: '2026-08-17 14:10:08 UTC',
    reporter: 'Aisha Patel',
    reporterUid: 'CIT-NY-3319',
    reporterPhone: '+1 (555) 012-3319 (Verified Citizen ID)',
    assignedDepartment: 'Emergency Water Board',
    assignedContractor: 'Emergency Water Board Rapid Response Team',
    contractorUnitId: 'water-rapid',
    slaRemaining: '1h 15m',
    slaTargetHours: 12,
    description: 'High-pressure 12-inch potable water main fracture. Surface flooding over 200 meters of industrial roadway; adjacent industrial facilities reporting pressure drop below 1.5 bar.',
    evidencePhotos: [
      {
        id: 'ev-1',
        title: 'Water Main Rupture & Surface Pooling',
        timestamp: '2026-08-17 14:10 UTC',
        exifData: 'GPS: 40.7380, -74.0200 | Camera ID: SEC-MOBI-3',
        caption: 'Active pressurized water discharge across two arterial lanes.'
      }
    ],
    auditTrail: [
      {
        id: 'aud-1',
        timestamp: '2026-08-17 14:10:08 UTC',
        actor: 'Citizen Emergency Hotline Interface',
        actorRole: 'Hotline Operator',
        action: 'Priority Emergency Logged',
        details: 'Escalated to Emergency Water Board as Tier-1 Infrastructure Incident.'
      },
      {
        id: 'aud-2',
        timestamp: '2026-08-17 14:18:30 UTC',
        actor: 'Supervisor K. Walsh (UID: SUP-1002)',
        actorRole: 'Emergency Dispatcher',
        action: 'Isolation Valve Protocol Initiated',
        details: 'Hydraulic engineers dispatched to shut off Zone 8 isolation valve.'
      }
    ]
  },
  {
    id: 'CR-2026-8938',
    wardId: 'ward-4',
    wardName: 'Ward 04: South Riverfront Logistics',
    title: 'Obstructed Traffic Signal View by Overhanging Heavy Foliage',
    category: 'Public Safety',
    status: 'resolved',
    priority: 'Low',
    location: 'Northern Crossway & 9th Ave Riverfront',
    geoCoordinates: '40.7050° N, 74.0150° W (Signal Post 22)',
    timestamp: '2026-08-17 12:00:00 UTC',
    reporter: 'Kenji Sato',
    reporterUid: 'CIT-NY-6711',
    reporterPhone: '+1 (555) 016-6711 (Verified Citizen ID)',
    assignedDepartment: 'Urban Forestry Division',
    assignedContractor: 'Urban Forestry & Hazard Removal Brigade',
    contractorUnitId: 'parks-forestry',
    slaRemaining: 'Completed',
    slaTargetHours: 72,
    description: 'Mature tree branches hanging lower than 3 meters directly obscuring signal head for southbound riverfront logistics trucks.',
    evidencePhotos: [
      {
        id: 'ev-1',
        title: 'Before Pruning: Obstructed Traffic Light',
        timestamp: '2026-08-17 12:00 UTC',
        exifData: 'GPS: 40.7050, -74.0150 | Sightline Distance: 15m',
        caption: 'Overgrown oak branches covering green and yellow signal indicators.'
      },
      {
        id: 'ev-2',
        title: 'After Clearance: Certified Work Completion',
        timestamp: '2026-08-17 16:45 UTC',
        exifData: 'GPS: 40.7050, -74.0150 | Inspector ID: FOR-901',
        caption: 'Foliage cleared with 6m clearance buffer. Signal certified visible from 80m.'
      }
    ],
    auditTrail: [
      {
        id: 'aud-1',
        timestamp: '2026-08-17 12:00:00 UTC',
        actor: 'Citizen Mobile App',
        actorRole: 'Automated Inflow',
        action: 'Report Registered',
        details: 'Case logged under Urban Forestry & Public Safety.'
      },
      {
        id: 'aud-2',
        timestamp: '2026-08-17 13:30:00 UTC',
        actor: 'Officer R. Chen (UID: OFF-5501)',
        actorRole: 'Zonal Forestry Officer',
        action: 'Field Crew Dispatched',
        details: 'Bucket truck unit dispatched to site.'
      },
      {
        id: 'aud-3',
        timestamp: '2026-08-17 16:45:00 UTC',
        actor: 'Supervisor M. Thorne (UID: SUP-9011)',
        actorRole: 'Field Supervisor',
        action: 'Work Certified & Case Closed',
        details: 'Pruning completed, photographic verification uploaded, resolution logged.'
      }
    ]
  }
];
