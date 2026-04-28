// Service data for Origine.Digital
export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  startingPrice: number;
  fixedPrice?: number;
  category: string;
  turnaround: string;
  deliverables: string[];
  process: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export const services: Service[] = [
  {
    id: "1",
    title: "Website Setup",
    slug: "website-setup",
    shortDescription: "Get your professional website live in days, not weeks.",
    longDescription: "Stop struggling with website builders. We'll build you a professional, mobile-friendly website that converts visitors into customers. Includes page structure, content setup, contact forms, and SEO basics.",
    startingPrice: 250,
    category: "Setup Services",
    turnaround: "3-5 business days",
    deliverables: ["Fully functional website", "Mobile responsive design", "Contact forms", "Basic SEO setup", "Analytics integration", "1 hour training session"],
    process: ["Discovery call", "Design mockup", "Development", "Review", "Launch", "Training"],
    seoTitle: "Professional Website Setup | Launch in Days",
    seoDescription: "Get your professional website live in days, not weeks. Mobile-friendly, SEO-optimized, and built to convert visitors into customers."
  },
  {
    id: "2",
    title: "Booking System Setup",
    slug: "booking-system-setup",
    shortDescription: "Automate your appointments and client scheduling.",
    longDescription: "Stop the back-and-forth of scheduling. We'll set up a professional booking system that lets clients book appointments, pay deposits, and receive automatic reminders.",
    startingPrice: 180,
    category: "Setup Services",
    turnaround: "2-3 business days",
    deliverables: ["Online booking page", "Calendar sync", "Automated reminders", "Payment integration", "Cancellation policies", "Staff management setup"],
    process: ["Requirements gathering", "System configuration", "Testing", "Training", "Go-live"],
    seoTitle: "Booking System Setup | Automate Your Appointments",
    seoDescription: "Automate your appointments and client scheduling. Includes online booking, calendar sync, automated reminders, and payment integration."
  },
  {
    id: "3",
    title: "CRM / Workflow Setup",
    slug: "crm-workflow-setup",
    shortDescription: "Organize your client and business process flow.",
    longDescription: "Never lose track of a lead or task again. We'll set up a CRM that fits your business, with automated workflows, follow-up reminders, and pipeline tracking.",
    startingPrice: 250,
    category: "Setup Services",
    turnaround: "3-5 business days",
    deliverables: ["Client pipeline setup", "Automated follow-ups", "Task management", "Document templates", "Reporting dashboard", "Team access configuration"],
    process: ["Workflow audit", "System selection", "Configuration", "Data migration", "Staff training"],
    seoTitle: "CRM & Workflow Setup | Organize Your Business",
    seoDescription: "Organize your client and business process flow. Includes pipeline setup, automated follow-ups, task management, and reporting dashboards."
  },
  {
    id: "4",
    title: "Business Audit",
    slug: "business-audit",
    shortDescription: "Structured analysis of your business systems and opportunities.",
    longDescription: "Get a clear picture of what's working and what's not. We'll review your offers, workflows, conversion points, and operations, then provide actionable recommendations.",
    startingPrice: 120,
    category: "Strategy Services",
    turnaround: "5-7 business days",
    deliverables: ["Business assessment report", "Bottleneck analysis", "Opportunity identification", "Action plan", "Priority recommendations", "30-minute strategy call"],
    process: ["Questionnaire", "System review", "Analysis", "Report creation", "Recommendation call"],
    seoTitle: "Business Audit | Clear Analysis of Your Business",
    seoDescription: "Structured analysis of your business systems and opportunities. Get actionable recommendations to improve your offers, workflows, and operations."
  },
  {
    id: "5",
    title: "Offer & Pricing Structuring",
    slug: "offer-pricing-structuring",
    shortDescription: "Shape what you sell and how you price it.",
    longDescription: "Stop underpricing or confusing clients. We'll help you clarify your offers, structure pricing logically, and create packages that sell.",
    startingPrice: 120,
    category: "Strategy Services",
    turnaround: "3-5 business days",
    deliverables: ["Offer clarity document", "Pricing strategy", "Package recommendations", "Value ladder", "Sales messaging guide", "Competitor analysis"],
    process: ["Current offer review", "Market analysis", "Pricing modeling", "Package design", "Strategy presentation"],
    seoTitle: "Offer & Pricing Structuring | Price Your Services Right",
    seoDescription: "Shape what you sell and how you price it. Includes offer clarity, pricing strategy, package recommendations, and competitor analysis."
  },
  {
    id: "6",
    title: "Launch Strategy Session",
    slug: "launch-strategy-session",
    shortDescription: "Focused launch plan for your product or service.",
    longDescription: "Ready to launch but not sure where to start? This session gives you a clear, actionable plan for your next launch, including timeline, positioning, and conversion strategy.",
    startingPrice: 150,
    category: "Strategy Services",
    turnaround: "2-3 business days",
    deliverables: ["Launch timeline", "Positioning document", "CTA strategy", "Conversion funnel map", "Launch checklist", "Follow-up sequence"],
    process: ["Discovery", "Market positioning", "Funnel design", "Launch sequence", "Strategy delivery"],
    seoTitle: "Launch Strategy Session | Plan Your Product Launch",
    seoDescription: "Focused launch plan for your product or service. Includes timeline, positioning, CTA strategy, and conversion funnel mapping."
  },
  {
    id: "7",
    title: "Salon System Setup",
    slug: "salon-system-setup",
    shortDescription: "Complete digital systems for beauty and salon businesses.",
    longDescription: "Everything your salon needs to run smoothly online. From booking to client management to marketing automation, we'll set up a complete digital ecosystem for your beauty business.",
    startingPrice: 350,
    category: "Setup Services",
    turnaround: "5-7 business days",
    deliverables: ["Booking system", "Client database", "SMS reminders", "Review collection", "Marketing automation", "Staff training session"],
    process: ["Salon workflow analysis", "System selection", "Setup & configuration", "Staff training", "Launch support"],
    seoTitle: "Salon System Setup | Complete Digital Systems for Salons",
    seoDescription: "Complete digital systems for beauty and salon businesses. Includes booking, client management, marketing automation, and staff training."
  },
  {
    id: "8",
    title: "Custom Build / Done For You",
    slug: "custom-build",
    shortDescription: "Tailored solution for your specific business needs.",
    longDescription: "Don't see exactly what you need? We'll build a custom solution for your business — from booking flows to digital shops to internal admin systems.",
    startingPrice: 500,
    category: "Custom Services",
    turnaround: "Varies by project",
    deliverables: ["Custom solution", "Documentation", "Training session", "30-day support", "Source files", "Deployment assistance"],
    process: ["Consultation", "Scope definition", "Proposal", "Development", "Delivery", "Training"],
    seoTitle: "Custom Build | Tailored Solutions for Your Business",
    seoDescription: "Tailored solution for your specific business needs. From booking flows to digital shops to internal admin systems, we'll build what you need."
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter(s => s.category === category);
}

export const serviceCategories = ["All", "Setup Services", "Strategy Services", "Custom Services"];