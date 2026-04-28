// lib/intelligence-kernel/agent-grammar.ts
export type AgentFunction = (input: any) => Promise<any> | any;

export class Primitive {
    constructor(public name: string, public func: AgentFunction) {}
}

export class Sequence {
    constructor(public children: (Primitive | Sequence)[]) {}
}

export type AgentExpression = Primitive | Sequence;

export function instantiate(expr: AgentExpression): AgentFunction {
    if (expr instanceof Primitive) {
        return expr.func;
    } else if (expr instanceof Sequence) {
        const childFuncs = expr.children.map(instantiate);
        return async (input: any) => {
            let data = input;
            for (const f of childFuncs) {
                data = await f(data);
            }
            return data;
        };
    }
    throw new Error('Unknown agent expression');
}
