// lib/intelligence-kernel/spec-sheath.ts
export class ContractViolation extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ContractViolation';
    }
}

type PreCondition = (...args: any[]) => boolean;
type PostCondition = (result: any, ...args: any[]) => boolean;

export function specSheath(pre?: PreCondition, post?: PostCondition) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (pre && !pre(...args)) {
                throw new ContractViolation(`${propertyKey} pre-condition failed`);
            }
            const result = original.apply(this, args);
            if (post && !post(result, ...args)) {
                throw new ContractViolation(`${propertyKey} post-condition failed`);
            }
            return result;
        };
        return descriptor;
    };
}

// Decorator factory for class methods (TypeScript experimental)
export function contract(pre?: PreCondition, post?: PostCondition) {
    return specSheath(pre, post);
}
