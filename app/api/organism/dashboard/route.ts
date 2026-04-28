import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET() {
  const orgPath = join(process.cwd(), 'organism', 'CurrentState');
  const logPath = join(process.cwd(), 'organism', 'ImmutableLog', 'events.log');
  const checkpointIndexPath = join(process.cwd(), 'organism', 'Checkpoints', 'index.json');

  // Read shop state
  let shopState = null;
  try {
    const stateFile = join(orgPath, 'shop_state.json');
    if (existsSync(stateFile)) {
      shopState = JSON.parse(readFileSync(stateFile, 'utf-8'));
    }
  } catch (e) {}

  // Read budget
  let budget = null;
  try {
    const budgetFile = join(orgPath, 'resource_budget.json');
    if (existsSync(budgetFile)) {
      budget = JSON.parse(readFileSync(budgetFile, 'utf-8'));
    }
  } catch (e) {}

  // Read strategy memory
  let strategy = null;
  try {
    const stratFile = join(orgPath, 'strategy_memory.json');
    if (existsSync(stratFile)) {
      strategy = JSON.parse(readFileSync(stratFile, 'utf-8'));
    }
  } catch (e) {}

  // Read organism config
  let orgConfig = null;
  try {
    const configFile = join(orgPath, 'organism_config.json');
    if (existsSync(configFile)) {
      orgConfig = JSON.parse(readFileSync(configFile, 'utf-8'));
    }
  } catch (e) {}

  // Simple log count + last event
  let logCount = 0;
  let lastEvent = null;
  try {
    if (existsSync(logPath)) {
      const lines = readFileSync(logPath, 'utf-8').trim().split('\n');
      logCount = lines.length;
      if (logCount > 0) {
        lastEvent = JSON.parse(lines[lines.length - 1]);
      }
    }
  } catch (e) {}

  // Checkpoint count
  let checkpointCount = 0;
  try {
    if (existsSync(checkpointIndexPath)) {
      const idx = JSON.parse(readFileSync(checkpointIndexPath, 'utf-8'));
      checkpointCount = Array.isArray(idx) ? idx.length : 0;
    }
  } catch (e) {}

  // Waste report
  let wasteReport = null;
  try {
    const wastePath = join(orgPath, 'waste_report.json');
    if (existsSync(wastePath)) {
      wasteReport = JSON.parse(readFileSync(wastePath, 'utf-8'));
    }
  } catch (e) {}

  return NextResponse.json({
    shopState,
    budget,
    strategyMemory: strategy,
    organismConfig: orgConfig,
    log: { totalEvents: logCount, lastEvent },
    checkpoints: checkpointCount,
    wasteReport,
  });
}
