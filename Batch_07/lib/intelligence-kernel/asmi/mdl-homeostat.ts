// lib/intelligence-kernel/asmi/mdl-homeostat.ts
export interface AgentComplexity {
    agentName: string;
    codeLength: number;       // approximation: lines of code or parameter count
    dataComplexity: number;   // how much data it used
    mdlScore: number;         // lower is better
    budget: number;           // max allowed MDL
}

export class MDLHomeostat {
    private agents: Map<string, AgentComplexity> = new Map();
    private defaultBudget = 5000; // arbitrary units

    registerAgent(name: string, codeLength: number, dataComplexity: number = 100) {
        const mdl = codeLength + dataComplexity; // simplified
        this.agents.set(name, {
            agentName: name,
            codeLength,
            dataComplexity,
            mdlScore: mdl,
            budget: this.defaultBudget,
        });
    }

    evaluate(name: string): { healthy: boolean; message: string } {
        const agent = this.agents.get(name);
        if (!agent) return { healthy: true, message: 'Unknown agent' };
        if (agent.mdlScore > agent.budget) {
            return { healthy: false, message: `MDL exceeded (${agent.mdlScore}/${agent.budget}). Pruning needed.` };
        }
        return { healthy: true, message: 'Within complexity budget.' };
    }

    getUnhealthyAgents(): string[] {
        return [...this.agents.entries()]
            .filter(([_, a]) => a.mdlScore > a.budget)
            .map(([name]) => name);
    }

    updateComplexity(name: string, codeLength: number, dataComplexity: number) {
        const agent = this.agents.get(name);
        if (agent) {
            agent.codeLength = codeLength;
            agent.dataComplexity = dataComplexity;
            agent.mdlScore = codeLength + dataComplexity;
        }
    }
}
