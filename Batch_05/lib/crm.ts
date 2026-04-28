// lib/crm.ts
import fs from 'fs/promises';
import path from 'path';

export interface CrmNote {
    id: string;
    text: string;
    createdAt: string;
    author?: string;
}

export interface CrmSegment {
    name: string;
    description: string;
    conditions: any; // pode ser JSON com filtros
}

export interface ClientCrm {
    notes: CrmNote[];
    segments: string[];
    interactions: any[];
}

export async function getCrmData(clientId: string): Promise<ClientCrm> {
    const crmDir = path.join(process.cwd(), 'data', 'clients_data', clientId, 'crm');
    const notesFile = path.join(crmDir, 'notes.json');
    const segFile = path.join(crmDir, 'segments.json');
    await fs.mkdir(crmDir, { recursive: true });
    let notes: CrmNote[] = [];
    let segments: string[] = [];
    try {
        notes = JSON.parse(await fs.readFile(notesFile, 'utf-8'));
    } catch {}
    try {
        segments = JSON.parse(await fs.readFile(segFile, 'utf-8'));
    } catch {}
    return { notes, segments, interactions: [] };
}

export async function addNote(clientId: string, text: string): Promise<CrmNote> {
    const crm = await getCrmData(clientId);
    const newNote: CrmNote = {
        id: Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        text,
        createdAt: new Date().toISOString(),
    };
    crm.notes.push(newNote);
    const crmDir = path.join(process.cwd(), 'data', 'clients_data', clientId, 'crm');
    await fs.writeFile(path.join(crmDir, 'notes.json'), JSON.stringify(crm.notes, null, 2));
    return newNote;
}

export async function addSegment(clientId: string, segmentName: string): Promise<void> {
    const crm = await getCrmData(clientId);
    if (!crm.segments.includes(segmentName)) {
        crm.segments.push(segmentName);
        const crmDir = path.join(process.cwd(), 'data', 'clients_data', clientId, 'crm');
        await fs.writeFile(path.join(crmDir, 'segments.json'), JSON.stringify(crm.segments, null, 2));
    }
}
