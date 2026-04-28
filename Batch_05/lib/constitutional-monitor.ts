import fs from 'fs/promises';
import path from 'path';
const VIOLATIONS_DIR = path.join(process.cwd(), 'data', 'violations');
export async function validateAction(action,context) {
    if(action.type==='charge' && action.amount>0 && context.result && context.result.confirmed===false) {
        return { allowed: false, reasons: ['Cobrança sem resultado confirmado'] };
    }
    return { allowed: true, reasons: [] };
}
export async function logViolation(action,context,reasons) {
    await fs.mkdir(VIOLATIONS_DIR,{recursive:true});
    const id = Date.now()+'-'+Math.random().toString(36).substring(2,8);
    const violation = { id, timestamp: new Date().toISOString(), action, context, reasons, reviewed: false, vetoed: false };
    await fs.writeFile(path.join(VIOLATIONS_DIR, id+'.json'), JSON.stringify(violation, null, 2));
}
export async function listViolations(limit=100) {
    await fs.mkdir(VIOLATIONS_DIR,{recursive:true});
    const files = await fs.readdir(VIOLATIONS_DIR);
    const viols = [];
    for(const f of files) if(f.endsWith('.json')) viols.push(JSON.parse(await fs.readFile(path.join(VIOLATIONS_DIR,f),'utf-8')));
    viols.sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
    return viols.slice(0,limit);
}
export async function vetoViolation(violationId) {
    const filePath = path.join(VIOLATIONS_DIR, violationId+'.json');
    try {
        const v = JSON.parse(await fs.readFile(filePath,'utf-8'));
        v.vetoed = true; v.reviewed = true;
        await fs.writeFile(filePath, JSON.stringify(v,null,2));
        return true;
    } catch { return false; }
}
