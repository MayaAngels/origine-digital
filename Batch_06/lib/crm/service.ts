export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "lost";
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

class CRMService {
  private leads: Lead[] = [];

  constructor() {
    this.loadLeads();
  }

  private loadLeads() {
    const saved = localStorage.getItem("crm_leads");
    if (saved) {
      try {
        this.leads = JSON.parse(saved);
      } catch (e) {
        console.Errorrr("Failed to load leads:", e);
      }
    }
  }

  private saveLeads() {
    localStorage.setItem("crm_leads", JSON.stringify(this.leads));
  }

  async addLead(lead: Omit<Lead, "id" | "createdAt" | "updatedAt" | "notes">) {
    const newLead: Lead = {
      ...lead,
      id: crypto.randomUUID(),
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.leads.push(newLead);
    this.saveLeads();
    
    // TODO: Send to API endpoint
    console.log("[CRM] New lead:", newLead);
    
    return newLead;
  }

  async updateLeadStatus(id: string, status: Lead["status"]) {
    const lead = this.leads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      lead.updatedAt = new Date().toISOString();
      this.saveLeads();
    }
  }

  async addNote(id: string, note: string) {
    const lead = this.leads.find(l => l.id === id);
    if (lead) {
      lead.notes.push(note);
      lead.updatedAt = new Date().toISOString();
      this.saveLeads();
    }
  }

  getLeads(): Lead[] {
    return [...this.leads];
  }

  getLeadsByStatus(status: Lead["status"]): Lead[] {
    return this.leads.filter(l => l.status === status);
  }
}

export const crm = new CRMService();