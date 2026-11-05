import { Destination, TravelService } from '../types';

export const BUSINESS_INFO = {
  name: 'Safeer E Aman',
  tagline: 'Visa consultancy from Lahore — files, not guarantees',
  mission:
    'Honest visa files, Umrah guidance, and live bookings for families, students, and travellers from Pakistan. We prepare the case; the embassy decides.',
  address: 'Awan Brothers Oil Mills, Raam Pura Stop, Main Grand Trunk Road, Bata Pur, Lahore, Pakistan.',
  phone: '+92 321 8444810',
  whatsappUrl: 'https://wa.me/923218444810',
  email: 'info@safeereaman.com',
  workingHours: 'Monday – Saturday: 10:00 AM – 7:00 PM (PKT)',
};

export const FEATURED_DESTINATIONS: Destination[] = [
  {
    id: 'umrah',
    name: 'Umrah',
    region: 'Hijaz · Saudi Arabia',
    tagline: 'Year-round Umrah: Nusuk, Haram-side hotels, and Haramain transfers',
    overview:
      'Safeer E Aman assists families from Lahore with transparent Umrah planning — visa and Nusuk guidance, flights into Jeddah or Madinah, and hotel options within walking distance of the Haramain. We do not sell packages as guaranteed outcomes; we file documents and bookings honestly.',
    heroImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80',
    ],
    keyHighlights: [
      'Visa / Nusuk steps explained before you pay bookings',
      'Haram-adjacent hotel shortlists by walking time',
      'Haramain High-Speed Train between Jeddah, Makkah, and Madinah',
      'Ziyarat routing for Makkah, Madinah, and Badr when requested',
    ],
    visaGuidance: [
      'Umrah visa / tourist e-Visa eligibility and Nusuk appointment notes',
      'Passport validity, photos, and vaccination requirements as announced',
      'Family travel files and women travelling without a Mahram under current rules',
      'Return itinerary, hotel voucher, and Haramain transfer options',
    ],
    popularHubs: ['Makkah', 'Madinah', 'Jeddah'],
    flightDurationFromPakistan: '~4.5 – 5.5 Hours (Direct flights from Lahore)',
  },
  {
    id: 'hajj',
    name: 'Hajj',
    region: 'Hijaz · Saudi Arabia',
    tagline: 'Quota, Nusuk Hajj, and document order for the pilgrimage season',
    overview:
      'Hajj is a seasonal, quota-based pilgrimage. We guide applicants on Ministry of Religious Affairs / Nusuk Hajj steps, bank and vaccination proofs, and realistic timelines from Lahore. Quotas, lottery outcomes, and Saudi issuance are never guaranteed by a consultant.',
    heroImage: '/images/hajj-kaaba.jpg',
    galleryImages: [
      '/images/hajj-kaaba.jpg',
      'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80',
    ],
    keyHighlights: [
      'Makkah, Mina, Arafat, Muzdalifah, and Madinah sequence',
      'Official Hajj portal and Pakistani quota windows',
      'Group vs independent routes as the season allows',
      'Vaccination, passport, and mahram documentation checks',
    ],
    visaGuidance: [
      'Hajj quota / MoRA or Nusuk Hajj registration windows for Pakistani pilgrims',
      'Passport validity, photos, and meningococcal (and other) vaccination proofs',
      'Bank, CNIC, and family-relationship papers as required that season',
      'Flight and accommodation only after official registration status is clear',
    ],
    popularHubs: ['Makkah', 'Mina', 'Madinah', 'Jeddah'],
    flightDurationFromPakistan: '~4.5 – 5.5 Hours (Seasonal Hajj flights from Lahore)',
  },
  {
    id: 'turkey',
    name: 'Turkey',
    region: 'Eurasia',
    tagline: 'Sticker visa or e-Visa, then Istanbul, Cappadocia, or Antalya',
    overview:
      'From Lahore we check whether you qualify for a Turkish e-Visa (valid Schengen, US, UK, or Irish visa/residence) or must file a sticker visa. Then we align bank proofs, employment ties, insurance, hotel vouchers, and a return itinerary. Sightseeing is planned around a file the consulate can read — not a brochure.',
    heroImage: '/images/turkey-istanbul.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80',
    ],
    keyHighlights: [
      'e-Visa vs sticker-visa eligibility before you book',
      'Istanbul, Cappadocia, Antalya, Trabzon, and Bursa hubs',
      'Trade-fair and visit files with matching itineraries',
      'Insurance, hotel voucher, and return PNR for the visa pack',
    ],
    visaGuidance: [
      'Sticker visa vs e-Visa eligibility (valid Schengen / US / UK / Ireland permit holders)',
      'Bank statements reviewed against embassy checklist and proof of ties in Pakistan',
      'Hotel reservations and confirmed return flight itineraries',
      'Travel health insurance covering the full stay',
    ],
    popularHubs: ['Istanbul', 'Cappadocia', 'Antalya', 'Trabzon', 'Bursa'],
    flightDurationFromPakistan: '~5.5 – 6.5 Hours (Direct & 1-stop flights)',
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    region: 'Western Europe',
    tagline: 'Visit, study, and family files with funds and ties documented',
    overview:
      'UK visitor, student, and family-visit cases fail when funds, purpose, and ties to Pakistan do not match. We review bank and tax papers, invitation or CAS documents, and a travel purpose the officer can follow — then Gerry’s / VAC appointment notes. We do not sell a stamp.',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=800&q=80',
    ],
    keyHighlights: [
      'Standard Visitor (6 months, 2, 5, or 10 years) file order',
      'Study files after you already hold an offer / CAS',
      'Family visit: invitation, relationship proofs, sponsor capacity',
      'London, Manchester, Birmingham, Edinburgh, Glasgow hubs',
    ],
    visaGuidance: [
      'UK Standard Visitor Visa (6 months, 2 years, 5 years, 10 years)',
      'Bank statements, tax returns, and a clear source of funds',
      'Employment, studies, or property that show you return to Pakistan',
      'Travel-purpose papers and biometric appointment scheduling',
    ],
    popularHubs: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'],
    flightDurationFromPakistan: '~8 – 9 Hours (Direct flights available to London/Manchester)',
  },
];

