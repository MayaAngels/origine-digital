// lib/logger.ts – versão simples
export const logger = {
    info: (...args: any[]) => console.log('[INFO]', ...args),
    error: (...args: any[]) => console.error('[ERROR]', ...args),
    warn: (...args: any[]) => console.warn('[WARN]', ...args),
    debug: (...args: any[]) => console.debug('[DEBUG]', ...args),
};
export function logError(error: Error, context?: any) {
    logger.error(error.message, { stack: error.stack, context });
}
export function logInfo(message: string, meta?: any) {
    logger.info(message, meta);
}
