import fs from 'fs/promises';
import path from 'path';
const MEMORY_DIR = path.join(process.cwd(), 'data', 'memory');
export async function ensureDir() { try { await fs.access(MEMORY_DIR); } catch { await fs.mkdir(MEMORY_DIR, { recursive: true }); } }
export async function embedText(text) { const h = text.split('').reduce((a,c)=>a+c.charCodeAt(0),0); return Array.from({length:1536},(_,i)=>Math.sin(h+i)*0.5+0.5); }
export async function storeMemory(content, metadata) { await ensureDir(); const id = Date.now()+'-'+Math.random().toString(36).substring(2,8); const embedding = await embedText(content); const mem={id,content,embedding,metadata:metadata||{},createdAt:new Date().toISOString()}; await fs.writeFile(path.join(MEMORY_DIR,id+'.json'),JSON.stringify(mem,null,2)); return mem; }
export async function recallSimilar(query,limit=5) { await ensureDir(); const qEmb=await embedText(query); const files=await fs.readdir(MEMORY_DIR); const res=[]; for(const f of files){ if(!f.endsWith('.json')) continue; const data=JSON.parse(await fs.readFile(path.join(MEMORY_DIR,f),'utf-8')); let sim=0; for(let i=0;i<qEmb.length;i++) sim+=qEmb[i]*data.embedding[i]; res.push({...data,similarity:sim}); } res.sort((a,b)=>b.similarity-a.similarity); return res.slice(0,limit); }