const SCHENGEN_DESTINATION: Destination = {
    id: 'schengen',
    name: 'Schengen Destinations',
    region: 'European Union',
    tagline: 'One visa, 29 countries — if the main stay and itinerary match',
    overview:
      'A Schengen visa is granted by one state for travel across 29. We help you pick the correct embassy (main stay vs first entry), write a day-by-day itinerary, and pack €30,000 medical insurance plus verifiable hotels and tickets. Inconsistent city-hopping is a common refusal; we flag it before you pay the fee.',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=800&q=80',
    ],
    keyHighlights: [
      'Correct consulate: country of longest stay, or first entry if equal',
      'Day-by-day itinerary that matches hotels and tickets',
      'France, Germany, Italy, Switzerland, Spain, and the Netherlands as common hubs',
      'Trade fairs and visit files with the same document standard',
    ],
    visaGuidance: [
      'Correct Schengen state of application (main stay vs first entry)',
      'Day-by-day European itinerary that the officer can follow',
      'Travel medical insurance with at least €30,000 cover across Schengen',
      'Verifiable hotel bookings and inter-country train or flight reservations',
    ],
    popularHubs: ['Paris', 'Zurich', 'Rome', 'Berlin', 'Madrid', 'Amsterdam'],
    flightDurationFromPakistan: '~7 – 8.5 Hours',
};

const SAUDI_ARABIA_DESTINATION: Destination = {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    region: 'Middle East',
    tagline: 'Umrah, tourist e-Visa, and family visit from Lahore',
    overview:
      'Saudi files from this desk cover Umrah and Nusuk, tourist e-Visa eligibility, and family-visit papers — plus hotels near the Haramain and Haramain train options. We do not sell guaranteed packages; we file documents and bookings as they stand.',
    heroImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80',
    ],
    keyHighlights: [
      'Umrah visa / Nusuk appointment notes',
      'Tourist e-Visa and family-visit document lists',
      'Haram-adjacent hotels and Haramain train transfers',
      'Jeddah, Makkah, Madinah, and Riyadh as common hubs',
    ],
    visaGuidance: [
      'Umrah visa and Nusuk platform appointment guidance',
      'Saudi tourist e-Visa / visa-on-arrival eligibility check',
      'Family visit visa documentation',
      'Haram-adjacent hotel booking and Haramain High-Speed Train transfers',
    ],
    popularHubs: ['Makkah', 'Madinah', 'Jeddah', 'Riyadh'],
    flightDurationFromPakistan: '~4.5 – 5.5 Hours (Direct flights from Lahore)',
};

