// src/services/memory/memoryEngine.js
import fs from 'fs';
import path from 'path';

const MEMORY_FILE = path.resolve('data/memory/memory_store.json');

function loadMemory() {
    if (!fs.existsSync(MEMORY_FILE)) return [];
    try { return JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8')); } catch { return []; }
}

function saveMemory(memory) {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

export function recordExperience(entry) {
    const memory = loadMemory();
    memory.push({ ...entry, storedAt: new Date().toISOString() });
    // Manter apenas os últimos 500 registos para não crescer infinitamente
    if (memory.length > 500) memory.splice(0, memory.length - 500);
    saveMemory(memory);
}

export function getRelevantHistory(channel = null, limit = 50) {
    let memory = loadMemory();
    if (channel) memory = memory.filter(e => e.channel === channel);
    return memory.slice(-limit);
}

export function calculateRunningROAS(channel = null) {
    const history = getRelevantHistory(channel, 100);
    const totalRevenue = history.reduce((sum, e) => sum + (e.revenue || 0), 0);
    const totalCost = history.reduce((sum, e) => sum + (e.cost || 0), 0);
    return totalCost > 0 ? parseFloat((totalRevenue / totalCost).toFixed(2)) : 0;
}
