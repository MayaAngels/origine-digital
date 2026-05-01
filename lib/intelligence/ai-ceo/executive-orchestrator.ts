// lib/intelligence/ai-ceo/executive-orchestrator.ts
// AI CEO — Digital Twin that runs the entire enterprise autonomously.

interface ExecutiveDecision {
    id: string;
    type: 'product_launch' | 'pricing_change' | 'marketing_campaign' | 'strategic_pivot' | 'partner_integration';
    proposedBy: string;        // which AI agent proposed
    recommendation: string;   // what the AI recommends
    reasoning: string;        // why
    confidence: number;       // 0-1
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    requiresHumanApproval: boolean;
    status: 'pending' | 'approved' | 'rejected' | 'auto_approved' | 'escalated';
    createdAt: string;
    expiresAt: string;        // 24-hour window
    notificationsSent: number;
    humanFeedback?: string;
    outcome?: string;
}

interface DigitalTwinProfile {
    decisionStyle: 'aggressive' | 'moderate' | 'conservative';
    riskTolerance: number;        // 0-1
    innovationBias: number;       // 0-1 (preference for new vs proven)
    revenueVsEthics: number;      // 0-1 (0 = pure ethics, 1 = pure revenue)
    communicationStyle: string;   // tone, vocabulary patterns
    workingHours: { start: number; end: number };  // UTC hours
    responseTimePreference: 'instant' | 'daily' | 'weekly';
    partnerWeights: Record<string, number>;  // how much each partner's input weighs
}

export class ExecutiveOrchestrator {
    private decisions: ExecutiveDecision[] = [];
    private profile: DigitalTwinProfile;
    private autoApprovalThreshold: number = 0.85;
    private notificationWindow: number = 24; // hours

    constructor(profile: DigitalTwinProfile) {
        this.profile = profile;
        // Adjust thresholds based on the digital twin's risk tolerance
        this.autoApprovalThreshold = 0.7 + (this.profile.riskTolerance * 0.25);
    }

    // ============================================================
    // 1. RECEIVE A PROPOSAL FROM ANY AI AGENT
    // ============================================================
    receiveProposal(proposal: Omit<ExecutiveDecision, 'id' | 'status' | 'createdAt' | 'expiresAt' | 'notificationsSent'>): ExecutiveDecision {
        const decision: ExecutiveDecision = {
            ...proposal,
            id: `exec_${Date.now()}`,
            status: 'pending',
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + this.notificationWindow * 3600000).toISOString(),
            notificationsSent: 0,
        };

        // Apply digital twin's decision style
        decision.requiresHumanApproval = this.evaluateApprovalNeed(decision);
        
        if (!decision.requiresHumanApproval && decision.confidence >= this.autoApprovalThreshold) {
            decision.status = 'auto_approved';
            decision.outcome = 'Automatically approved based on digital twin profile';
        }