export const ALL_DESTINATIONS: Destination[] = [
  ...FEATURED_DESTINATIONS,
  SCHENGEN_DESTINATION,
  SAUDI_ARABIA_DESTINATION,
];

export const TRAVEL_SERVICES: TravelService[] = [
  {
    id: 'visa-consultancy',
    title: 'Visa Consultancy',
    tagline: 'Profile check, embassy checklist, and file review from Lahore',
    category: 'Visa Advisory',
    summary: 'We read your job, bank, and travel history against the destination list — and say if the case is weak before you pay embassy fees.',
    fullDetails:
      'Each corridor has its own funds, ties, and itinerary rules. We review your papers against that list, flag gaps, and only then help with forms, cover letters, and appointments. We do not guarantee a visa.',
    processWorkflow: [
      { step: '01', title: 'Profile evaluation', description: 'Travel history, profession, and destination rules on one page.' },
      { step: '02', title: 'Document checklist', description: 'Embassy-aligned list of proofs you still need.' },
      { step: '03', title: 'File review', description: 'Bank certificates, employer letters, and tax returns checked for consistency.' },
      { step: '04', title: 'Interview notes', description: 'Q&A practice if that embassy requires a personal appearance.' },
    ],
    deliverables: [
      'Destination checklist',
      'Honest note on case strength',
      'Prior-refusal advice only when the file can be strengthened',
      'Form-filling guidance',
    ],
    iconName: 'Compass',
  },
  {
    id: 'visit-visa',
    title: 'Visit Visa Assistance',
    tagline: 'Short-stay files for tourism, family visits, and events',
    category: 'Visa Advisory',
    summary: 'Turkey, UK, Schengen, and Gulf visit visas: purpose, funds, hotel voucher, and a return itinerary the officer can verify.',
    fullDetails:
      'A visit file has to show you will return and can pay for the trip. We help with a day-by-day itinerary, live hotel vouchers, invitation checks for family visits, and VFS / Gerry’s / consular submission notes. Dummy tickets are not used.',
    processWorkflow: [
      { step: '01', title: 'Purpose', description: 'Tourism, family visit, or a private event — one clear reason.' },
      { step: '02', title: 'Itinerary & hotels', description: 'Day-by-day schedule and verifiable hotel reservations.' },
      { step: '03', title: 'Sponsorship', description: 'Invitation letters and host proofs if you are visiting family.' },
      { step: '04', title: 'Submission', description: 'VFS / Gerry’s / consular pack and appointment notes.' },
    ],
    deliverables: [
      'Detailed day-to-day tourist itinerary draft',
      'Proof of accommodation reservation assistance',
      'Cover letter drafting reflecting genuine travel intent',
      'Travel health insurance coordination',
    ],
    iconName: 'PlaneTakeoff',
  },
  {
    id: 'business-visa',
    title: 'Business Visa Guidance',
    tagline: 'Trade fairs, client meetings, and company-sponsored trips',
    category: 'Visa Advisory',
    summary: 'Invitation, NTN / Chamber papers, and company bank records packed for a commercial visit — not a disguised tourism file.',
    fullDetails:
      'Business visas need a real host letter, Pakistan company proofs (FBR, Chamber), and a spend trail. We help assemble that pack and a cover letter. We do not invent exhibitions or employers.',
    processWorkflow: [
      { step: '01', title: 'Invitation Verification', description: 'Reviewing foreign corporate host letter and conference credentials.' },
      { step: '02', title: 'Corporate Proofs Assembly', description: 'Integrating NTN, Chamber certificates, and business bank statements.' },
      { step: '03', title: 'Company Sponsorship Letter', description: 'Drafting employer or company undertaking of travel expenses.' },
      { step: '04', title: 'Priority Scheduling', description: 'Advising on appointment booking timelines for urgent business trips.' },
    ],
    deliverables: [
      'Corporate cover letter and travel undertaking drafts',
      'Business profile compilation for consular officers',
      'Exhibition & trade fair ticket integration',
      'Multi-entry visa request advisory',
    ],
    iconName: 'Briefcase',
  },
  {
    id: 'study-work-visa',
    title: 'Study Visa Guidance',
    tagline: 'Admission paperwork, funds, and student visa file review',
    category: 'Visa Advisory',
    summary: 'CAS/I-20 check, 28-day fund timeline, SOP review, and consular form check once you have an offer.',
    fullDetails: 'Safeer E Aman guides students through CAS/I-20 alignment, tuition fee payment documentation, and maintenance fund requirements. We do not place you in a university — we prepare the visa file after you have an offer.',
    processWorkflow: [
      { step: '01', title: 'Offer Letter Check', description: 'Verifying university unconditional acceptance or overseas job contract.' },
      { step: '02', title: 'Financial Solvency Proofs', description: '28-day holding funds and verified sponsorship affidavits against the destination rule.' },
      { step: '03', title: 'Academic Attestations', description: 'Checklist for HEC, IBCC, and MOFA certificate attestations.' },
      { step: '04', title: 'Visa Application Review', description: 'Final check of student/work visa portal entries before payment.' },
    ],
    deliverables: [
      'Tuition & maintenance bank statement timeline guidance',
      'Statement of Purpose (SOP) review for visa officers',
      'Medical examination (TB test) booking guidance',
      'Pre-departure advisory for students and workers',
    ],
    iconName: 'GraduationCap',
  },
  {
    id: 'work-visa',
    title: 'Work Visa Guidance',
    tagline: 'Contract check and legal work-visa channels',
    category: 'Visa Advisory',
    summary: 'Review of job offer, employer papers, and the correct consular route. No fake jobs or guaranteed stamps.',
    fullDetails: 'For professionals with a genuine overseas contract, we guide document order, employer invitation checks, and portal entries. We do not sell work visas or invent employment.',
    processWorkflow: [
      { step: '01', title: 'Contract check', description: 'Confirm the job offer and host company papers look genuine.' },
      { step: '02', title: 'Pakistan proofs', description: 'NTN, experience letters, and police/medical items as required.' },
      { step: '03', title: 'File order', description: 'Cover letter and indexed dossier for the correct embassy.' },
      { step: '04', title: 'Submission', description: 'Appointment and form review before you pay visa fees.' },
    ],
    deliverables: [
      'Contract and invitation review',
      'Document checklist by country',
      'Form filling guidance',
      'Pre-departure notes after grant',
    ],
    iconName: 'Briefcase',
  },
  {
    id: 'family-visa',
    title: 'Family Visit & Dependent Visa',
    tagline: 'Spouse, parent, and child files with proof of relationship',
    category: 'Visa Advisory',
    summary: 'Invitation letters, FRC/nikahnama checks, sponsor income proofs, and dependent or family-visit files for UK, Schengen, Turkey, and Gulf.',
    fullDetails: 'Family visit and dependent applications succeed when the relationship, sponsor capacity, and return intent are documented without gaps. We review invitation letters, civil documents, and sponsor bank/employment papers so the file matches embassy family-visit or dependent checklists. We do not invent relationships or guarantee a stamp.',
    processWorkflow: [
      { step: '01', title: 'Relationship papers', description: 'FRC, nikahnama, birth certificates, and attested copies as required.' },
      { step: '02', title: 'Sponsor file', description: 'Host invitation, address, employment, and funds for the stay.' },
      { step: '03', title: 'Applicant ties', description: 'Pakistan employment, studies, or property that support return intent.' },
      { step: '04', title: 'Form & appointment', description: 'Online form review and VFS / consular slot guidance.' },
    ],
    deliverables: [
      'Family-visit or dependent document checklist by country',
      'Invitation and cover-letter structure',
      'Sponsor and applicant file order',
      'Appointment notes for biometrics',
    ],
    iconName: 'Users',
  },
  {
    id: 'transit-visa',
    title: 'Transit Visa Guidance',
    tagline: 'Airport layover and airside / landside transit rules',
    category: 'Visa Advisory',
    summary: 'UK, Schengen, and Gulf layover checks: whether you need a transit visa, how long you can stay airside, and which tickets prove onward travel.',
    fullDetails: 'A missed transit visa can stop a connecting flight even when the destination visa is in order. We check the layover country, ticket routing, and whether you leave the airport. Guidance covers TWOV / airside versus landside stays. Airlines and border officers still decide boarding.',
    processWorkflow: [
      { step: '01', title: 'Routing check', description: 'Confirm layover country, terminal, and overnight vs same-day connection.' },
      { step: '02', title: 'Rule map', description: 'Match your passport to transit-visa, e-visa, or visa-free airside rules.' },
      { step: '03', title: 'Onward proof', description: 'PNR, destination visa, and hotel if you must enter the transit country.' },
      { step: '04', title: 'File or skip', description: 'Either assemble a transit application or confirm no visa is required.' },
    ],
    deliverables: [
      'Layover-country transit rule note',
      'Onward-ticket and visa proof list',
      'Transit visa form guidance when needed',
      'Airline check-in document pack',
    ],
    iconName: 'Plane',
  },
  {
    id: 'visa-refusal',
    title: 'Visa Refusal Review',
    tagline: 'Read the refusal notice and rebuild the next file honestly',
    category: 'Visa Advisory',
    summary: 'We unpack the embassy refusal points, fix documentation gaps, and only advise a re-application when the profile can actually be strengthened.',
    fullDetails: 'A refusal is a written list of what the officer did not accept — funds, intent, employment, or inconsistencies. We translate that notice into a document plan. We never coach false stories. If the case is weak, we say so before you pay another visa fee.',
    processWorkflow: [
      { step: '01', title: 'Notice review', description: 'Read every refusal ground and the papers that were submitted.' },
      { step: '02', title: 'Gap map', description: 'Bank, employment, travel history, and form errors listed plainly.' },
      { step: '03', title: 'Rebuild or wait', description: 'Honest advice: re-file now, wait for stronger ties, or change destination.' },
      { step: '04', title: 'New dossier', description: 'Cover letter addressing prior refusal and an indexed replacement file.' },
    ],
    deliverables: [
      'Written refusal-point summary',
      'Corrected document checklist',
      'Re-application cover letter draft',
      'Interview notes if a second attempt is wise',
    ],
    iconName: 'FileSearch',
  },
  {
    id: 'appointment-biometrics',
    title: 'Appointment & Biometrics Support',
    tagline: 'VFS, TLS, Gerry’s slots, forms, and what to carry on the day',
    category: 'Documentation',
    summary: 'Portal accounts, appointment hunting, biometric packing list, and a last check of forms before you pay embassy or VAC fees.',
    fullDetails: 'Many files fail at the visa application centre because the form, fee, or photocopies do not match the appointment. We walk you through account creation, slot booking where available, and a physical pack list. We cannot buy unofficial “priority slots” or jump queues.',
    processWorkflow: [
      { step: '01', title: 'Portal setup', description: 'Correct centre, visa type, and applicant details on VFS / TLS / Gerry’s.' },
      { step: '02', title: 'Slot booking', description: 'Available dates, family grouping, and fee screens before payment.' },
      { step: '03', title: 'Pack list', description: 'Originals, copies, photos, and USB/print rules for that centre.' },
      { step: '04', title: 'Day-of notes', description: 'Biometrics, interview window, and passport tracking after drop-off.' },
    ],
    deliverables: [
      'Centre-specific appointment notes',
      'Form review before fee payment',
      'Biometric document pack list',
      'Passport tracking reminders',
    ],
    iconName: 'CalendarCheck',
  },
  {
    id: 'visa-documentation',
    title: 'Visa Documentation Guidance',
    tagline: 'Cover letters, affidavits, forms, and an indexed dossier',
    category: 'Documentation',
    summary: 'Unexplained deposits, mismatched job letters, and vague cover letters are common refusal points. We audit and index the file so it reads as one story.',
    fullDetails:
      'We check existing papers against the embassy list, draft a cover letter in your own facts, and flag deposits or employment gaps that need an explanation — not a rewrite of history. Translation and folder order come last.',
    processWorkflow: [
      { step: '01', title: 'Document Audit', description: 'Reviewing existing paperwork against official embassy directives.' },
      { step: '02', title: 'Cover Letter Drafting', description: 'Writing clear, professional personal statements for the visa officer.' },
      { step: '03', title: 'Financial Clarifications', description: 'Drafting affidavits for asset declarations and familial sponsorships.' },
      { step: '04', title: 'Final Indexing', description: 'Arranging your physical or digital dossier in standard consular order.' },
    ],
    deliverables: [
      'Professional visa applicant cover letters',
      'Sponsorship undertakings and legal affidavits',
      'Correct document translations guidance',
      'Embassy-ready structured file folder layout',
    ],
    iconName: 'FileText',
  },
  {
    id: 'umrah',
    title: 'Umrah Enquiries & Assistance',
    tagline: 'Nusuk, visa, Haram-side hotels, and flights from Lahore',
    category: 'Pilgrimage',
    summary: 'Family and group Umrah from Lahore: visa and Nusuk notes, Jeddah or Madinah flights, and hotels by walking time to the Haram.',
    fullDetails:
      'We help with Umrah / tourist visa steps, Nusuk where required, flights from Lahore to Jeddah or Madinah, Haram-adjacent hotels, and Haramain transfers. Packages are not sold as guaranteed outcomes.',
    processWorkflow: [
      { step: '01', title: 'Dates & Group Planning', description: 'Selecting ideal travel dates and customized budget tiers.' },
      { step: '02', title: 'Visa Issuance Guidance', description: 'Nusuk platform authorization and Umrah visa procurement.' },
      { step: '03', title: 'Haram Hotel Booking', description: 'Reserving verified hotels within easy walking distance of the Haram.' },
      { step: '04', title: 'Transport & Ziyarat', description: 'Haramain Train tickets and private air-conditioned vehicle transfers.' },
    ],
    deliverables: [
      'Umrah visa processing coordination',
      'Direct flights from Lahore / Karachi / Islamabad',
      'Verified Makkah & Madinah hotel accommodations',
      'Comprehensive pre-departure Umrah guidance booklet',
    ],
    iconName: 'Moon',
  },
  {
    id: 'flight-ticketing',
    title: 'Flight Ticketing Assistance',
    tagline: 'Visa PNRs first; issued tickets after the stamp',
    category: 'Ticketing & Stay',
    summary: 'Verifiable reservations for embassy files, then issued tickets on PIA, Emirates, Qatar, Turkish, Saudia, and others — with routing and baggage stated up front.',
    fullDetails:
      'Pending visa files need a live PNR the embassy can check. After grant we issue the ticket. We state layover, baggage, and change rules before you pay.',
    processWorkflow: [
      { step: '01', title: 'Routing Optimization', description: 'Finding the shortest layovers and most economical flight schedules.' },
      { step: '02', title: 'Visa-Compliant Itineraries', description: 'Issuing verifiable PNR reservations suitable for embassy review.' },
      { step: '03', title: 'Baggage & Seat Selection', description: 'Confirming maximum luggage allowances and preferred seating.' },
      { step: '04', title: 'Post-Issuance Support', description: 'Assisting with flight date modifications, cancellations, and reissues.' },
    ],
    deliverables: [
      'Embassy-acceptable confirmed flight reservations (verifiable PNR)',
      'Direct and connecting international airline tickets',
      'Competitive group and student baggage fare options',
      '24/7 flight departure and schedule alert support',
    ],
    iconName: 'Ticket',
  },
  {
    id: 'accommodation',
    title: 'Accommodation Assistance',
    tagline: 'Hotel vouchers the embassy can verify',
    category: 'Ticketing & Stay',
    summary: 'Confirmed booking codes for visa files, Haram-side Umrah stays, and student housing notes — not dummy vouchers.',
    fullDetails:
      'Visit visas need an address the officer can check. We book genuine hotels or flexible pay-at-property options, including Haram-adjacent rooms and longer student stays where available.',
    processWorkflow: [
      { step: '01', title: 'Location Assessment', description: 'Choosing hotels proximate to city centers, universities, or the Haram.' },
      { step: '02', title: 'Embassy-Compliant Vouchers', description: 'Generating confirmed hotel booking vouchers with verifiable addresses.' },
      { step: '03', title: 'Special Requirements', description: 'Family suites, halal breakfast options, and accessible rooms.' },
      { step: '04', title: 'Check-In Security', description: 'Direct confirmation with the hotel management prior to arrival.' },
    ],
    deliverables: [
      'Official embassy-compliant hotel booking confirmations',
      'Flexible cancellation and pay-at-property lodging options',
      'Student long-stay and shared apartment guidance',
      'Haramain-facing hotel suites in Makkah and Madinah',
    ],
    iconName: 'Hotel',
  },
];
