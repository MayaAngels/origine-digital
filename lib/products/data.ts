// lib/products/data.ts
export interface Product {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  features: string[];
  whatsIncluded: string[];
  seoTitle?: string;
  seoDescription?: string;
  thumbnailUrl?: string;
  downloadFile?: string;
  fileSize?: string;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Business Operations Starter Kit",
    slug: "business-operations-starter-kit",
    shortDescription: "Complete operational system for small businesses including workflow templates and control systems.",
    longDescription: "Stop chaos and start running your business like a pro. This comprehensive toolkit gives you everything you need to organize, track, and optimize your daily operations. From task management to financial tracking, you'll have a complete system that grows with you. Includes 15+ workflow templates, daily operations checklist, task prioritization matrix, performance tracking dashboard, SOP templates, and meeting agenda templates.",
    price: 49,
    category: "Business Foundations",
    features: ["Workflow templates", "Daily operations checklist", "Task prioritization matrix", "Performance tracking dashboard", "Standard operating procedures template", "Meeting agenda & notes template"],
    whatsIncluded: ["15+ workflow templates", "Daily operations checklist", "Task prioritization matrix", "Performance tracking dashboard", "SOP template", "Meeting agenda template"],
    seoTitle: "Business Operations Starter Kit | Run Your Business Like a Pro",
    seoDescription: "Complete operational system for small businesses. Includes workflow templates, tracking dashboards, and SOPs to organize and optimize your daily operations.",
    thumbnailUrl: "/images/products/business-operations-starter-kit.svg",
    downloadFile: "/downloads/business-operations-starter-kit.zip",
    fileSize: "2.5 MB"
  },
  {
    id: "2",
    title: "Client Onboarding Pack",
    slug: "client-onboarding-pack",
    shortDescription: "Professional client welcome and onboarding system with templates and forms.",
    longDescription: "First impressions matter. This onboarding pack helps you impress new clients from day one with a professional, organized welcome experience. Reduce confusion, set clear expectations, and start every client relationship on the right foot. Includes welcome email template, client intake form, service agreement template, project brief template, onboarding checklist, and client questionnaire.",
    price: 29,
    category: "Business Foundations",
    features: ["Welcome email template", "Client intake form", "Service agreement template", "Project brief template", "Onboarding checklist", "Client questionnaire"],
    whatsIncluded: ["Welcome email template", "Client intake form", "Service agreement template", "Project brief template", "Onboarding checklist", "Client questionnaire"],
    seoTitle: "Client Onboarding Pack | Professional Client Welcome System",
    seoDescription: "Impress new clients with a professional onboarding system. Includes welcome templates, intake forms, agreements, and checklists for a smooth client experience.",
    thumbnailUrl: "/images/products/client-onboarding-pack.svg",
    downloadFile: "/downloads/client-onboarding-pack.zip",
    fileSize: "1.8 MB"
  },
  {
    id: "3",
    title: "Service Pricing Calculator",
    slug: "service-pricing-calculator",
    shortDescription: "Calculate profitable service prices based on costs, time, and profit margins.",
    longDescription: "Stop guessing your prices. This calculator helps you determine exactly what to charge based on your time, expenses, and desired profit margin. Never underprice yourself again. Includes hourly rate calculator, project-based pricing tool, profit margin analyzer, competitor price comparison sheet, value-based pricing guide, and price increase calculator.",
    price: 19,
    category: "Business Tools",
    features: ["Hourly rate calculator", "Project-based pricing tool", "Profit margin analyzer", "Competitor price comparison", "Value-based pricing guide", "Price increase calculator"],
    whatsIncluded: ["Hourly rate calculator", "Project-based pricing tool", "Profit margin analyzer", "Competitor comparison sheet", "Pricing guide", "Price increase calculator"],
    seoTitle: "Service Pricing Calculator | Never Underprice Yourself Again",
    seoDescription: "Calculate profitable service prices based on your time, costs, and desired profit margin. Includes hourly rate, project pricing, and profit margin tools.",
    thumbnailUrl: "/images/products/service-pricing-calculator.svg",
    downloadFile: "/downloads/service-pricing-calculator.xlsx",
    fileSize: "0.5 MB"
  },
  {
    id: "4",
    title: "SOP & Workflow Pack",
    slug: "sop-workflow-pack",
    shortDescription: "Standard operating procedures templates for consistent team execution.",
    longDescription: "Document your processes once and never explain them again. This pack gives you templates for every type of procedure, from daily tasks to complex projects. Train new team members faster and maintain quality consistently. Includes 20+ SOP templates, process mapping guide, workflow diagram templates, responsibility assignment matrix, quality control checklist, and process improvement log.",
    price: 39,
    category: "Business Foundations",
    features: ["20+ SOP templates", "Process mapping guide", "Workflow diagram templates", "Responsibility assignment matrix", "Quality control checklist", "Process improvement log"],
    whatsIncluded: ["20+ SOP templates", "Process mapping guide", "Workflow diagram templates", "RACI matrix", "Quality control checklist", "Improvement log"],
    seoTitle: "SOP & Workflow Pack | Document Your Business Processes",
    seoDescription: "Standard operating procedures templates for consistent team execution. Includes 20+ SOP templates, process mapping guides, and workflow diagrams.",
    thumbnailUrl: "/images/products/sop-workflow-pack.svg",
    downloadFile: "/downloads/sop-workflow-pack.zip",
    fileSize: "3.2 MB"
  },
  {
    id: "5",
    title: "Salon Business Toolkit",
    slug: "salon-business-toolkit",
    shortDescription: "Complete business system for salon owners including pricing and workflows.",
    longDescription: "Run your salon like a well-oiled machine. This toolkit covers everything from appointment management to inventory tracking, staff scheduling to client retention. Perfect for salon owners who want to scale. Includes service menu template, staff schedule planner, inventory tracking sheet, client consultation form, retail sales tracker, and daily closing checklist.",
    price: 59,
    category: "Beauty & Salon",
    features: ["Service menu template", "Staff schedule planner", "Inventory tracking sheet", "Client consultation form", "Retail sales tracker", "Daily closing checklist"],
    whatsIncluded: ["Service menu template", "Staff schedule planner", "Inventory tracking sheet", "Client consultation form", "Retail sales tracker", "Daily closing checklist"],
    seoTitle: "Salon Business Toolkit | Complete System for Salon Owners",
    seoDescription: "Everything you need to run your salon professionally. Includes service menus, staff scheduling, inventory tracking, and client consultation forms.",
    thumbnailUrl: "/images/products/salon-business-toolkit.svg",
    downloadFile: "/downloads/salon-business-toolkit.zip",
    fileSize: "4.1 MB"
  },
  {
    id: "6",
    title: "AI Prompt System for Business",
    slug: "ai-prompt-system",
    shortDescription: "Curated AI prompts for marketing, admin, client support, and operations.",
    longDescription: "Stop wasting time figuring out what to ask AI. This prompt library gives you 100+ proven prompts for every business situation. Generate marketing copy, respond to clients, plan content, and solve problems faster. Includes 100+ AI prompts, prompt optimization guide, category organization system, results tracking template, custom prompt builder, and use case examples.",
    price: 49,
    category: "AI Tools",
    features: ["100+ AI prompts", "Prompt optimization guide", "Category organization system", "Results tracking template", "Custom prompt builder", "Use case examples"],
    whatsIncluded: ["100+ AI prompts", "Prompt optimization guide", "Category organization system", "Results tracking template", "Custom prompt builder", "Use case examples"],
    seoTitle: "AI Prompt System for Business | 100+ Proven Prompts",
    seoDescription: "Curated AI prompts for marketing, admin, client support, and operations. Save time with 100+ proven prompts for every business situation.",
    thumbnailUrl: "/images/products/ai-prompt-system.svg",
    downloadFile: "/downloads/ai-prompt-system.pdf",
    fileSize: "1.2 MB"
  },
  {
    id: "7",
    title: "Mini CRM Tracker",
    slug: "mini-crm-tracker",
    shortDescription: "Simple CRM for solo entrepreneurs to track leads and clients.",
    longDescription: "No complex software needed. This simple tracker helps you manage leads, follow-ups, and client relationships in one place. Perfect for solopreneurs who need organization without overhead. Includes lead tracking database, follow-up scheduler, client communication log, deal stage tracker, contact information manager, and sales pipeline view.",
    price: 29,
    category: "Business Tools",
    features: ["Lead tracking database", "Follow-up scheduler", "Client communication log", "Deal stage tracker", "Contact information manager", "Sales pipeline view"],
    whatsIncluded: ["Lead tracking database", "Follow-up scheduler", "Client communication log", "Deal stage tracker", "Contact manager", "Sales pipeline view"],
    seoTitle: "Mini CRM Tracker | Simple CRM for Solopreneurs",
    seoDescription: "Simple CRM for solo entrepreneurs to track leads, follow-ups, and client relationships. No complex software, just organization without overhead.",
    thumbnailUrl: "/images/products/mini-crm-tracker.svg",
    downloadFile: "/downloads/mini-crm-tracker.xlsx",
    fileSize: "0.8 MB"
  },
  {
    id: "8",
    title: "Small Business Starter Pack - Ireland",
    slug: "small-business-starter-ireland",
    shortDescription: "Everything Irish small business owners need to start right.",
    longDescription: "Specifically designed for Irish entrepreneurs. This pack includes everything you need to launch and run your business in Ireland, including tax guidance, local compliance checklists, and Ireland-specific templates. Includes Irish tax registration guide, local compliance checklist, CRO filing templates, Irish business plan template, local marketing guide, and grant application tracker.",
    price: 59,
    category: "Ireland Focused",
    features: ["Irish tax registration guide", "Local compliance checklist", "CRO filing templates", "Irish business plan template", "Local marketing guide", "Grant application tracker"],
    whatsIncluded: ["Irish tax registration guide", "Local compliance checklist", "CRO filing templates", "Irish business plan template", "Local marketing guide", "Grant application tracker"],
    seoTitle: "Small Business Starter Pack - Ireland | Launch Your Irish Business",
    seoDescription: "Everything Irish small business owners need to start right. Includes tax guidance, compliance checklists, CRO templates, and local marketing guides.",
    thumbnailUrl: "/images/products/small-business-starter-ireland.svg",
    downloadFile: "/downloads/small-business-starter-ireland.zip",
    fileSize: "5.2 MB"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export const categories = ["All", "Business Foundations", "Business Tools", "AI Tools", "Beauty & Salon", "Ireland Focused"];