        this.decisions.push(decision);
        return decision;
    }

    // ============================================================
    // 2. EVALUATE IF HUMAN APPROVAL IS NEEDED
    // ============================================================
    private evaluateApprovalNeed(decision: ExecutiveDecision): boolean {
        // ALWAYS require approval for critical risk
        if (decision.riskLevel === 'critical') return true;
        
        // Require approval if confidence is below threshold
        if (decision.confidence < this.autoApprovalThreshold) return true;
        
        // Require approval for strategic pivots
        if (decision.type === 'strategic_pivot') return true;
        
        // Require approval outside working hours if profile prefers it
        const currentHour = new Date().getUTCHours();
        if (this.profile.responseTimePreference === 'daily' && 
            (currentHour < this.profile.workingHours.start || currentHour > this.profile.workingHours.end)) {
            return true;
        }
        
        return false;
    }

    // ============================================================
    // 3. PROCESS HUMAN FEEDBACK (Approval/Rejection)
    // ============================================================
    processHumanFeedback(decisionId: string, approved: boolean, feedback?: string): ExecutiveDecision | null {
        const decision = this.decisions.find(d => d.id === decisionId);
        if (!decision) return null;

        decision.status = approved ? 'approved' : 'rejected';
        decision.humanFeedback = feedback;

        // LEARN FROM THIS DECISION
        this.learnFromHumanDecision(decision);
        
        return decision;
    }

    // ============================================================
    // 4. LEARN FROM HUMAN DECISIONS (Digital Twin Evolution)
    // ============================================================
    private learnFromHumanDecision(decision: ExecutiveDecision): void {
        // If human approved a high-risk decision, increase risk tolerance
        if (decision.approved && decision.riskLevel === 'high') {
            this.profile.riskTolerance = Math.min(1, this.profile.riskTolerance + 0.02);
        }
        
        // If human rejected a high-confidence decision, decrease auto-approval
        if (!decision.approved && decision.confidence > 0.9) {
            this.autoApprovalThreshold = Math.min(0.95, this.autoApprovalThreshold + 0.01);
        }
        
        // Learn communication style from feedback
        if (decision.humanFeedback) {
            this.analyzeCommunicationPattern(decision.humanFeedback);
        }
    }

    private analyzeCommunicationPattern(feedback: string): void {
        // Analyze word choice, sentiment, and style from feedback
        const formalIndicators = ['please', 'thank you', 'regards', 'would you', 'could you'];
        const casualIndicators = ['hey', 'cool', 'awesome', 'yeah', 'gonna'];
        
        let formalScore = 0, casualScore = 0;
        formalIndicators.forEach(w => { if (feedback.toLowerCase().includes(w)) formalScore++; });
        casualIndicators.forEach(w => { if (feedback.toLowerCase().includes(w)) casualScore++; });
        
        // Adjust digital twin's communication style slightly
        if (formalScore > casualScore) {
            this.profile.communicationStyle = 'formal';
        } else if (casualScore > formalScore) {
            this.profile.communicationStyle = 'casual';
        }
    }

    // ============================================================
    // 5. GET PENDING DECISIONS (For Admin Dashboard)
    // ============================================================
    getPendingDecisions(): ExecutiveDecision[] {
        return this.decisions.filter(d => d.status === 'pending')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    // ============================================================
    // 6. GET AUTO-APPROVED DECISIONS (Transparency)
    // ============================================================
    getAutoApprovedDecisions(): ExecutiveDecision[] {
        return this.decisions.filter(d => d.status === 'auto_approved');
    }

    // ============================================================
    // 7. GENERATE EXECUTIVE SUMMARY (Daily Briefing)
    // ============================================================
    generateExecutiveSummary(): string {
        const pending = this.getPendingDecisions().length;
        const autoApproved = this.getAutoApprovedDecisions().length;
        const total = this.decisions.length;
        
        const greeting = this.profile.communicationStyle === 'formal' ? 
            'Good day. Here is your executive briefing.' : 
            'Hey! Here\'s what happened while you were away.';
        
        return `${greeting}

📊 TODAY'S SUMMARY:
├── Total Decisions: ${total}
├── Auto-Approved: ${autoApproved}
├── Pending Your Review: ${pending}
└── Risk Profile: ${(this.profile.riskTolerance * 100).toFixed(0)}% risk tolerance

${pending > 0 ? `⚠️  ${pending} decisions need your attention. Visit the CEO Dashboard.` : '✅ All decisions processed autonomously.'}

🧠 Digital Twin Status:
├── Communication Style: ${this.profile.communicationStyle}
├── Innovation Bias: ${(this.profile.innovationBias * 100).toFixed(0)}%
└── Learning: Active (${total} decisions analyzed)
`;
    }

    // ============================================================
    // 8. GET DIGITAL TWIN PROFILE (For Partner Integration)
    // ============================================================
    getProfile(): DigitalTwinProfile {
        return { ...this.profile };
    }
}

// Initialize with default profile (evolves over time)
export const aiCEO = new ExecutiveOrchestrator({
    decisionStyle: 'moderate',
    riskTolerance: 0.55,
    innovationBias: 0.6,
    revenueVsEthics: 0.5,
    communicationStyle: 'casual',
    workingHours: { start: 8, end: 20 },
    responseTimePreference: 'instant',
    partnerWeights: {},
});
