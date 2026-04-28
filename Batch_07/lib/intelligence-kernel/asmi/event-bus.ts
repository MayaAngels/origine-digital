// lib/intelligence-kernel/asmi/event-bus.ts
import { EventEmitter } from 'events';

class EventBus extends EventEmitter {
    private static instance: EventBus;

    private constructor() {
        super();
        // Optionally connect to Redis via ioredis for distributed pub/sub
    }

    static getInstance(): EventBus {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }

    emitEvent(event: string, payload: any) {
        this.emit(event, payload);
        console.log(`[EventBus] Event '${event}' emitted.`);
    }

    subscribe(event: string, handler: (payload: any) => void) {
        this.on(event, handler);
    }
}

export default EventBus;
